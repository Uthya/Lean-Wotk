import Grid from "@mui/material/Grid";
import AppGridContainer from "@crema/components/AppGridContainer";
import SearchBar from "./SearchBar";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import ChatPage from "./ChatPage";
import AppChatHeader from "@crema/components/AppChatHeader";
import SummaryCards from "./SummarySlider";
import { lowerCase } from "lodash";


interface ChatAiContextType {
  isChat: boolean;
  question: string;
  ChatData: any;
  isSummary: boolean;
  historyData: any;
  relatedQuestion: any;
  dataSource: any;
  SelectedRelatedQuestion: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>; // Add the setter function type
  setIsChat: React.Dispatch<React.SetStateAction<boolean>>; // Add the setter function type
  setChatData: React.Dispatch<React.SetStateAction<{}>>;
  setisSummary: React.Dispatch<React.SetStateAction<boolean>>;
  setHistoryData: React.Dispatch<React.SetStateAction<any>>;
  setRelatedQuestion: React.Dispatch<React.SetStateAction<any>>;
  setDataSource: React.Dispatch<React.SetStateAction<any>>;
  setSelectRelatedQuestion: React.Dispatch<React.SetStateAction<any>>;
}

const defaultContextValue: ChatAiContextType = {
  isChat: false,
  question: "",
  ChatData: null,
  isSummary: false,
  historyData: null,
  relatedQuestion: null,
  dataSource: null,
  SelectedRelatedQuestion: "",
  setQuestion: () => { },
  setIsChat: () => { },
  setChatData: () => { },
  setisSummary: () => { },
  setHistoryData: () => { },
  setRelatedQuestion: () => { },
  setDataSource: () => { },
  setSelectRelatedQuestion: () => { }
};

export const ChatAiContext = createContext<ChatAiContextType>(defaultContextValue);

const ChatApi = () => {

  const [loading, setloading] = useState(false);
  const [isChat, setIsChat] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [SummaryDetail, setSummaryDetail] = useState([]);
  const OrderBySummaryDetails = ['high', 'medium', 'low'];
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [isSummary, setisSummary] = useState<boolean>(false);
  const [relatedQuestion, setRelatedQuestion] = useState<any[]>([]);
  const [SelectedRelatedQuestion, setSelectRelatedQuestion] = useState<any>("");
  const [ChatData, setChatData] = useState<any>({ question: '', data: '', isChat: false });
  const summaryEndPoint = 'https://api.leanworks.ai/dev/get_exec_summary?';
  const handleDataFetchedHeader = (fetchedData: { question: string; data: string; isChat: boolean }) => {
    setisSummary(fetchedData.isChat);
    setIsChat(fetchedData.isChat);
    setChatData(fetchedData);
    setQuestion(fetchedData.question);
  }

  useEffect(() => {
    setTimeout(() => {
      createSessionId();
    }, 100);
    setTimeout(() => {
      GetsummaryDetails();
    }, 300);
  }, [])

  const createSessionId = async () => {
    const CreateSessionAPI = "https://api.leanworks.ai/dev/create_session?"
    const sessionId = (isSummary ? localStorage.getItem("SummaryPageSessionId") || "" : localStorage.getItem("HomePageSessionId") || "");
    const params = new URLSearchParams({
      "user_id": "zyf1994",
      "session_id": sessionId,
      "client_name": "leanworks"
    });
    try {
      setloading(true);
      const response = await axios.post(CreateSessionAPI + params);
      console.log(response);
      
    }
    catch (error) {
      console.error("There was an error making the request!", error);
    }
    finally {
      setloading(false);
    }
  }

  const sortedItems = (items: any[]) => {
    items.sort((a, b) => {
      return OrderBySummaryDetails.indexOf(lowerCase(a.risk_level)) - OrderBySummaryDetails.indexOf(lowerCase(b.risk_level));
    });
  }
  const GetsummaryDetails = async () => {
    const sessionId = localStorage.getItem("HomePageSessionId") || "";
    const params = new URLSearchParams({
      user_id: 'zyf1994',
      session_id: sessionId,
      client_name: 'leanworks',
    });

    try {
      setloading(true);
      const response = await axios.get(summaryEndPoint + params);
      const rawContent = response.data.content;
      sortedItems(rawContent);
      setSummaryDetail(rawContent);

    } catch (error) {
      console.error("There was an error making the request!", error);
    }
    finally {
      setloading(false);
    }
  }

  return (
    <ChatAiContext.Provider
      value={{
        isChat,
        question,
        ChatData,
        historyData,
        isSummary,
        relatedQuestion,
        dataSource,
        SelectedRelatedQuestion,
        setQuestion,
        setIsChat,
        setChatData,
        setHistoryData,
        setisSummary,
        setRelatedQuestion,
        setDataSource,
        setSelectRelatedQuestion
      }}
    >
      <div>
        {/* Header section */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%", position: "relative" }}>
          <AppChatHeader question={ChatData.question} data={ChatData.data} isChat={isSummary} onDataFetched={handleDataFetchedHeader} />
          {!isSummary ? (
            <div style={{ padding: "0px 16px", background: "#ECF1EF" }}>
              <AppGridContainer>
                <Grid item xs={12} md={12}>
                  <SummaryCards relatedCourses={SummaryDetail} />
                </Grid>
              </AppGridContainer>
            </div>
          ) : null}
        </div>
        {ChatData.question ? (
          <ChatPage data={ChatData.data} question={ChatData.question} />
        ) : (
          <div></div>
        )}
        <SearchBar />
      </div>


      {loading ?
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
    </ChatAiContext.Provider>
  );
};

export default ChatApi;


