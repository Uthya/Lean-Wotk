import { useContext, useEffect, useState } from 'react';
import { TextField, Box, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChatAiContext } from '../index';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
interface tiggerDetailsProps {
    Mails: any[];
}

const TiggerMail: React.FC<tiggerDetailsProps> = ({ Mails }) => {
    const [subject, setSubject] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [tiggerModalOpen, setTiggerModalOpen] = useState(false);
    const { setTiggerModal, tiggerModal, setIsloading, agentData ,globalUserId } = useContext(ChatAiContext);
    const current_date=new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit',hour: '2-digit', minute: '2-digit' });


    useEffect(() => {
        modalOpen();
    }, [])

    const set_SourceName = (e: any) => {
        setSourceName(e.target.value);
    }
    const set_Subject = (e: any) => {
        setSubject(e.target.value);
    }

    const modalOpen = () => {
        setTiggerModalOpen(true);
    };
    const modalClose = () => {
        setTiggerModalOpen(false);
        setTiggerModal(!tiggerModal);
    };

    const handleDialogClose = (_event: any, reason: any) => {
        if (reason !== 'backdropClick') {
            modalClose();
        }
    };

    const SendMail = async () => {
        const SendMailAPI = "https://api.leanworks.ai/dev/send_bi_weekly_update"
        const SubscribersEmails = JSON.parse(localStorage.getItem("Subscribers") || "[]");

        const TiggerPayload =
        {
            "user_id": "leanwork1000",
            "session_id": localStorage.getItem("HomePageSessionId"),
            "client_name": "leanworks",
            "model_name": "gpt-4o-mini",
            "subscribers": SubscribersEmails,
            "name": sourceName,
            "subject": subject
        }
        try {
            setIsloading(true);
             await axios.post(SendMailAPI, TiggerPayload);
            updateAgent();
            setTiggerModal(!tiggerModal);

        }
        catch (error) {
            console.error("There was an error making the request!", error);
        }
        finally {
        }
    }

    const updateAgent = async () => {
        const UpdateAgentAPI = "https://api.leanworks.ai/dev/agent/update"
        try {
            setIsloading(true);
            console.log(agentData,'agentData');
            
            agentData.conent = agentData.content;  // Copy the value
            delete agentData.content;
            agentData.trigger_event= "manual";
            agentData.create_time = current_date;
            agentData.conent[0].Sender_Name = sourceName;
            agentData.conent[0].Subject = subject;
            agentData.conent[0].Last_Updated = current_date;
            const payload = {
                "user_id": globalUserId,
                "session_id": localStorage.getItem("HomePageSessionId"),
                "client_name": "leanworks",
                "agent_config": agentData
              }
              console.log(payload,'payload');

            await axios.put(UpdateAgentAPI, payload);
        }
        catch (error) {
            console.error("There was an error making the request!", error);
        }
        finally {
            setIsloading(false);
        }
    }

    return (
        <>
            <Dialog
                onClose={handleDialogClose}
                aria-labelledby="customized-dialog-title"
                open={tiggerModalOpen}
                sx={{ '& .MuiDialog-paper': { minWidth: '450px', minHeight: "286px", height: "auto" } }}
            >
                <DialogTitle className="dflex jusitfy-between" sx={{ m: 0, p: 2, }} id="customized-dialog-title">

                    <p></p>
                    <Button className="back-button" sx={{ minWidth: "auto" }} onClick={modalClose}>
                        <CloseIcon className="modalback-icon" />
                    </Button>
                </DialogTitle>

                <DialogContent dividers>

                    <Box mt={4} display="flex" flexDirection="column" gap={2}>

                        <Box mb={4}>
                            <p style={{ fontWeight: "500", fontSize: "1rem", marginBottom: "4px" }}>{"Subscribers : "}</p>
                            {Mails ? (
                                Mails.map((email, index) => <p style={{ marginLeft: "48px", marginBottom: "4px", fontSize: "1rem" }} key={index}><SendIcon sx={{ fontSize: "1.1rem", paddingTop: "6px", marginRight: "4px" }} />{email}</p>)
                            ) : null}
                        </Box>
                        <Box display="flex" alignItems="center" alignSelf="normal">
                            <TextField
                                variant="outlined"
                                label="Sender Name"
                                value={sourceName}
                                onChange={(e) => set_SourceName(e)}
                                sx={{ flexGrow: 1 }}
                            />
                        </Box>
                        <Box display="flex" alignItems="center" alignSelf="normal" mt={4}>
                            <TextField
                                variant="outlined"
                                label="Subject"
                                value={subject}
                                onChange={(e) => set_Subject(e)}
                                sx={{ flexGrow: 1 }}
                            />
                        </Box>


                    </Box>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" className="btn-save" onClick={SendMail}>Send</Button>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    );
}

export default TiggerMail;
