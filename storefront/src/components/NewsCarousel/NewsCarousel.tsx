import "./scss/index.scss";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import Carousel from "react-multi-carousel";
import {NewsCard} from "@temp/components/NewsCard";
import {INews} from "@temp/components/NewsCard/NewsCard";

const NewsCarousel:React.FC<{
    news: INews[]
}> = ({news}) =>{
    // let isMobile = false;
    // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //     isMobile = true;
    // }
    if (!news.length) return null;
    const responsive = {
        large:{
            breakpoint: { max: 3000, min: 1400 },
            items: 5,
            slidesToSlide: 5
        },
        desktop: {
            breakpoint: { max: 1400, min: 1024 },
            items: 4,
            slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    return(
        <div>
            <Carousel swipeable
                      draggable={false}
                      responsive={responsive}
                      keyBoardControl
                      customTransition="transform 300ms ease-in-out"
                      transitionDuration={500}
                      containerClass="carousel-container news-carousel"
                      removeArrowOnDeviceType={["tablet", "mobile"]}>
                {news.map((node, i) => <NewsCard key={i} news={node}/>)}

            </Carousel>
        </div>
    );
};

export default NewsCarousel;