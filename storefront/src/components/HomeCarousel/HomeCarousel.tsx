import "./scss/index.scss";

import React from "react";
import NukaCarousel from "nuka-carousel";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from "@material-ui/core/IconButton";
import {ShopInfo_shop_images} from "@sdk/queries/types/ShopInfo";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

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
            {!images &&
            <Skeleton variant="rect" height={600}/>
            }
            {images &&
            <NukaCarousel {...settings}>
                {images.map((img, i) =>
                    <div key={i} style={{
                        backgroundImage: `url(${img.url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: 600
                    }}>
                        {img.description &&
                        <div className="flex flex-column items-center justify-center h-full"
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