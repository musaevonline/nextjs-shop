import "./scss/index.scss";

import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NukaCarousel from "nuka-carousel";
import {useMediaQuery} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import ImgsViewer from "react-images-viewer";
// import {LazyLoadImage} from "react-lazy-load-image-component";
// import {Skeleton} from "@material-ui/lab";
import PlaceHolder from 'images/placeholder540x540.png';
const SMALL_SCREEN = 540;

type TImage = {
    url: string,
    alt?: string | null
}

type ProductCarouselProps = {
    images: TImage[]
}


const ProductCarousel:React.FC<ProductCarouselProps> = ({images}) =>{
    const matchSmallScreen = useMediaQuery(`(max-width: ${SMALL_SCREEN}px)`);
    const [currImg, setCurrImg] = useState(0);
    const [isOpenViewer, setIsOpenViewer] = useState(false);

    const onOpenViewer = (e, index)=>{
        e.preventDefault();
        setCurrImg(index);
        setIsOpenViewer(true);
    };
    const viewerImages = images.map(img => ({
        src: img.url,
        alt: img.alt
    }));

    const settings = {
        className: "carousel",
        renderTopLeftControls: data => carouselTopLeftControls(data, images),
        renderBottomCenterControls: () => null,
        renderCenterLeftControls: ({ previousSlide, currentSlide }) =>
            currentSlide !== 0 && matchSmallScreen ? (
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
            slideCount - slidesToShow !== currentSlide && matchSmallScreen ? (
                <div
                    onClick={nextSlide}
                    className="carousel__control carousel__control--right"
                >
                    <IconButton><ChevronRightIcon  /></IconButton>
                </div>
            ) : null
    };
    return(
        <div className="product-carousel">
            <NukaCarousel vertical={!matchSmallScreen}
                          transitionMode="scroll"
                          {...settings}>
                {images.map((img, i) => {
                    // if (i === 0){
                        return (
                            <img key={i} src={img.url} className="min-h-400" onClick={e => {onOpenViewer(e, i)}} alt={img.alt}/>
                        );
                    // }
                    // return(
                    //     <LazyLoadImage alt={img.alt}
                    //                    key={i}
                    //                    placeholder={<Skeleton animation="wave" variant="rect" height={500}/>}
                    //                    effect="opacity"
                    //                    onClick={e => {onOpenViewer(e, i)}}
                    //                    src={img.url}
                    //     />
                    // );
                })}
                {!images.length && <img src={PlaceHolder} className="min-h-400" alt="Продукт"/>}
            </NukaCarousel>
            <Hidden xsDown>
                {images.length > 0 &&
                <ImgsViewer closeBtnTitle="Close"
                            imgs={viewerImages}
                            currImg={currImg}
                            isOpen={isOpenViewer}
                            onClickPrev={() => {setCurrImg(prev => prev-1)}}
                            onClickNext={() =>{setCurrImg(prev => prev+1)}}
                            onClose={()=>{setIsOpenViewer(false)}}
                            onClickThumbnail={index =>{ setCurrImg(index)}}
                            backdropCloseable={true}
                            width={2000}
                            showThumbnails={true}
                            rightArrowTitle="Next"
                            leftArrowTitle="Prev"
                />
                }
            </Hidden>
        </div>
    );
};

export default ProductCarousel;

const carouselTopLeftControls = ({currentSlide, goToSlide}, images) =>{
    return (
        <div className="carousel__thumbs">
            {images.map((img, i) => <div key={i} className={`carousel__thumb ${i === currentSlide ? 'carousel__thumb--active' : ''}`}>
                <img src={img.url} alt={img.alt} onClick={e =>goToSlide(i)}/>
            </div>)}
        </div>
    );
};