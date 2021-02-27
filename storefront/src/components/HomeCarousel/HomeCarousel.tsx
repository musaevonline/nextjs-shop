import "./scss/index.scss";

import React from "react";
import {ShopInfo_shop_images} from "@sdk/queries/types/ShopInfo";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Thumbs, Navigation, Lazy, Pagination } from 'swiper';

SwiperCore.use([Thumbs, Navigation, Lazy, Pagination]);

const useStyles = makeStyles(theme => ({
  imgDescription: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: "2.5% 5%",
    borderRadius: 5,
    color: "#fff"
  }
}));

const HomeCarousel:React.FC<{
  images: ShopInfo_shop_images[] | null
}> = ({images}) =>{
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return(
      <div className="home-carousel">
        {!images &&
        <Skeleton variant="rect" height={sm ? 400 : 500}/>
        }
        {images &&
        <Swiper spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination
        >
          {images.map((img, i) => {
            return(
                <SwiperSlide key={i}>
                  <div key={i}
                       className="flex justify-center w-full"
                  >
                    <img key={i} src={sm ? img.mobileUrl : img.largeUrl} alt={img.alt} className="max-w-full max-h-500 object-cover w-full"/>
                    {img.description &&
                    <div className="flex flex-column items-center justify-center h-full absolute"
                         style={{paddingTop: "10%"}}>
                      <div dangerouslySetInnerHTML={{__html: img.description}}
                           className={classes.imgDescription}/>
                    </div>
                    }
                  </div>
                </SwiperSlide>
            )
          })}
        </Swiper>
        }
      </div>
  );
};

export default HomeCarousel;