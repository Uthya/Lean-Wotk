import React from "react"
import { Avatar, Box, Link, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


const TryPro: React.FC = () => {
    return (
        <div style={{ left: "24px", bottom: "20px", position: "absolute", right: "12px" }}>
            <Box
                sx={{
                    width: 300,
                    padding: 2,
                    border: '0px solid #ddd',
                    borderRadius: 2,
                    textAlign: 'left',
                }}
            >
                <Typography style={{ fontFamily: "Fira Sans", fontSize: 12, color: "#000", fontWeight: 600 }}>Try Pro</Typography>
                <Typography variant="body2" style={{ fontFamily: "Fira Sans", fontSize: 10, color: "#000", padding: "4px 12px 0px 0px" }}>
                    Upgrade for image upload,<br></br> smarter AI, and more Pro<br></br> Search.
                </Typography>
                <Link href="#" sx={{ display: "flex", marginY: 3, color: "#06403A" }}>
                    <ArrowOutwardIcon sx={{ width: "14.6px", height: "14.6px", marginLeft: "4px" }} />
                    <p style={{ fontSize: "10px", marginLeft: "8px" }} >Upgrade</p>
                </Link>
                <Box sx={{ marginTop: 8, display: "flex", justifyContent: "left", alignItems: "center" }}>
                    <Avatar
                        alt="Profile"
                        src="/assets/images/avatar/A3.jpg"
                        sx={{ width: 34, height: 34 }}
                    />
                    <Typography style={{ fontFamily: "Fira Sans", fontSize: 14, color: "#000" }} marginTop={1} marginLeft={2}>
                        Johndoe.ux
                    </Typography>
                    <NavigateNextIcon sx={{ marginLeft: "8px" }} />
                </Box>
            </Box>
        </div>
    )
}
export default TryPro