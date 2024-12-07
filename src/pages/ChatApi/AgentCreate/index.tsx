
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useContext, useEffect, useState } from 'react';
import { ChatAiContext } from '../index';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'
import CloseIcon from '@mui/icons-material/Close';
import EmailInputField from '../Weekly Update Agent';
const AgentCreateDialogs = () => {
    const [agentModalOpen, setAgentModalOpen] = useState(false);
    const { agentCreate, setAgentCreate, setIsWeeklyUpdate, isWeeklyUpdate } = useContext(ChatAiContext);
    const [selectAgentType, setSelectAgentType] = useState("");
    const dropDownlist = [
        { label: 'Send Bi-Weekly Update Agent' },
    ]
    const handleModalOpen = () => {
        setAgentModalOpen(true);
    };
    const handleModalClose = () => {
        setAgentModalOpen(false);
        setAgentCreate(!agentCreate)
    };
    useEffect(() => {
        handleModalOpen();
    }, [])
    
    const handleDialogClose = (_event: any, reason: any) => {
        if (reason !== 'backdropClick') {
            handleModalClose();
        }
    };
    const getDropDownvalue = (_event: any, value: string) => {
        setSelectAgentType(value)
    };

    useEffect(() => {
        if (selectAgentType != null && selectAgentType != undefined && selectAgentType !="") {
            setIsWeeklyUpdate(!isWeeklyUpdate)
        }
    }, [selectAgentType])

    return (
        <>
            <Dialog
                onClose={handleDialogClose}
                aria-labelledby="customized-dialog-title"
                open={agentModalOpen}
                sx={{ '& .MuiDialog-paper': { minWidth: '450px', minHeight: "286px" } }}
            >
                <DialogTitle className="dflex jusitfy-between" sx={{ m: 0, p: 2, }} id="customized-dialog-title">
                    <h2>Create Agent</h2>
                    <Button className="back-button" sx={{ minWidth: "auto" }} onClick={handleModalClose}>
                        <CloseIcon className="modalback-icon" />
                    </Button>
                </DialogTitle>

                <DialogContent dividers className="dflex flex-column jusitfy-evenly">
                    <div>
                        <Autocomplete
                            disablePortal
                            options={dropDownlist}
                            sx={{ width: 300 }}
                            onInputChange={(event, newInputValue) => getDropDownvalue(event, newInputValue)}
                            isOptionEqualToValue={(option, value) => option.label === value.label}
                            renderInput={(params) => <TextField {...params} label="Featured Agents" />}
                        />
                    </div>
                    <div className="dflex flex-column jusitfy-between w-100">
                        <h4 style={{ alignSelf: "start" }}>Create custom agents</h4>
                        <Button variant="contained" sx={{ marginTop: "1rem", alignSelf: 'center' }}>Create</Button>
                    </div>
                    {isWeeklyUpdate ? <EmailInputField ></EmailInputField> : null}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AgentCreateDialogs;