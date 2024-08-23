import Slider from "react-slick";
import AppSummaryCard from "@crema/components/AppSummaryCard";
import { SummaryDetails } from "@crema/types/models/summary";
import SummarySlider from "./SummarySlider";
import SummaryItem from "./SummaryItem";

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
      <SummarySlider>
      {/* <Grid item xs={4} md={6}> */}
        <Slider className="slideRoot" {...settings}>
          {relatedCourses.map((data, index) => (            
              <SummaryItem key={index} data={data} /> 
          ))}
        </Slider>
        {/* </Grid> */}
      </SummarySlider>
    </AppSummaryCard>
  );
};

export default SummaryCards;
