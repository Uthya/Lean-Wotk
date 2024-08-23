import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppAnimate from "../AppAnimate";
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
type AppComponentHeaderProps = {
  // title: string;
  data?: string;
};

const AppComponentHeader: React.FC<AppComponentHeaderProps> = ({
}) => {
  return (
    <AppAnimate animation="transition.slideDownIn" delay={300}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-between" },
          pb: 4,
        }}
      >
        <Box sx={{ height: 40 }}>
          <Button
            sx={{
              background: "transparent", color: "black", border:0, px: 0,
              '&:focus': {
                background: "#transparent",  // Focus background color
                border:0,      // Focus text color
              }
            }}>
            <KeyboardBackspaceIcon sx={{ border: 0,color:"#BFCAC6", borderRadius: "50%", fontSize: "1.5rem", mr: 2 }} />
            <p style={{ textAlign: "center",fontWeight:"500", fontSize: "22px" }}>Back</p>
          </Button>

        </Box>
        {/* {refUrl ? ( */}
        <Box sx={{ height: 40 }}>
          <Button
            sx={{
              background: "#06403A", color: "white", borderRadius: "2px", px: 4, '&:hover': {
                background: "#06403A", // Hover background color
                color: "white",       // Hover text color
              },
              '&:focus': {
                background: "#06403A",  // Focus background color
                color: "white",       // Focus text color
              }
            }}>
            <AddIcon sx={{ border: "1px solid white", borderRadius: "50%", fontSize: "1.1rem", mr: 2 }} />
            <p style={{ textAlign: "center", marginBottom: "3px", fontSize: "12px" }}>Create Agent</p>
          </Button>
        </Box>
        {/* ) : null} */}
      </Box>
    </AppAnimate>
  );
};

export default AppComponentHeader;
