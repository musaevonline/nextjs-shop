import "./scss/index.scss";

import React from "react";
import ImageGallery from 'react-image-gallery';
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type TImage = {
    url: string,
    alt?: string | null
}

type ProductCarouselProps = {
    images: TImage[]
}

const ProductCarousel:React.FC<ProductCarouselProps> = ({images}) =>{
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const galleryImages = images.map(img => ({
        original: img.url,
        thumbnail: img.url,
        originalAlt: img.alt,
        thumbnailClass: "gallery-thumb",
        originalClass : "gallery-img"
    }));

    return(
        <div className="product-carousel">
            <ImageGallery items={galleryImages}
                          thumbnailPosition={xs ? "bottom" : "left"}
                          showPlayButton={false}
                          showBullets={xs}
                          showThumbnails={!xs}
                          slideInterval={1000}
                          swipeThreshold={10}
                          showFullscreenButton={false}
                          lazyLoad
            />
        </div>
    );
};

export default ProductCarousel;