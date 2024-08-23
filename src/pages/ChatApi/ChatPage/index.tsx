import AppGridContainer from "@crema/components/AppGridContainer"
import { Grid } from "@mui/material"
import Sources from "../Sources"
import React, { useContext, useEffect, useState } from "react"
import ChatOuputComponent from "../ChatOutput"
import RelatedQuestion from "../RelatedQuestion"
import axios from "@crema/services/axios"
import { ChatAiContext } from "../index"
interface ChatOutputProps {
    question: any | null;
    data: any | null;
}

const ChatPage: React.FC<ChatOutputProps> = ({ question, data }) => {
    const [outputPesponse, setoutputPesponse] = useState<ChatOutputProps>({ question: "", data: "" });
    const [historyChat, setHistoryChat] = useState<any[]>([]);
    const { isChat, isSummary, relatedQuestion, dataSource, setHistoryData, setIsChat, setRelatedQuestion, setDataSource } = useContext(ChatAiContext);
    const [loading, setloading] = useState(false);

    const summaryDetailsPayload = {
        user_id: "zyf1994",
        session_id: "jcaio",
        client_name: "leanworks",
        project_name: ""
    }
    useEffect(() => {
        setoutputPesponse({ question: question, data: data });
        if (isChat) {
            getRealtedQuestion();
        }
    }, [question, data]);

    useEffect(() => {
        if (!isChat && isSummary) {
            getSummaryDetails();
        }
        if (!isChat && !isSummary) {
            getHistoryChat()
        }
    }, [question, isSummary]);

    const paddingWhenData = { padding: "0px 0px 48px 0px", background: "#FFF", marginTop: "1rem", boxShadow: "2px 1px 19px rgb(201 201 201 / 50%), 0px 0px 3px #e9e4e4" }; // Example style with additional padding
    const paddingWhenNoData = { padding: "0px", background: "#FFF", marginTop: "1rem", boxShadow: "2px 1px 19px rgb(201 201 201 / 50%), 0px 0px 3px #e9e4e4" };

    const getSummaryDetails = async () => {
        try {
            setloading(true);
            setHistoryData([]);
            summaryDetailsPayload.project_name = question;
            const sessionId = localStorage.getItem("SummaryPageSessionId") || "";
            const SummaryDetailsAPI = "https://api.leanworks.ai/dev/get_exec_summary_detail?"
            const params = new URLSearchParams({
                user_id: "zyf1994",
                session_id: sessionId,
                client_name: "leanworks",
                project_name: question
            });
            const response = await axios.get(SummaryDetailsAPI + params);
            const rawData = response.data.content;
            const result = [
                {
                    historyquestion: rawData.simple_prompt,
                    isQuestion: true
                },
                {
                    historyAnswer: rawData.content,
                    isQuestion: false
                }
            ];
            setHistoryData(result);
            setIsChat(false);
            setDataSource(rawData.data_source);
            setoutputPesponse({ question: "", data: "" });
            getRealtedQuestion();
        } catch (error) {
            setloading(false);
            console.error("There was an error making the request!", error);
        }
        finally {
            setloading(false);
        }
    }

    const getHistoryChat = async () => {
        try {
            setloading(true);
            setHistoryData([]);
            setRelatedQuestion([]);
            const sessionId = localStorage.getItem("HomePageSessionId") || "";
            const historyChatAPI = "https://api.leanworks.ai/dev/get_conversation_history?"
            const params = new URLSearchParams({
                user_id: "zyf1994",
                session_id: sessionId,
                client_name: "leanworks",
            });
            const response = await axios.get(historyChatAPI + params);
            const rawData = response.data;
            if (rawData != `Session id ${sessionId} doesn't exist.`) {
                const processedHistory = rawData.map((item: any) => {
                    if (item.role === 'user') {
                        return { historyquestion: item.content, isQuestion: true };
                    } else if (item.role === 'assistant') {
                        return { historyAnswer: item.content, isQuestion: false };
                    }
                    return {};
                });

                setIsChat(false);
                // Update the state
                setHistoryChat(processedHistory);
                setHistoryData(processedHistory);
                setoutputPesponse({ question: "", data: "" });
            }
            else {
                setHistoryData([]);
                setDataSource([]);
            }
        } catch (error) {
            setloading(false);
            console.error("There was an error making the request!", error);
        }
        finally {
            setloading(false);
        }
    }

    const getRealtedQuestion = async () => {
        try {
            setloading(true)
            const sessionId = (isSummary ? localStorage.getItem("SummaryPageSessionId") || "" : localStorage.getItem("HomePageSessionId") || "");
            const RelatedQuestionAPI = "https://api.leanworks.ai/dev/get_related_questions?"
            const params = new URLSearchParams({
                user_id: "zyf1994",
                session_id: sessionId,
                client_name: "leanworks",
            });
            const response = await axios.get(RelatedQuestionAPI + params);
            const rawData = response.data.content;
            setRelatedQuestion(rawData.map((item: { question: any }) => item.question));

        } catch (error) {
            setloading(false);
            console.error("There was an error making the request!", error);
        }
        finally {
            setloading(false);
        }
    }
    
    return (
        <>
            <div style={(outputPesponse?.data == '' || outputPesponse?.data == null) ? paddingWhenNoData : paddingWhenData}>
                {outputPesponse != undefined || historyChat.length > 0 ? (
                    <AppGridContainer>
                        <Grid item xs={12} md={12}>
                            <Grid container spacing={0}>
                                <Grid item xs={8} md={9}>
                                    <ChatOuputComponent question={outputPesponse.question} data={outputPesponse.data} />
                                    {relatedQuestion != undefined && relatedQuestion.length > 0 ? (
                                        <RelatedQuestion></RelatedQuestion>
                                    ) : null
                                    }
                                </Grid>
                                {dataSource != undefined && dataSource.length > 0 ? (
                                    <Grid item xs={4} md={3}>
                                        <Sources />
                                    </Grid>
                                ) : null}
                            </Grid>
                        </Grid>
                    </AppGridContainer>
                ) :
                    <div></div>
                }
            </div>

            {loading ?
                <div className='loader'>
                    <div className="app-loader ">
                        <div className="loader-spin">
                            <span >
                                <div className='loading'>
                                    <div className="app-loader">
                                        <div className="loader-spin">
                                            <span className="cx-dot cx-dot-spin">
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}

export default ChatPage


