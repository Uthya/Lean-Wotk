import Box from "@mui/material/Box";

type Props = {
  children: React.ReactNode;
};
const CourseSlider = ({ children }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        padding:"0px",
        "& .slideRoot": {
          paddingBottom: 0,
          mx: { sm: -3 },
          "& .slick-prev, & .slick-next": {
            top: -25,        
            "&:before": {
              fontSize: "26px",
              color: (theme) => theme.palette.text.primary,        
            },
          },
          "& .slick-prev": {
            right: 44,
            left: "auto",
            fontSize:"30px",
          },
          "& .slick-next": {
            right: 18,
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default CourseSlider;
