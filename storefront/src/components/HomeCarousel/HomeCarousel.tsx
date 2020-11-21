import "./scss/index.scss";

import React from "react";
import Carousel from "react-multi-carousel";
import {ShopInfo_shop_images} from "@sdk/queries/types/ShopInfo";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  imgDescription: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: "2.5% 5%",
    borderRadius: 5,
    color: "#fff"
  }
}));
const responsive = {
  desktop: {
    breakpoint: { max: 5000, min: 500 },
    items: 1,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const HomeCarousel:React.FC<{
  images: ShopInfo_shop_images[] | null
}> = ({images}) =>{
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return(
      <div className="home-carousel">
        {!images &&
        <Skeleton variant="rect" height={sm ? 400 : 600}/>
        }
        {images &&
        <Carousel swipeable
                  draggable={false}
                  responsive={responsive}
                  keyBoardControl
                  customTransition="transform 300ms ease-in-out"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}>
          {images.map((img, i) =>

              <div key={i}
                   className="flex justify-center"
              >
                <img key={i} src={sm ? img.mobileUrl : img.largeUrl} alt="homeimg" className="max-w-full"/>
                {img.description &&
                <div className="flex flex-column items-center justify-center h-full absolute"
                     style={{paddingTop: "10%"}}>
                  <div dangerouslySetInnerHTML={{__html: img.description}}
                       className={classes.imgDescription}/>
                </div>
                }
              </div>
          )}
        </Carousel>
        }
      </div>
  );
};

export default HomeCarousel;