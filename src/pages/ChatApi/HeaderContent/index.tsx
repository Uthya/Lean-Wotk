import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useContext, useEffect, useState } from "react";
import AppAnimate from "@crema/components/AppAnimate";
import { ChatAiContext } from "../index";
import AgentCreateDialogs from "../AgentCreate";


interface AppChatHeaderProps {
    question: string;
    data: string;
    isChat: boolean;
    onDataFetched: (data: { question: string; data: string; isChat: boolean }) => void;
}

const HeaderContent: React.FC<AppChatHeaderProps> = ({ question, data, isChat, onDataFetched }) => {
    const [response, setResponse] = useState<{ question: string; data: string; isChat: boolean }>({
        question: "",
        data: "",
        isChat: false,
    });
    const {agentCreate , setAgentCreate} = useContext(ChatAiContext)
    
    const fetchData = () => {
        const passValue = { question: 'history', data: '', isChat: false };
        onDataFetched(passValue); // Call the function passed from the parent
    };

    useEffect(() => {
        setResponse({ question, data, isChat });
    }, [onDataFetched])
    return (
        <AppAnimate animation="transition.slideDownIn" delay={300}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: { sm: "space-between" },
                    pb: 4,
                }}
            >
                {response.isChat ? (
                    <Box sx={{ height: 40 }}>
                        <Button
                            className="back-button"
                            onClick={fetchData}
                        >
                            <KeyboardBackspaceIcon className="back-icon" />
                            Back
                        </Button>

                    </Box>
                ) : <Box></Box>
                }
                {!response.isChat ? (
                    <Box sx={{ height: 40 }}>
                        <Button className="create-agent" onClick={()=>setAgentCreate(!agentCreate)} >
                            <AddIcon sx={{ border: "1px solid white", borderRadius: "50%", fontSize: "1.1rem", mr: 2 }} />
                            Create Agent
                        </Button>
                    </Box>
                ) : null}
            </Box>

            {agentCreate ? <AgentCreateDialogs/> :null}
    </AppAnimate>
    );
};

export default HeaderContent;
