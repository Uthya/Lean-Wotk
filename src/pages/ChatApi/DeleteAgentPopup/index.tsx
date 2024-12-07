
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import React, { useContext, useEffect, useState } from 'react';
import { ChatAiContext } from '../index';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
interface DeleteAgentProps {
    agentId: string; // Example of a prop, you can add more props as needed
}
const DeleteAgent: React.FC<DeleteAgentProps> = ({ agentId }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { IsDeleteAgent, setDeleteAgent } = useContext(ChatAiContext);

    const handleDeleteModalOpen = () => {
        setDeleteModalOpen(true);
    };
    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
        setDeleteAgent(!IsDeleteAgent)
    };
    useEffect(() => {
        handleDeleteModalOpen();
    }, [])

    const handleDeleteDialogClose = (_event: any, reason: any) => {
        if (reason !== 'backdropClick') {
            handleDeleteModalClose();
        }
    };
    const deleteAgent = async () => {
        const DeleteAPI = "https://api.leanworks.ai/dev/agent/delete?";
        const sessionId = localStorage.getItem("HomePageSessionId") || "";
        const deleteAgentParams = new URLSearchParams({
            user_id: "leanwork1000",
            session_id: sessionId,
            client_name: "leanworks",
            agent_id: agentId,
        })
        try {
            await axios.delete(DeleteAPI + deleteAgentParams);
            handleDeleteModalClose();
        }
        catch {

        } finally {

        }
    }
    useEffect(() => {
        handleDeleteModalOpen();
    }, [])

    return (
        <>
            <Dialog
                onClose={handleDeleteDialogClose}
                aria-labelledby="customized-dialog-title"
                open={deleteModalOpen}
                sx={{ '& .MuiDialog-paper': { minWidth: '450px' } }}
            >
                <DialogTitle className="dflex jusitfy-between" sx={{ m: 0, p: 2, }} id="customized-dialog-title">
                    <h2>Delete Agent</h2>
                    <Button className="back-button" sx={{ minWidth: "auto" }} onClick={handleDeleteModalClose}>
                        <CloseIcon className="modalback-icon" />
                    </Button>
                </DialogTitle>

                <DialogContent dividers className="dflex flex-column jusitfy-evenly" sx={{ padding: "0px" }}>
                    <div style={{ fontSize: "20px", margin: "2rem 0rem" }}>
                        Are you sure want to delete Agent?
                    </div>
                    <div className="w-100" style={{ display: "flex", justifyContent: "end", marginBottom: "0.5rem", paddingRight: "1rem", width: "100%", borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
                        <Button variant="contained" sx={{ marginTop: "0.5rem", marginRight: "1rem" }} onClick={deleteAgent}>Yes</Button>
                        <Button variant="contained" sx={{ marginTop: "0.5rem", }} onClick={handleDeleteModalClose} >No</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DeleteAgent;