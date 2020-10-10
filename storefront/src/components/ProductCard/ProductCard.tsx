import "./scss/index.scss";

import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import {Divider} from "@material-ui/core";
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import IconButton from "@material-ui/core/IconButton";
import {Product} from "@sdk/fragments/types/Product";
import {getProductUrl} from "@temp/app/routes";
import {showPriceRange} from "@temp/core/utils";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {FavoritesContext} from "@temp/components/FavoritesProvider/context";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import HeartIcon from "@temp/icons/HeartIcon";
import HeartIconFilled from "@temp/icons/HeartIconFilled";

const useStyles = makeStyles(theme => ({
    favoritesIcon: {
        top: 10,
        right: 10,
        transition: "transform .2s ease-in-out",
        "& svg":{
            fill: "#666",
            fontSize: "3rem"
        },
        "&[data-active=true] svg":{
            fill: "red"
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
    const { id, name, thumbnail, priceRange, stockStatus, slug } = item;
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
        <div className="product-card">
            <Link to={getProductUrl(slug, id)}>
                <div className="product-card__img">
                    {isNew && !isDiscount && <div className="label_new">Новинка</div>}
                    {isDiscount && <div className="label_discount">Скидка 15%</div>}
                    <img src={thumbnail.url}
                         alt={thumbnail.alt}/>
                </div>
                <div className="product-card__body">
                    <div className="product-card__title">
                        <Typography variant="body2" className="leading-tight">
                            {name}
                        </Typography>
                    </div>
                    <div className="product-card__rating mt-10 mb-10">
                        {item.rating.count > 0 &&
                        <Rating
                            size="small"
                            name="simple-controlled"
                            value={item.rating.ratingAvg}
                            readOnly
                        />
                        }
                        {!item.rating.count && <Typography variant="caption" color="textSecondary">Нет отзывов</Typography>}
                    </div>
                    <div className="product-card__price">
                        <Typography variant="body1" className="leading-tight">
                            {showPriceRange(priceRange)}
                        </Typography>
                    </div>
                    <div className="product-card__actions mt-10 mb-10">
                        <Button type="button"
                                color="primary"
                                variant="contained"
                                aria-label={'Купить'}
                                fullWidth>Купить</Button>
                    </div>
                    <Divider/>
                    <div className="product-card__additional-info mt-15">
                        <div className="product-card__available">
                            <Typography variant="caption" color="textSecondary">
                                {stockStatus === 'in' ? 'В наличии' : 'Со склада'}
                            </Typography>
                        </div>
                        <div className="product-card__comments">
                            <Badge badgeContent={item.rating.count} showZero>
                                <div className="p-px">
                                    <Tooltip title="Отзывы" enterDelay={1000}>
                                        <IconButton size="small" aria-label="Отзывы">
                                            <ModeCommentOutlinedIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Badge>
                        </div>
                    </div>
                </div>

            </Link>
            <div className={classNames("absolute cursor-pointer",
                classes.favoritesIcon)}
                 data-active={favorites.includes(id)}
                 onClick={toggleFavorites}>
                {favorites.includes(id) ? <HeartIconFilled viewBox="0 -28 512.00002 512"/> :
                    <HeartIcon viewBox="0 -28 512.001 512"/>
                }
            </div>

        </div>
    );
};

export default ProductCard;