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
    const inStock = product.stockStatus === 'in';
    const selectedVariantStockQuantity = selectedVariant ? _.sumBy(selectedVariant.stocks, stock => stock.stockQuantity) : 0;
    const stockStatus = selectedVariant ? selectedVariantStockQuantity > 0 ? 'in' : 'out' : product.stockStatus;

    return(
        <div className="product-details flex flex-col">
            <div className="product-details__top-block flex-1 mb-10">
                <div className="product-details__stock" data-status={stockStatus}>
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
                <div className="product-details__price font-medium">
                    {!selectedVariant && <Typography variant="h4">{showPriceRange(product.priceRange)}({product.unit})</Typography>}
                    {selectedVariant &&
                    <Typography variant="h4">
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