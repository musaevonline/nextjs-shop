import "./scss/index.scss";

import React from "react";
import NukaCarousel, {CarouselProps} from "nuka-carousel";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from "@material-ui/core/IconButton";
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
}))

const HomeCarousel:React.FC<{
  images: ShopInfo_shop_images[] | null
}> = ({images}) =>{
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const settings: CarouselProps = {
    className: "carousel",
    renderBottomCenterControls: () => null,
    renderCenterLeftControls: ({ previousSlide, currentSlide }) =>
        currentSlide !== 0 ? (
            <div
                onClick={previousSlide}
                className="carousel__control carousel__control--left"
            >
              <IconButton><ChevronLeftIcon/></IconButton>
            </div>
        ) : null,
    renderCenterRightControls: ({
                                  nextSlide,
                                  currentSlide,
                                  slideCount,
                                  slidesToShow,
                                }) =>
        slideCount - slidesToShow !== currentSlide ? (
            <div
                onClick={nextSlide}
                className="carousel__control carousel__control--right"
            >
              <IconButton><ChevronRightIcon/></IconButton>
            </div>
        ) : null,
    disableEdgeSwiping: images?.length < 2
  };

  return(
      <div className="home-carousel">
        {!images &&
        <Skeleton variant="rect" height={sm ? 400 : 600}/>
        }
        {images &&
        <NukaCarousel {...settings}>
          {images.map((img, i) =>

              <div key={i}
                   className="flex justify-center"
                  // style={{
                  // backgroundImage: `url(${sm ? img.mobileUrl : img.largeUrl})`,
                  // backgroundPosition: 'center',
                  // backgroundSize: 'contain',
                  // backgroundRepeat: 'no-repeat',
                  // height: sm ? 400 : 600,
                  // }}
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
        </NukaCarousel>
        }
      </div>
  );
};

export default HomeCarousel;