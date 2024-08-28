

import Box from "@mui/material/Box";
import { Fonts } from "@crema/constants/AppEnums";
import { useContext } from "react";
import { lowerCase } from "lodash";
import { ChatAiContext } from "../index";
type Props = {
  data: SummaryDetails;
};
export type SummaryDetails = {
  id: number;
  project_name: string;
  risk_level:string;
  risk_description: string;
  summary: string;
  };
const SummaryItem = ({ data }: Props) => {
  const { setisSummary,setQuestion,setChatData,setIsChat } = useContext(ChatAiContext);
  
  const lowrisk = {
    background: '#E3EFE6', // active background color
    color:"#449355"
  };

  const mediumrisk = {
    background: '#FBF4DD', // medium background color
    color:"#DCAD05"
  };
  const hightrisk = {
    background: '#FFEBEB', // low background color
    color:"#E01E1E"
  };

 const clickcard = (value:string) =>{
  setChatData(passValue(value));
  setisSummary(true);
  setIsChat(false);
  setQuestion(value);
 }
  const passValue=(value:any)=>{
    return { question: value, data: '', isChat: false }
  }
 
  return (
    <Box
      sx={{
        px: { sm: 3 },
      }}
    >
      <Box sx={{ background: "#FFF", padding: "18px",borderRadius:"4px",maxHeight:"160px",minHeight:"160px"}} 
      onClick={()=>clickcard(data.project_name)}>
        <Box
          component="p"
          sx={{
            fontSize: "20px",
            fontWeight: Fonts.BOLD,
            mb: 2,
            lineHeight: "26.4px",
            display:"flex",
            flexDirection:"row",
            justifyContent:"start",
            alignSelf:"center"
          }}
        >
          {data.project_name}
          <Box
            component="span"
            sx={{
              height:"24px",
              fontSize:"12px", 
              fontWeight: "normal", 
              padding:"0px 8px",
              borderRadius:"2px",
              marginLeft:"1rem",
              ...(lowerCase(data.risk_level)=="low" ? lowrisk :lowerCase(data.risk_level)=="high" ? hightrisk :mediumrisk)
            }}
          >
            {data.risk_description}
          </Box>

        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#000",

          }}
        >
          <Box component="p" sx={{ fontSize: "16px", lineHeight: "24px", fontWeight: "400" }}>{data.summary}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryItem;
