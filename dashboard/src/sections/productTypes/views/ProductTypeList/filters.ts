import { IFilterElement } from "@temp/components/Filter";
import { findValueInEnum, maybe } from "@temp/misc";
import {
  ProductTypeFilterKeys,
  ProductTypeListFilterOpts
} from "@temp/sections/productTypes/components/ProductTypeListPage";
import {
  ProductTypeEnum,
  ProductTypeFilterInput
} from "@temp/types/globalTypes";

import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleValueQueryParam
} from "@temp/utils/filters";
import {
  ProductTypeListUrlFilters,
  ProductTypeListUrlFiltersEnum,
  ProductTypeListUrlQueryParams
} from "../../urls";
import {ProductTypeConfigurable} from "@temp/types";

export const PRODUCT_TYPE_FILTERS_KEY = "productTypeFilters";

export function getFilterOpts(
  params: ProductTypeListUrlFilters
): ProductTypeListFilterOpts {
  return {
    configurable: {
      active: !!maybe(() => params.configurable),
      value: maybe(() =>
        findValueInEnum(params.configurable, ProductTypeConfigurable)
      )
    },
    type: {
      active: !!maybe(() => params.type),
      value: maybe(() => findValueInEnum(params.type, ProductTypeEnum))
    }
  };
}

export function getFilterVariables(
  params: ProductTypeListUrlFilters
): ProductTypeFilterInput {
  return {
    productType: params.type
      ? findValueInEnum(params.type, ProductTypeEnum)
      : undefined,
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<ProductTypeFilterKeys>
): ProductTypeListUrlFilters {
  const { name } = filter;

  switch (name) {
    case ProductTypeFilterKeys.configurable:
      return getSingleValueQueryParam(
        filter,
        ProductTypeListUrlFiltersEnum.configurable
      );

    case ProductTypeFilterKeys.type:
      return getSingleValueQueryParam(
        filter,
        ProductTypeListUrlFiltersEnum.type
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<ProductTypeListUrlFilters>(PRODUCT_TYPE_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  ProductTypeListUrlQueryParams,
  ProductTypeListUrlFilters
>(ProductTypeListUrlFiltersEnum);
