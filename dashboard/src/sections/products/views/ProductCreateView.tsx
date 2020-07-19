import { WindowTitle } from "@temp/components/WindowTitle";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@temp/config";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import useCategorySearch from "@temp/searches/useCategorySearch";
import useProductTypeSearch from "@temp/searches/useProductTypeSearch";
import React from "react";
import { useIntl } from "react-intl";

import { decimal, maybe } from "@temp/misc";
import ProductCreatePage, {
  ProductCreatePageSubmitData
} from "../components/ProductCreatePage";
import { TypedProductCreateMutation } from "../mutations";
import { ProductCreate } from "../types/ProductCreate";
import { productListUrl, productUrl } from "../urls";

export const ProductCreateView: React.FC = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts
  } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });

  const {
    loadMore: loadMoreProductTypes,
    search: searchProductTypes,
    result: searchProductTypesOpts
  } = useProductTypeSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });


  const handleBack = () => navigate(productListUrl());

  const handleSuccess = (data: ProductCreate) => {
    if (data.productCreate.errors.length === 0) {
      notify({
        text: intl.formatMessage({ id: 'product_created',
          defaultMessage: "Product created"
        })
      });
      navigate(productUrl(data.productCreate.product.id));
    }
  };

  return (
    <TypedProductCreateMutation onCompleted={handleSuccess}>
      {(productCreate, productCreateOpts) => {
        const handleSubmit = (formData: ProductCreatePageSubmitData) => {
          productCreate({
            variables: {
              attributes: formData.attributes.map(attribute => ({
                id: attribute.id,
                values: attribute.value
              })),
              basePrice: decimal(formData.basePrice),
              category: formData.category,
              description: formData.description,
              isPublished: formData.isPublished,
              name: formData.name,
              productType: formData.productType,
              publicationDate:
                formData.publicationDate !== ""
                  ? formData.publicationDate
                  : null,
              sku: formData.sku,
              stocks: formData.stocks.map(stock => ({
                quantity: parseInt(stock.value, 0),
                warehouse: stock.id
              })),
            }
          });
        };

        return (
          <>
            <WindowTitle
              title={intl.formatMessage({ id: 'create_product',
                defaultMessage: "Create Product",
                description: "window title"
              })}
            />
            <ProductCreatePage
              currency={'USD'}
              categories={maybe(
                () => searchCategoryOpts.data.search.edges,
                []
              ).map(edge => edge.node)}
              disabled={productCreateOpts.loading}
              errors={productCreateOpts.data?.productCreate.errors || []}
              fetchCategories={searchCategory}
              fetchProductTypes={searchProductTypes}
              header={intl.formatMessage({ id: 'new_product',
                defaultMessage: "New Product",
                description: "page header"
              })}
              productTypes={maybe(() =>
                searchProductTypesOpts.data.search.edges.map(edge => edge.node)
              )}
              onBack={handleBack}
              onSubmit={handleSubmit}
              saveButtonBarState={productCreateOpts.status}
              fetchMoreCategories={{
                hasMore: maybe(
                  () => searchCategoryOpts.data.search.pageInfo.hasNextPage
                ),
                loading: searchCategoryOpts.loading,
                onFetchMore: loadMoreCategories
              }}
              fetchMoreProductTypes={{
                hasMore: maybe(
                  () => searchProductTypesOpts.data.search.pageInfo.hasNextPage
                ),
                loading: searchProductTypesOpts.loading,
                onFetchMore: loadMoreProductTypes
              }}
            />
          </>
        );
      }}
    </TypedProductCreateMutation>
  );
};
export default ProductCreateView;
