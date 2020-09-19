import "./scss/index.scss";

import React from "react";
import NukaCarousel from "nuka-carousel";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from "@material-ui/core/IconButton";


const HomeCarousel:React.FC = () =>{

    const images = [
        {
            url: "https://stroy-lux.by/wp-content/uploads/2019/07/%D1%84%D0%BE%D0%BD1.jpg",
            alt: "Второй слайд"
        },
        {
            url: "https://avatars.mds.yandex.net/get-pdb/752643/361918da-d020-40a8-92fe-fe96ec14c9c3/s1200",
            alt: "Первый слайд"
        },

    ];

    const settings = {
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
            ) : null
    };

    return(
        <div className="home-carousel">
            <NukaCarousel {...settings}>
                {images.map((img, i) => <div key={i} style={{
                    backgroundImage: `url(${img.url})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: 600
                }} />)}
            </NukaCarousel>
        </div>
    );
};

export default HomeCarousel;