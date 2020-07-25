import { ProductDetails_product_productType_variantAttributes } from "@temp/sections/products/types/ProductDetails";

import { ProductVariantBulkCreateInput } from "@temp/types/globalTypes";

export interface AttributeValue<T> {
  slug: string;
  value: T;
}
export type VariantCreatorPricesAndSkuMode = "all" | "attribute" | "skip";
export interface AllOrAttribute<T> {
  mode: VariantCreatorPricesAndSkuMode;
  attribute: string;
  value: T;
  values: Array<AttributeValue<T>>;
}
export interface Attribute {
  id: string;
  values: string[];
}
export interface ProductVariantCreateFormData {
  attributes: Attribute[];
  price: AllOrAttribute<string>;
  stock: AllOrAttribute<number[]>;
  variants: ProductVariantBulkCreateInput[];
}

export const createInitialForm = (
  attributes: ProductDetails_product_productType_variantAttributes[],
  price: string
): ProductVariantCreateFormData => ({
  attributes: attributes.map(attribute => ({
    id: attribute.id,
    values: []
  })),
  price: {
    attribute: undefined,
    mode: "all",
    value: price || "",
    values: []
  },
  stock: {
    attribute: undefined,
    mode: "all",
    value: [],
    values: []
  },
  variants: []
});
