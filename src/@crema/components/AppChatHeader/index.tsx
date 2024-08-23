import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppAnimate from "../AppAnimate";
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect, useState } from "react";


interface AppChatHeaderProps {
  question: string;
  data: string;
  isChat: boolean;
  onDataFetched: (data: { question: string; data: string; isChat: boolean }) => void;
}

const AppChatHeader: React.FC<AppChatHeaderProps> = ({ question, data, isChat, onDataFetched }) => {
  const [response, setResponse] = useState<{ question: string; data: string; isChat: boolean }>({
    question: "",
    data: "",
    isChat: false,
  });

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
            <Button className="create-agent">
              <AddIcon sx={{ border: "1px solid white", borderRadius: "50%", fontSize: "1.1rem", mr: 2 }} />
              Create Agent
            </Button>
          </Box>
        ) : null}
      </Box>
    </AppAnimate>
  );
};

export default AppChatHeader;
