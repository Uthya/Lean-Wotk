import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the context type
interface ChatAiContextType {
  isChat: boolean;
  question: string;
  ChatData: any;
  historyData:any;
  isSummary:boolean,
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  setIsChat: React.Dispatch<React.SetStateAction<boolean>>;
  setChatData: React.Dispatch<React.SetStateAction<{}>>;
  setHistoryData : React.Dispatch<React.SetStateAction<any>>;
  setisSummary: React.Dispatch<React.SetStateAction<boolean>>;
}

// Default values for the context
const defaultContextValue: ChatAiContextType = {
  isChat: false,
  question: "",
  ChatData: {},
  historyData:null,
  isSummary:false,
  setQuestion: () => {},
  setIsChat: () => {},
  setChatData: () => {},
  setHistoryData:() => {},
  setisSummary:() =>{}
};

// Create the context
export const ChatAiContext = createContext<ChatAiContextType>(defaultContextValue);

// Create a provider component
interface ChatAiProviderProps {
  children: ReactNode;
}
export const UseChatAiContext = () => useContext(ChatAiContext);


export const ChatAiProvider: React.FC<ChatAiProviderProps> = ({ children }) => {
  const [isChat, setIsChat] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [isSummary, setisSummary] = useState<boolean>(false);
  const [ChatData, setChatData] = useState<any>({ question: '', data: '', isChat: false });
  return (
    <ChatAiContext.Provider
      value={{
        isChat,
        question,
        ChatData,
        historyData,
        isSummary,
        setQuestion,
        setIsChat,
        setChatData,
        setHistoryData,
        setisSummary
      }}
    >
      {children}
    </ChatAiContext.Provider>
  );
};
