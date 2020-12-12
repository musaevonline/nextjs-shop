import "./scss/index.scss";

import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Thumbs, Navigation, Lazy } from 'swiper';
import {ProductDetails_product_images} from "@sdk/queries/types/ProductDetails";
import {ProductVariant_images} from "@sdk/fragments/types/ProductVariant";

SwiperCore.use([Thumbs, Navigation, Lazy]);

type ProductCarouselProps = {
  images: ProductDetails_product_images[] | ProductVariant_images[] | null
}

const ProductCarousel:React.FC<ProductCarouselProps> = ({images}) =>{
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  if (!images) return null;
  const galleryImages = images.map(img => ({
    original: img.url,
    thumbnail: img.url,
    originalAlt: img.alt,
    smallThumb: img.smallThumbnail,
    largeThumb: img.largeThumbnail,
    thumbnailClass: "gallery-thumb",
    originalClass : "gallery-img"
  }));

  return(
      <div className="product-carousel">
        <Swiper thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={0}
                slidesPerView={1}
                lazy={true}
                preloadImages={false}
                watchSlidesVisibility
            // navigation
        >
          {galleryImages.map((img, i) => {
            return(
                <SwiperSlide key={i}>
                  <img data-src={img.largeThumb} alt={img.originalAlt} className="swiper-lazy"/>
                  <div className="swiper-lazy-preloader"/>
                </SwiperSlide>
            )
          })}
        </Swiper>
        <Swiper
            watchSlidesVisibility
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={10}
            slidesPerGroup={5}
            draggable={false}
            touchRatio={0}
            breakpoints={{
              // when window width is >= 320px
              0: {
                slidesPerView: 5,
                slidesPerGroup: 5
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 10,
                slidesPerGroup: 5
              }
            }}
            freeMode
            navigation
        >
          {galleryImages.map((img, i) => {
            return(
                <SwiperSlide key={i} >
                  <img className="h-50" src={img.smallThumb} alt={img.originalAlt}/>
                </SwiperSlide>
            )
          })}

        </Swiper>


      </div>
  );
};

export default ProductCarousel;