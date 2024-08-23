import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface ChatOutputProps {
    question: string;
    data: string | Promise<string>;
}

const ChatOuputComponent: React.FC<ChatOutputProps> = ({ question, data }) => {
    const [sanitizedMarkup, setSanitizedMarkup] = useState<any>();
    // const [responses, setResponses] = useState<{ question: string; data: string }[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const resolvedData = await Promise.resolve(data); // Ensure data is resolved
            const rawMarkup = marked.parse(resolvedData);
            const sanitized = DOMPurify.sanitize(rawMarkup.toString())
            setSanitizedMarkup(sanitized);
            // setResponses(prevResponses => {
            //     // Filter out responses with the same question
            //     const updatedResponses = prevResponses.filter(response => response.question !== question);
            //     // Add the new response
            //     return [...updatedResponses, { question, data: sanitized }];
            // });
       
            
        };
        fetchData();
    }, [question]);

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
    }, [sanitizedMarkup]);
    return (

        <div style={{ backgroundColor: '#fff' }}>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        padding: '2rem 42px 0 42px',
                        fontWeight: "500",
                        marginBottom: 0,
                    }}>{question}</h3>
                    <p style={{
                        padding: '1.2rem 42px 0px 42px',
                        fontWeight: "500",
                        marginBottom: 0,
                    }}>{"Answer"}</p>

                    <div
                        id="highlight-content"
                        dangerouslySetInnerHTML={{ __html: sanitizedMarkup }}
                        style={{
                            padding: '12px 42px 32px 42px',
                            fontSize: '16px',
                            lineHeight: '26px',
                            backgroundColor: '#fff',
                            margin: 0,
                            color: "#000"
                        }}
                    />
                </div>
           
            <style>
                {`
            #highlight-content > ul, div > ol {
                list-style-type: none;
                padding-left: 0;
            }
            #highlight-content > ol > li >ul{
                margin-left: 2em;
                list-style-type: none;           
            }
            #highlight-content > ol > li >p{
                margin-left: 1em;
                list-style-type: none;
                font-size:16px;           
            }
            #highlight-content > ol > li >strong{
                margin-left: 1em;
                list-style-type: none;       
            }
            #highlight-content >ol > ul > li, {
                margin-left: 2em;
                list-style-type: none;
            }
            #highlight-content p{
                font-size:16px;
            }
            #highlight-content h4{
                font-weight:600;
                margin-top:1rem;
            }
            #highlight-content h3:first-of-type{
                margin:0px 0px 8px 0px;
                font-size:18px;
            } 
            #highlight-content h3{
                font-size:16px;
            } 
            #highlight-content ol:last-of-type{
                margin:0px 0px 22px 0px;
            }  
        `}
            </style>
        </div>
    );
};

export default ChatOuputComponent;
/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum isimply dummy text of the printing and typesetting industry. */




