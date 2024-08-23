

import Box from "@mui/material/Box";
import { Fonts } from "@crema/constants/AppEnums";
import { SummaryDetails } from "@crema/types/models/summary";
import { useContext } from "react";
import { SampleContext } from "../index";
type Props = {
  data: SummaryDetails;
};
const SummaryItem = ({ data }: Props) => {
  const { setIsChat,setQuestion,setChatData } = useContext(SampleContext);

  const lowrisk = {
    background: '#E3EFE6', // Example active background color
    color:"#449355"
  };

  const mediumrisk = {
    background: '#FBF4DD', // Default background color
    color:"#DCAD05"
  };
  const hightrisk = {
    background: '#FFEBEB', // Default background color
    color:"#E01E1E"
  };

 const clickcard = (value:string) =>{
  setChatData(passValue(value))
  setIsChat(true)
  setQuestion(value);
 }
  const passValue=(value:any)=>{
    return { question: value, data: '', onFocus: true }
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
            lineHeight: "26.4px"
          }}
        >
          {data.project_name}
          <Box
            component="span"
            sx={{
              width:"67px",
              height:"24px",
              fontSize:"12px", 
              fontWeight: "normal", 
              padding:"4px 8px 4px 8px",
              borderRadius:"2px",
              marginLeft:"1rem",
              ...(data.risk_level=="Low" ? lowrisk :data.risk_level=="High" ? hightrisk :mediumrisk)
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
