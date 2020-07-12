import {
  ProductListUrlQueryParams,
  ProductListUrlSortField
} from "@temp/sections/products/urls";
import { ProductOrder, ProductOrderField } from "@temp/types/globalTypes";
import { getOrderDirection } from "@temp/utils/sort";

export function getSortQueryField(
  sort: ProductListUrlSortField
): ProductOrderField {
  switch (sort) {
    case ProductListUrlSortField.name:
      return ProductOrderField.NAME;
    // case ProductListUrlSortField.price:
    //   return ProductOrderField.PRICE;
    case ProductListUrlSortField.productType:
      return ProductOrderField.TYPE;
    case ProductListUrlSortField.status:
      return ProductOrderField.PUBLISHED;
    default:
      return ProductOrderField.NAME;
  }
}

export function getSortQueryVariables(
  params: ProductListUrlQueryParams
): ProductOrder {
  if (params.sort === ProductListUrlSortField.attribute) {
    return {
      attributeId: params.attributeId,
      direction: getOrderDirection(params.asc)
    };
  }
  return {
    direction: getOrderDirection(params.asc),
    field: getSortQueryField(params.sort)
  };
}
