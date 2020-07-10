import "./scss/index.scss";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import Carousel from "react-multi-carousel";
import {NewsCard} from "@temp/components/NewsCard";

const NewsCarousel:React.FC = () =>{
    // let isMobile = false;
    // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //     isMobile = true;
    // }
    const responsive = {
        large:{
            breakpoint: { max: 3000, min: 1376 },
            items: 5,
            slidesToSlide: 5 // optional, default to 1.
        },
        desktop: {
            breakpoint: { max: 1376, min: 1024 },
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const dataNews1 = {
        id: 1,
        created: 'Дек 23, 2019',
        img: "http://fotomasterskie.ru/wp-content/uploads/2017/12/metallicheskaya_krovlya.jpg",
        title: "Устройство кровли и ее утепление",
        text: "Устройство кровли является завершающим этапом строительства дома.\n" +
            "                И именно от выбора кровельного материала будет зависеть прочность и надежность крыши.\n" +
            "                В настоящее время существует большой выбор материалов для кровли.",

    }
    const dataNews2 = {
        id: 2,
        created: 'Дек 15, 2019',
        img: 'http://traiv-komplekt.ru/images/articles/3171462.gif',
        title: 'Анкера для бетона',
        text: 'Бетонные панели или плиты-перекрытия часто выступают несущими элементами строения. Следовательно, крепёж, ' +
            'устанавливаемый в них, должен обладать высокой грузоподъёмностью, надёжностью и стойкостью к воздействию окружающей среды.'
    }

    return(
        <div>
            <Carousel swipeable
                      draggable={false}
                      responsive={responsive}
                      infinite
                      keyBoardControl
                      customTransition="transform 300ms ease-in-out"
                      transitionDuration={500}
                      containerClass="carousel-container news-carousel"
                      removeArrowOnDeviceType={["tablet", "mobile"]}>
                <NewsCard news={dataNews1}/>
                <NewsCard news={dataNews2}/>
                <NewsCard news={dataNews1}/>
                <NewsCard news={dataNews2}/>
                <NewsCard news={dataNews1}/>
                <NewsCard news={dataNews2}/>
                <NewsCard news={dataNews1}/>
                <NewsCard news={dataNews2}/>
            </Carousel>
        </div>
    );
};

export default NewsCarousel;