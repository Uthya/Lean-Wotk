import Grid from "@mui/material/Grid";
import AppGridContainer from "@crema/components/AppGridContainer";
import SearchBar from "./SearchBar";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import ChatPage from "./ChatPage";
import SummaryCards from "./SummarySlider";
import AppChatHeader from "@crema/components/AppChatHeader";
// import { Margin } from "@mui/icons-material";

interface SampleContextType {
  isChat: boolean;
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>; // Add the setter function type
  setIsChat: React.Dispatch<React.SetStateAction<boolean>>; // Add the setter function type
  setChatData: React.Dispatch<React.SetStateAction<{}>>;
}

const defaultContextValue: SampleContextType = {
  isChat: false,
  question: "",
  setQuestion: () => { },
  setIsChat: () => { }, 
  setChatData: () => { }, 
};

export const SampleContext = createContext<SampleContextType>(defaultContextValue);

export const samplecontext = createContext("");
const Crypto = () => {
  const [data, setData] = useState({ question: '', data: '', isChat: false });
  const [SummaryDetail, setSummaryDetail] = useState([]);
  const [isChat, setIsChat] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [ChatData, setChatData] = useState<any>({ question: '', data: '', onFocus: false });
  const handleDataFetchedHeader = (fetchedData: { question: string; data: string; isChat: boolean }) => {
    setData(fetchedData);
    setChatData(fetchedData)
    setQuestion(fetchedData.question)
    setIsChat(fetchedData.isChat)
  }

  useEffect(() => {
    GetsummaryDetails();
  }, [])

  const GetsummaryDetails = async () => {
    const summaryEndPoint = 'http://34.168.168.140:8080/leanworks/get_exec_summary?'
    const params = new URLSearchParams({
      user_id: 'zyf1994',
      session_id: 'faeskfh',
      client_name: 'leanworks',
    });

    try {
      const response = await axios.get(summaryEndPoint + params);
      const rawContent = response.data.content;
      const jsonString = rawContent.replace(/```json\n|```/g, ''); // regex
      // Parse the JSON string into an array of objects
      const parsedData = JSON.parse(jsonString);
      setSummaryDetail(parsedData);

    } catch (error) {
      console.error("There was an error making the request!", error);
    }
    finally {

    }
  }

  return (
    <SampleContext.Provider value={{ isChat,setChatData, setQuestion, question, setIsChat }}>      <div>
      {/* Header section */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%", position: "relative" }}>

        <AppChatHeader question={data.question} data={data.data} isChat={isChat} onDataFetched={handleDataFetchedHeader} />
        {!isChat ? (
          <div style={{ padding: "0px 16px", background: "#ECF1EF" }}>
            <AppGridContainer>
              <Grid item xs={12} md={12}>
                <SummaryCards relatedCourses={SummaryDetail} />
              </Grid>
            </AppGridContainer>
          </div>
        ) : null}
      </div>
      {ChatData.data ?  (
        <ChatPage data={ChatData.data} question={ChatData.question} />
      ) : (
        <div></div>
      )}
      <SearchBar />
    </div>
    </SampleContext.Provider>
  );
};



export default Crypto;


