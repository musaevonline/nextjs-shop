import CardSpacer from "@temp/components/CardSpacer";
import { ProductDetails_product_productType_variantAttributes } from "@temp/sections/products/types/ProductDetails";
import React from "react";

import {
  ProductVariantCreateFormData,
  VariantCreatorPricesAndSkuMode
} from "./form";
import ProductVariantCreatorPrices from "./ProductVariantCreatorPrices";
import ProductVariantCreatorStock from "./ProductVariantCreatorStock";

export type PriceOrStock = "price" | "stock";
export interface ProductVariantCreatorPriceAndSkuProps {
  attributes: ProductDetails_product_productType_variantAttributes[];
  currencySymbol: string;
  data: ProductVariantCreateFormData;
  onApplyToAllChange: (
    value: VariantCreatorPricesAndSkuMode,
    type: PriceOrStock
  ) => void;
  onApplyToAllPriceChange: (value: string) => void;
  onApplyToAllStockChange: (quantity: number, stockIndex: number) => void;
  onAttributeSelect: (id: string, type: PriceOrStock) => void;
  onAttributePriceChange: (id: string, value: string) => void;
  onAttributeStockChange: (
    id: string,
    quantity: number,
    warehouseIndex: number
  ) => void;
}

const ProductVariantCreatorPriceAndSku: React.FC<ProductVariantCreatorPriceAndSkuProps> = ({
  attributes,
  currencySymbol,
  data,
  onApplyToAllChange,
  onApplyToAllPriceChange,
  onApplyToAllStockChange,
  onAttributeSelect,
  onAttributePriceChange,
  onAttributeStockChange
}) => (
  <>
    <ProductVariantCreatorPrices
      attributes={attributes}
      currencySymbol={currencySymbol}
      data={data}
      onApplyToAllChange={value => onApplyToAllChange(value, "price")}
      onApplyToAllPriceChange={onApplyToAllPriceChange}
      onAttributeSelect={id => onAttributeSelect(id, "price")}
      onAttributeValueChange={onAttributePriceChange}
    />
    <CardSpacer />
    <ProductVariantCreatorStock
      attributes={attributes}
      data={data}
      onApplyToAllChange={value => onApplyToAllChange(value, "stock")}
      onApplyToAllStockChange={onApplyToAllStockChange}
      onAttributeSelect={id => onAttributeSelect(id, "stock")}
      onAttributeValueChange={onAttributeStockChange}
    />
  </>
);

ProductVariantCreatorPriceAndSku.displayName =
  "ProductVariantCreatorPriceAndSku";
export default ProductVariantCreatorPriceAndSku;
