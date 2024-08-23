import { Box } from "@mui/material"
import { useContext } from "react"
import { ChatAiContext } from "../index"


const Sources = () => {
    const {dataSource}= useContext(ChatAiContext)
    return (
        <div style={{ background: "#fff", paddingTop: "2rem" }}>
            <Box sx={{ background: "#FFF", padding: "0rem 2.5rem", marginTop: "3rem", borderLeft: "2px solid #BFCAC6" }}>
                <Box
                    component="p"
                    sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        mb: 6,
                        lineHeight: "26px"
                    }
                    }
                >
                    {"Sources"}
                </Box>

                {dataSource.map((value:any,index:number)=>(
                    <div key={index} style={{width:"auto"}}>
                    < Box
                    component="p"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mb: 2,
                        lineHeight: "24px",
                        wordWrap: "break-word", 
                        overflowWrap: "break-word", 
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            mb: 2,
                            mr: 2,
                            lineHeight: "24px"
                        }}
                    >
                        {index + 1 +"."}
                    </Box>
                    {value}
                </Box>
                </div>
                ))}
                
                


            </Box>

        </div>
    )

}


export default Sources