import React, { useContext, useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { ChatAiContext } from '../index';
import DoneAllIcon from '@mui/icons-material/DoneAll';
interface ChatOutputProps {
    question: any | null;
    data: any | Promise<any> | null;
}

const ChatOuputComponent: React.FC<ChatOutputProps> = ({ question, data }) => {
    const [sanitizedMarkup, setSanitizedMarkup] = useState<any>();
    const [chatOutputResponse, setchatOutputResponse] = useState<{ question: string; data: string }[]>([]);
    const { historyData } = useContext(ChatAiContext);
    const [historyResponse, setHistoryResponse] = useState<any>();
    const chatContainerRef = useRef<HTMLDivElement>(null); // get dom of chat conversation div

    useEffect(() => {
        const fetchData = async () => {
            if (question != null && question != "") {
                const resolvedData = await Promise.resolve(data); // Ensure data is resolved
                const rawMarkup = marked.parse(resolvedData);
                const sanitized = DOMPurify.sanitize(rawMarkup.toString())
                setSanitizedMarkup(sanitized);
                setchatOutputResponse(prevResponses => {
                    // Filter out responses with the same question
                    const updatedResponses = prevResponses.filter(response => response.question !== question);
                    // Add the new response
                    return [...updatedResponses, { question, data: sanitized }];
                });
            };
        }
        if (question != null && question != "" && data != null && data != "") {
            fetchData();
        }
    }, [question]);


    useEffect(() => {
        const processHistoryData = async () => {
            if (!historyData && historyData.length > 0) {
                return;
            }
            const updatedHistoryData = await Promise.all(
                historyData?.map(async (ele: any) => {
                    const resolvedData = (ele.historyquestion == undefined || ele.historyquestion == null)
                        ? ele.historyAnswer
                        : ele.historyquestion;
                    const rawMarkup = marked.parse(resolvedData);
                    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup.toString());

                    if (ele.historyquestion == undefined || ele.historyquestion == null) {
                        return { ...ele, historyAnswer: sanitizedMarkup };
                    } else {
                        const result = sanitizedMarkup.replace(/#/g, '');
                        // <\/?pre>|<\/?code>|
                        return { ...ele, historyquestion: result };
                    }
                })
            );
            setHistoryResponse(updatedHistoryData);
        };

        processHistoryData();
        setchatOutputResponse([]); // Assuming setResponses is still needed    
    }, [historyData]);

    useEffect(() => {
        const container = document.querySelector('#highlight-content');
        const liElements = container?.querySelectorAll('li');
        liElements?.forEach((li) => {
            const strongElement = li.querySelector('strong');
            if (strongElement) {
                // set style list(<li>) that contain <strong> element
                strongElement.style.color = 'black';
                strongElement.style.fontWeight = 'bold';

            } else {
                // set style list(<li>) that not contain <strong> element
                li.style.marginLeft = "2rem";
                li.style.listStyle = "disc"
            }
        });

        const anchorTag = document.querySelectorAll('a')
        anchorTag?.forEach(function (link) {
            link.setAttribute('target', '_blank');
        });




        function copyCode(event: any) {
            const button = event.target;
            const codeElement = button.closest('pre').querySelector('code');
            if (codeElement) {
                const code = codeElement.innerText;
                const textarea = document.createElement('textarea');
                textarea.value = code;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('Copy');
                document.body.removeChild(textarea);

                // Change button text to "Copied"
                button.innerText = "Copied!";
                button.style.color = "#1d9c1df2";

                // Revert button text to "Copy" after 10 seconds
                setTimeout(() => {
                    button.innerText = 'Copy code';
                    button.style.color = "#000";
                }, 6000);
            }
        }
 
        // Add a button to each <pre> element
        document.querySelectorAll('pre').forEach(pre => {

            if (!pre.querySelector('.pre-div')) {
                const div = document.createElement('div');
                div.className = 'pre-div';

                const button = document.createElement('button');
                button.id = 'copy-button';
                button.innerText = 'Copy code';
                button.onclick = copyCode;

                div.appendChild(button);
                pre.insertBefore(div, pre.firstChild);
            }
            
        });

    }, [sanitizedMarkup]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [sanitizedMarkup]);

    return (
        <>
            {historyResponse != undefined ? (
                <div style={{ backgroundColor: '#fff' }}>
                    {historyResponse?.map((output: any, index: number) => (
                        <div key={index}>
                            {output.isQuestion ? (
                                <>
                                    <h3 id="highlight-Question"
                                        dangerouslySetInnerHTML={{ __html: output.historyquestion }}
                                    />
                                    <p style={{
                                        padding: '1rem 42px 0px 42px',
                                        fontWeight: "500",
                                        marginBottom: 0,
                                    }}>{"Answer"}</p>
                                </>
                            ) : null}
                            {!output.isQuestion ? (
                                <div
                                    id="highlight-content"
                                    dangerouslySetInnerHTML={{ __html: output.historyAnswer }}
                                >
                                </div>

                            ) : null}
                        </div>
                    ))}
                </div>
            ) : null}

            {chatOutputResponse.length > 0 || chatOutputResponse != undefined ? (
                <div style={{ backgroundColor: '#fff' }}>
                    {chatOutputResponse.map((output, index) => (
                        <div key={index} style={{ scrollMarginTop: "48px" }} ref={index === chatOutputResponse.length - 1 ? chatContainerRef : null}>
                            <h3 className="display-question">{output.question}</h3>
                            <p style={{
                                padding: '1.2rem 42px 0px 42px',
                                fontWeight: "500",
                                marginBottom: 0,
                            }}>{"Answer"}</p>

                            <div
                                id="highlight-content"
                                dangerouslySetInnerHTML={{ __html: output.data }}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default ChatOuputComponent;



