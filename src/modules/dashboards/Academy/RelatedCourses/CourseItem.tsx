import Box from "@mui/material/Box";
import { Fonts } from "@crema/constants/AppEnums";
// import { SummaryDetails } from "@crema/types/models/dashboards/Academy";
type Props = {
  data: any;
};
const CourseItem = ({ data }: Props) => {
  return (
    <Box
      sx={{
        px: { sm: 3 },
      }}
    >
      <Box sx={{ background: "#FFF", padding: "18px" }}>
        <Box
          component="p"
          sx={{
            fontSize: "20px",
            fontWeight: Fonts.BOLD,
            mb: 2,
            lineHeight: "26.4px"
          }}
        >
          {data.title}
          <Box
            component="span"
            sx={{
              width:"67px",
              height:"24px",
              fontSize:"12px",
              color: "#C9B02D", 
              background:"#F9F3D6",
              fontWeight: "normal", 
              padding:"0px 10px 2px 10px",
              borderRadius:"2px",
              marginLeft:"1rem",
            }}
          >
            {data.risk}
          </Box>

        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#000",

          }}
        >
          <Box component="p" sx={{ fontSize: "16px", lineHeight: "24px", fontWeight: "400" }}>{data.author}</Box>
          {/* <Box
          sx={{
            ml: 3,
            display: "flex",
            alignItems: "center",
            "& .MuiSvgIcon-root": {
              fontSize: 16,
            },
          }}
        >
          <VisibilityIcon />
          <Box
            component="p"
            sx={{
              ml: 2,
            }}
          >
            {data.views} views
          </Box>
        </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default CourseItem;
