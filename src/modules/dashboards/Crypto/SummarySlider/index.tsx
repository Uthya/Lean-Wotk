import Slider from "react-slick";
import CourseItem from "./SummaryItem";
import CourseSlider from "./SummarySlider";
import AppSummaryCard from "@crema/components/AppSummaryCard";
// import IntlMessages from "@crema/helpers/IntlMessages";
// import { Grid } from "@mui/material";
import { SummaryDetails } from "@crema/types/models/summary";

type Props = {
  relatedCourses: SummaryDetails[];
};
const SummaryCards = ({ relatedCourses }: Props) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <AppSummaryCard
      sxStyle={{ height: 1 }}
      title={"Exec Summary"}
    >
      <CourseSlider>
      {/* <Grid item xs={4} md={6}> */}
        <Slider className="slideRoot" {...settings}>
          {relatedCourses.map((data, index) => (
             
              <CourseItem key={index} data={data} />
           
          ))}
        </Slider>
        {/* </Grid> */}
      </CourseSlider>
    </AppSummaryCard>
  );
};

export default SummaryCards;
