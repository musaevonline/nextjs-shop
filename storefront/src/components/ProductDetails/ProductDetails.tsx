import "./scss/index.scss";

import React from "react";
import _ from 'lodash';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {priceToString, showPriceRange} from "@temp/core/utils";
import {ProductVariantForm} from "@temp/components/Forms/ProductVariantForm";
import {TFormProductVariantData} from "@temp/components/Forms/ProductVariantForm/ProductVariantForm";
import {ProductVariant} from "@sdk/fragments/types/ProductVariant";
import {ProductWithVariants} from "@sdk/fragments/types/ProductWithVariants";
import {Typography} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Link as ScrollLink } from 'react-scroll';
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {green, grey, red} from "@material-ui/core/colors";
import {NumberParam, useQueryParams} from "use-query-params";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 400,
        // padding: "0 20px 20px 20px"
    },
    reviewsCount: {
        color: grey[600],
        fontSize: "1.4rem",
        lineHeight: "1.6rem",
        paddingLeft: 5
    },
    stockStatus: {
        lineHeight: "3rem",
        "&[data-status='in'] svg":  {
            color: green[500],
            marginRight: 20
        },
        "& svg": {
            color: red[600],
            marginRight: 20
        }
    }
}));

interface ProductDetailsProps {
    product: ProductWithVariants,
    addVariantToCheckoutSubmit(values: TFormProductVariantData): void,
    selectedVariant: ProductVariant | null,
    setSelectedVariant(variant: ProductVariant): void,
    selectedQuantity: number,
    setSelectedQuantity(quantity: number),
    checkoutVariantQuantity: (selectedVariantId:string) => number
}

const ProductDetails:React.FC<ProductDetailsProps> = ({product, addVariantToCheckoutSubmit,
                                                          selectedVariant, setSelectedVariant,
                                                          selectedQuantity, setSelectedQuantity, checkoutVariantQuantity
                                                      }) =>{
    const classes = useStyles();
    const inStock = product.stockStatus === 'in';
    const selectedVariantStockQuantity = selectedVariant ? _.sumBy(selectedVariant.stocks, stock => stock.stockQuantity) : 0;
    const stockStatus = selectedVariant ? selectedVariantStockQuantity > 0 ? 'in' : 'out' : product.stockStatus;
    const [query, setQuery] = useQueryParams({tab: NumberParam});

    const onSelectReviewsTab = e => {
        setQuery({...query, tab: 2})
    }

    return(
        <div className={classNames(classes.root, "flex flex-col")}>
            <div className="flex-1 mb-10">
                <div>
                    <Typography variant="h2" className={"break-words"} gutterBottom>{product.name}</Typography>
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="flex items-center flex-1 min-w-200">
                            <Rating
                                size="small"
                                readOnly
                                name="simple-controlled"
                                defaultValue={product.rating.ratingAvg}
                            />
                            <ScrollLink href="#reviews"
                                        activeClass="active"
                                        to="reviews"
                                        smooth="easeInOutCubic"
                                        spy={true}
                                        duration={1000}
                                        onClick={onSelectReviewsTab}
                                        offset={-100}

                            >
                                <span className={classes.reviewsCount}>Отзывы ({product.rating.count})</span>
                            </ScrollLink>
                        </div>
                        <div className={classNames(classes.stockStatus, 'flex items-center py-5')} data-status={stockStatus}>
                            {!selectedVariant &&
                            <>
                                {inStock ? <CheckCircleOutlineIcon/> : <LocalShippingIcon/>}
                                <span>{inStock ? 'В наличии' : 'Нет в наличии'}</span>
                            </>
                            }
                            {selectedVariant &&
                            <>
                                {selectedVariantStockQuantity > 0 ? <CheckCircleOutlineIcon/> : <LocalShippingIcon/>}
                                <span>{selectedVariantStockQuantity > 0 ? 'В наличии' : 'Нет в наличии'}</span>
                            </>
                            }
                        </div>
                    </div>
                </div>

                <div className="product-details__price font-medium">
                    {!selectedVariant && <Typography variant="h3">{showPriceRange(product.priceRange)}({product.unit})</Typography>}
                    {selectedVariant &&
                    <Typography variant="h3">
                        {priceToString({...selectedVariant.price,
                            amount: Math.abs(selectedVariant.price.amount * selectedQuantity)
                        })} ({product.unit})
                    </Typography>
                    }
                </div>
            </div>
            <ProductVariantForm product={product}
                                addVariantToCheckoutSubmit={addVariantToCheckoutSubmit}
                                setSelectedVariant={setSelectedVariant}
                                setSelectedQuantity={setSelectedQuantity}
                                selectedVariant={selectedVariant}
                                checkoutVariantQuantity={checkoutVariantQuantity}
            />
        </div>
    );
};

export default ProductDetails;