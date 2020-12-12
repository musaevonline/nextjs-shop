import "./scss/index.scss";

import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import {Product} from "@sdk/fragments/types/Product";
import {getProductUrl} from "@temp/app/routes";
import {showPriceRange} from "@temp/core/utils";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {FavoritesContext} from "@temp/components/FavoritesProvider/context";
import Tooltip from "@material-ui/core/Tooltip";
import {BsHeart, BsHeartFill} from "react-icons/bs";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {SvgIcon} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    favoritesIcon: {
        display: "flex",
        marginLeft: 5,
        transition: "transform .2s ease-in-out",
        "& svg":{
            fill: "#666",
            fontSize: "2rem"
        },
        "&[data-active=true] svg":{
            fill: theme.palette.secondary.main
        },
        "&:hover":{
            transform: "scale(1.1)"
        }
    }
}));


interface ProductCardProps {
    item: Product,
    isNew?: false,
    isDiscount?: false
}

const ProductCard:React.FC<ProductCardProps> = ({item, isNew, isDiscount}) =>{
    const classes = useStyles();
    const {favorites, setFavorites} = useContext(FavoritesContext);
    const { id, name, thumbnail, priceRange, slug, pk } = item;
    const toggleFavorites = e => {
        e.preventDefault();
        if (favorites.includes(id)){
            const newData = favorites.filter(product => product !== id);
            setFavorites(newData);
        }else{
            setFavorites([...favorites, id]);
        }
    };
    return(
        <div className="product-layout">
            <div className="product-card">
                <div className="product-card__sku product-sku">
                    <span className="product-sku__title">Код товара: </span>
                    <span className="product-sku__value">{pk}</span>
                </div>
                <Link to={getProductUrl(slug, id)}>
                    <div className="product-card__pictures">
                        {isNew && !isDiscount && <div className="label_new">Новинка</div>}
                        {isDiscount && <div className="label_discount">Скидка 15%</div>}
                        <img src={thumbnail.url} alt={thumbnail.alt}/>
                    </div>
                </Link>
                <div className="product-card__body">
                    <Link className="product-card__title" to={getProductUrl(slug, id)}>
                        {name}
                    </Link>
                    <div className="product-card__price">
                        {showPriceRange(priceRange)}
                    </div>
                    <div className="product-card__rating flex items-center justify-between">
                        <div className="flex items-center">
                            {item.rating.count > 0 &&
                            <Rating
                                size="small"
                                name="simple-controlled"
                                value={item.rating.ratingAvg}
                                className="mr-5"
                                readOnly
                            />
                            }
                            <Tooltip title="Отзывы" enterDelay={1000}>
                                <SvgIcon fontSize="small" className="mr-5">
                                    <ModeCommentOutlinedIcon/>
                                </SvgIcon>
                            </Tooltip>
                            <Typography variant="caption" color="textSecondary">{!!item.rating.count ? item.rating.count : 'Нет отзывов'}</Typography>
                        </div>
                        <div className={classNames("cursor-pointer",
                            classes.favoritesIcon)}
                             data-active={favorites.includes(id)}
                             onClick={toggleFavorites}>
                            {favorites.includes(id) ? <BsHeartFill /> :
                                <BsHeart />
                            }
                        </div>
                    </div>

                    <div className="mt-10">
                        <Button type="button"
                                color="secondary"
                                variant="contained"
                                aria-label={'Купить'}
                                component={Link}
                                to={getProductUrl(slug, id)}
                                startIcon={<ShoppingCartOutlinedIcon/>}
                                fullWidth
                        >
                            <span className="normal-case">Купить</span>
                        </Button>
                    </div>
                    {/*<div className="product-card__additional-info mt-15">*/}
                    {/*    <div className="product-card__available">*/}
                    {/*        <Typography variant="caption" color="textSecondary">*/}
                    {/*            {stockStatus === 'in' ? 'В наличии' : 'Со склада'}*/}
                    {/*        </Typography>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                {/*<div className={classNames("absolute cursor-pointer",*/}
                {/*    classes.favoritesIcon)}*/}
                {/*     data-active={favorites.includes(id)}*/}
                {/*     onClick={toggleFavorites}>*/}
                {/*    {favorites.includes(id) ? <BsHeartFill /> :*/}
                {/*        <BsHeart />*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default ProductCard;