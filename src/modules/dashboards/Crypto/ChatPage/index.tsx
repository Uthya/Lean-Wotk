import AppGridContainer from "@crema/components/AppGridContainer"
import ChatOuputComponent from "../ChatOutput"
import SimpleAccordion from "../RelatedQuestion"
import { Grid } from "@mui/material"
import Sources from "../Sources"
import React, { useEffect, useState } from "react"
// import style from "../../../thirdParty/recharts/Radial/Components/style"

interface ChatOutputProps {
    question: string;
    data: string;
}

const ChatPage: React.FC<ChatOutputProps> = ({ question, data }) => {
    const [response, setResponse] = useState<ChatOutputProps | null>(null);

    useEffect(() => {
        setResponse({ question, data });
    }, [question, data]);

    const paddingWhenData = { padding: "0px 0px 48px 0px", background: "#FFF", marginTop: "1rem" }; // Example style with additional padding
    const paddingWhenNoData = { padding: "0px", background: "#FFF", marginTop: "1rem" };
    // box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    // 5px 10px 26px #bebebe,
    //            -20px -20px 60px #ffffff
    return (
        <div style={(response?.data =='' || response?.data ==null) ? paddingWhenNoData : paddingWhenData}>
            {response?.data ? (
                <AppGridContainer>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={0}>
                            <Grid item xs={8} md={9}>
                                <ChatOuputComponent data={response.data} question={response.question} />
                                <SimpleAccordion></SimpleAccordion>
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <Sources />
                            </Grid>
                        </Grid>
                    </Grid>
                </AppGridContainer>

            ) :
                <div></div>
            }
        </div>
    )
}

export default ChatPage