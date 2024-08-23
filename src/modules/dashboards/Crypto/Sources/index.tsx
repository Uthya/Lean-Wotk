import { Box } from "@mui/material"


const Sources = () => {

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
                < Box
                    component="p"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mb: 2,
                        lineHeight: "24px"
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            mb: 2,
                            mr: 1,
                            lineHeight: "24px"
                        }}
                    >
                        {"1"}
                    </Box>
                    {" Generative artificial intelligence"}
                </Box>
                < Box
                    component="p"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mb: 2,
                        lineHeight: "24px"
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            mb: 2,
                            mr: 1,
                            lineHeight: "24px"
                        }}
                    >
                        {"2"}
                    </Box>
                    {" AI Customer Service For Dentists: Smile Brighter"}
                </Box>
                < Box
                    component="p"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mb: 2,
                        lineHeight: "24px"
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            mb: 2,
                            mr: 1,
                            lineHeight: "24px"
                        }}
                    >
                        {"3"}
                    </Box>
                    {" Generative artificial intelligence"}
                </Box>
            </Box>

        </div>
    )

}


export default Sources