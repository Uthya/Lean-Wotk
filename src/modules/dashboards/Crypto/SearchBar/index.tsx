
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import NorthIcon from '@mui/icons-material/North';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { SampleContext } from '../index';

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
      borderColor: '#CCDCD9 !important',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#003f7f !important',
      outline: 'none', // Border color when focused
    },
  },
});

const SearchBar: React.FC = () => {
  const { isChat,question, setChatData } = useContext(SampleContext);
  const [Inputvalue, setInputvalue] = useState("");
  const [isloading, setisloading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const EndPointUrl = "http://34.168.168.140:8080/leanworks/ask"
  const payload = {
    user_input: "",
    user_id: "zyf1994",
    session_id: "a2",
    project_name: "leanworks",
    client_name: "leanworks"
  }
  const getInputvalue = async () => {
    payload.user_input = (Inputvalue == null || Inputvalue == undefined || Inputvalue == '') ? payload.user_input : Inputvalue;
    payload.session_id = generateRandomString(3);

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
        // clickChat()
        const chatResult = {
          question: payload.user_input,
          data: response.data.content,
          isChat: false
        }
        setChatData(chatResult);
        // setIsChat(chatResult.isChat)

      } catch (error) {
        setisloading(true);
        console.error("There was an error making the request!",isChat, error);
      }
      finally {
        setisloading(false);
        setInputvalue("");
      }
    }
  }
  // const clickChat = () => {
  //   const chatResult = {
  //     question: '',
  //     data: '',
  //     onFocus: true
  //   }
  //   if (isChat != chatResult.onFocus) {
  //     setChatData(chatResult)
  //     setIsChat(chatResult.onFocus)
  //   }
  // }

  // Call this function to cancel the request
  const cancelRequest = () => {
    if (abortController) {
      abortController.abort();
      setInputvalue("");
      setisloading(false)
    }
  }
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      getInputvalue();
    }
  };
  const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };
useEffect(()=>{
    setInputvalue(question)
    payload.user_input=question
    getInputvalue();
},[question])
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      zIndex: 2,
      display: "flex",
      justifyContent: "center",
      padding: "16px 16px 24px 16px",
      backgroundColor: "transparent ",
      // #F7F9F8
      width: "calc(100% - 260px)"
    }}>

      <CustomTextField
        variant="outlined"
        value={Inputvalue}
        style={{ width: "822px", color: "black", fontWeight: 600, fontSize: "1rem", border: 0, background: "#EDF3F2", padding: "8px" }}
        placeholder="Ask anything..."
        onChange={(e) => setInputvalue(e.target.value)}
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
                <IconButton sx={{ padding: "9px", background: "#dddddd" }} onClick={getInputvalue}>
                  <NorthIcon className='icon' sx={{ fontSize: "1rem", color: "black" }} />
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
  );
};

export default SearchBar;
