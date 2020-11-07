import "./scss/index.scss";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import Carousel from "react-multi-carousel";
import {IArticleCard} from "@temp/components/ArticleCard/ArticleCard";
import {ArticleCard} from "@temp/components/ArticleCard";
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const NewsCarousel:React.FC<{
    news: IArticleCard[]
}> = ({news}) =>{
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
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
                      showDots={sm}
                      removeArrowOnDeviceType={["tablet", "mobile"]}>
                {news.map((node, i) => <ArticleCard key={i} article={node}/>)}

            </Carousel>
        </div>
    );
};

export default NewsCarousel;