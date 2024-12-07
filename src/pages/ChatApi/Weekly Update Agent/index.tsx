import { useContext, useEffect, useState } from 'react';
import { TextField, IconButton, Chip, Box, Dialog, DialogTitle, DialogContent, Button, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ChatAiContext } from '../index';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from '@crema/services/axios';
import { v4 as uuidv4 } from 'uuid';

const EmailInputField = () => {
    const [email, setEmail] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [emails, setEmails] = useState<string[]>([]);
    const [invalidMail, setInvalidMail] = useState("");
    const [weeklyAgentOpen, setWeeklyAgentOpen] = useState(false);
    const { isWeeklyUpdate, setIsWeeklyUpdate, agentCreate, setAgentCreate, setIsloading, setSummaryDetail } = useContext(ChatAiContext);
    const [eventType, setEventType] = useState("Manual");
    const eventDropDownlist = ["Manual", "On_Open"];
    const [subject, setSubject] = useState("");
    const [sourceName, setSourceName] = useState("");
    const setAgentEmail = (e: any) => {
        setEmail(e.target.value);
    }
    const set_DisplayName = (e: any) => {
        setDisplayName(e.target.value);
    }

    useEffect(() => {
        modalOpen();
    }, [])

    const handleAddEmail = () => {        
        if (email && validateEmail(email)) {
            if (!emails.includes(email)) {
                let mailArray =[]
                mailArray = emails;
                mailArray.push(email)
                setEmails(mailArray);
            }
            setEmail('');            
        }
        else {
            const error = "Enter valid mail"
            setInvalidMail(error);
            setTimeout(() => {
                setInvalidMail("");
            }, 3000);
        }
    };

    const handleDeleteEmail = (emailToDelete: any) => {
        setEmails(emails.filter((e) => e !== emailToDelete));
    };

    const validateEmail = (email: any) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const modalOpen = () => {
        setWeeklyAgentOpen(true);
    };
    const modalClose = () => {
        setWeeklyAgentOpen(false);
        setIsWeeklyUpdate(!isWeeklyUpdate)
    };

    const handleDialogClose = (_event: any, reason: any) => {
        if (reason !== 'backdropClick') {
            modalClose();
        }
    };
    const getEventDropDownvalue = (_event: any, value: string) => {
        setEventType(value)
    };

    const checkValidation = () => { 
        let isValidate = false
        let  error=""
        handleAddEmail()
        if (emails.length === 0 && validateEmail(email) && eventType && displayName && sourceName && subject) {
            isValidate = true;
        }
        else if (emails.length != 0 && eventType && displayName && sourceName && subject) {
            isValidate = true;
        }
        else {
            if(validateEmail(email) || emails.length > 0 ){
                error = ""
            }
            else{
                error = "Enter valid Mail"
                setInvalidMail(error);
            }
            isValidate = false;
            setTimeout(() => {
                setInvalidMail("");
            }, 3000);
        }
        if (isValidate) {
            createAgent();
        }
    }
   const current_date=new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit',hour: '2-digit', minute: '2-digit' });
 
   const createAgent = async () => {
        const agentCreateAPI = "https://api.leanworks.ai/dev/agent/create"
        const AgentCreatePayload = {
            "user_id": "leanwork1000",
            "session_id": localStorage.getItem("HomePageSessionId"),
            "client_name": "leanworks",
            "agent_config": {
                "agent_id": uuidv4(),
                "agent_name": "send_update_agent",
                "display_name": displayName,
                "create_time": Date.now,
                "trigger_event": eventType,
                "conent": [
                    {
                       "Subscribers":emails,
                       "Sender_Name":sourceName,
                       "Subject":subject,
                       "Create_Date": current_date,
                       "Last_Updated" :current_date
                    }
                ]
            }
        }
        try {
            setIsloading(true);
            await axios.post(agentCreateAPI, AgentCreatePayload);
            SendMail();
            GetAgentList();
        }
        catch (error) {
            console.error("There was an error making the request!", error);
        }
        finally {
            setIsWeeklyUpdate(!isWeeklyUpdate);
            setAgentCreate(!agentCreate);

        }
    }

    const GetAgentList = async () => {
        const AgentListAPI = "https://api.leanworks.ai/dev/agent/list?";
        const sessionId = localStorage.getItem("HomePageSessionId") || "";
        const agentListParams = new URLSearchParams({
            user_id: "leanwork1000",
            session_id: sessionId,
            client_name: "leanworks"
        })
        try {
            setIsloading(true);
            const response = await axios.get(AgentListAPI + agentListParams);
            const rawContent = response.data
            const rawContentfilter = rawContent.filter((a: null | undefined) => (a != undefined || a != null)).map((e: { agent_name: any; display_name: any; conent: any; }) => ({ agent_name: e.agent_name, display_name: e.display_name, content: e.conent }))
            setSummaryDetail(rawContentfilter)
        } catch (error) {
            console.error("There was an error making the request!", error);
        }
        finally {
            setIsloading(false);
        }
    }

    const SendMail = async () => {
        const SendMailAPI = "https://api.leanworks.ai/dev/send_bi_weekly_update"

        const TiggerPayload =
        {
            "user_id": "leanwork1000",
            "session_id": localStorage.getItem("HomePageSessionId"),
            "client_name": "leanworks",
            "model_name": "gpt-4o-mini",
            "subscribers": (emails.length > 0 ? emails : [email]),
            "name": sourceName,
            "subject": subject
        }
        try {
            setIsloading(true);
            await axios.post(SendMailAPI, TiggerPayload);
        }
        catch (error) {
            console.error("There was an error making the request!", error);
        }
        finally {
            setIsloading(false);
        }
    }
    const set_SourceName = (e: any) => {
        setSourceName(e.target.value);
    }
    const set_Subject = (e: any) => {
        setSubject(e.target.value);
    }

    return (
        <>
            <Dialog
                onClose={handleDialogClose}
                aria-labelledby="customized-dialog-title"
                open={weeklyAgentOpen}
                sx={{ '& .MuiDialog-paper': { minWidth: '450px', minHeight: "286px", height: "auto" } }}
            >
                <DialogTitle className="dflex jusitfy-between" sx={{ m: 0, p: 2, }} id="customized-dialog-title">

                    <Button className="back-button" sx={{ minWidth: "auto" }} onClick={modalClose}>
                        <KeyboardBackspaceIcon className="modalback-icon" />
                    </Button>
                </DialogTitle>

                <DialogContent dividers>
                    <Box >
                        <Autocomplete
                            disablePortal
                            options={eventDropDownlist}
                            value={eventType}
                            onInputChange={(event, newInputValue) => getEventDropDownvalue(event, newInputValue)}
                            isOptionEqualToValue={(option, value) => option === value || option == ""}
                            renderInput={(params) => <TextField {...params} label="Event Type" />}
                        />
                    </Box>
                    <Box mt={4} display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" alignItems="center" alignSelf="normal">
                            <TextField
                                variant="outlined"
                                label="Display Name"
                                value={displayName}
                                onChange={(e) => set_DisplayName(e)}
                                sx={{ flexGrow: 1 }}
                            />
                        </Box>
                        <Box mt={2} display="flex" alignItems="center" alignSelf="normal">
                            <TextField
                                variant="outlined"
                                label="Enter email"
                                value={email}
                                onChange={(e) => setAgentEmail(e)}
                                sx={{ flexGrow: 1, marginRight: '8px' }}
                            />
                            <IconButton color="primary" onClick={handleAddEmail}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        { invalidMail ? <p className="invalid-mail">{invalidMail}</p>: null}
                        <Box mt={2} display="flex" width={"400px"} flexWrap="wrap">
                            {emails.map((email, index) => (
                                <Chip
                                    key={index}
                                    label={email}
                                    onDelete={() => handleDeleteEmail(email)}
                                    sx={{ margin: '4px' }}
                                />
                            ))}
                        </Box>
                        {/* <Box mt={4} display="flex" flexDirection="column" gap={2}> */}
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
                            <Button variant="contained" className="btn-save" onClick={()=>{ checkValidation() }} disabled={!displayName || !sourceName || !subject}>Create</Button>
                        </div>
                </DialogContent>
            </Dialog>

            {/* {isloading ?
                <Loader></Loader>
                : null} */}
        </>
    );
}

export default EmailInputField;
