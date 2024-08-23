
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import NorthIcon from '@mui/icons-material/North';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { ChatAiContext } from '../index';

const CustomTextField = styled(TextField)({
  backgroundColor: '#f7f7f7',
  borderRadius: '10px',
  opacity: 1,
  boxShadow: "0px 0px 24px 4px #D8E7E4",
  border: "0px solid #CCDCD9",
  position: 'relative',
  '&:focus-within:before': {
    opacity: 0, // set the outline on focus none(0)
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#136556 !important',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'grey !important',
      outline: 'none', 
    },
  },
});

const SearchBar: React.FC = () => {

  const { setIsChat, setChatData, isSummary,SelectedRelatedQuestion } =  useContext(ChatAiContext);
  const [SearchQuestion, setSearchQuestion] = useState("");
  const [isloading, setisloading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const EndPointUrl = "https://api.leanworks.ai/dev/ask"
  const iconDisabledColor = (SearchQuestion == null || SearchQuestion == undefined || SearchQuestion == "") ? '#00000052' : '#000';
  const payload = {
    user_input: "",
    user_id: "zyf1994",
    session_id: "a2",
    client_name: "leanworks"
  }

  useEffect(() => {
      getChatResponse();
  },[SelectedRelatedQuestion])

 
  const getChatResponse = async () => {
    payload.user_input = (SearchQuestion == null || SearchQuestion == undefined || SearchQuestion == '') ? SelectedRelatedQuestion : SearchQuestion;
    const sessionId = (isSummary ? localStorage.getItem("SummaryPageSessionId") || "" : localStorage.getItem("HomePageSessionId") || "");
    payload.session_id = sessionId;

    if (abortController) {
      abortController.abort();
    }
    // Create a new AbortController
    const controller = new AbortController();
    setAbortController(controller);
    
    if (payload.user_input != "") {
      try {
        setisloading(true);
        const response = await axios.post(EndPointUrl, payload, {
          signal: controller.signal
        });
        const chatResult = {
          question: payload.user_input,
          data: response.data.content,
          isChat: true
        }
        setChatData(chatResult);
        setIsChat(true);
      } catch (error) {
        console.error("There was an error making the request!", error);
      }
      finally {
        setisloading(false);
        setSearchQuestion("");
      }
    }
  }
  // Call this function to cancel the request
  const cancelRequest = () => {
    if (abortController) {
      abortController.abort();
      setSearchQuestion("");
      setisloading(false)
    }
  }
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      getChatResponse();
    }
  };

  return (
    <>
      <div className="search-div">
        <CustomTextField
          variant="outlined"
          value={SearchQuestion}
          className="search-input"
          placeholder="Ask anything..."
          onChange={(e) => setSearchQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" >
                <SearchIcon sx={{ color: "black", opacity: 1, fontSize: "1.5rem" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" >
                {!isloading ?
                  <IconButton sx={{ padding: "9px", background: "#dddddd" }} onClick={getChatResponse}>
                    <NorthIcon className='icon' sx={{ fontSize: "1rem", color: iconDisabledColor }} />
                  </IconButton>
                  :
                  <IconButton sx={{ padding: "9px", background: "#dddddd" }} onClick={cancelRequest}>
                    <StopCircleIcon className='icon' sx={{ fontSize: "1rem", color: "black" }} />
                  </IconButton>
                }

              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>

      {isloading ?
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
  );
};

export default SearchBar;
