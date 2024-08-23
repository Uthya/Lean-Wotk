import Box from "@mui/material/Box";
type Props = {
  children: React.ReactNode;
};
const SummarySlider = ({ children }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        padding: "0px",
        "& .slideRoot": {
          paddingBottom: 0,
          mx: { sm: -3 },
          "& .slick-track": {
            marginLeft: 0,
            display: "flex",
          },
          "& .slick-prev, & .slick-next": {
            top: -25,
            border: 'none',
            cursor: 'pointer',
            display: 'block',
            height: '20px',
            lineHeight: 0,
            padding: 0,
            position: 'absolute',
            transform: 'translateY(-50%)',
            width: '20px',
            "&:before": {
              fontSize: "0px",
              color: "rgb(17 24 39 / 83%)",
            },
          },
          "& .slick-prev": {
            right: 44,
            left: "auto",
            backgroundImage: `url('/assets/images/left-arrow.svg')`,
            fontSize: "0px",
          },
          "& .slick-next": {
            right: 18,
            backgroundImage: `url('/assets/images/right-arrow.svg')`,
            fontSize: "0px",
          },
          "& .slick-disabled":{
            
          }
        },
      }}
    >
      {children}
    </Box>
  );
};

export default SummarySlider;