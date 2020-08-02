import { WindowTitle } from "@temp/components/WindowTitle";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "@temp/misc";
import ProductTypeCreatePage, {
  ProductTypeForm
} from "../components/ProductTypeCreatePage";
import { TypedProductTypeCreateMutation } from "../mutations";
import { TypedProductTypeCreateDataQuery } from "../queries";
import { ProductTypeCreate as ProductTypeCreateMutation } from "../types/ProductTypeCreate";
import { productTypeListUrl, productTypeUrl } from "../urls";

export const ProductTypeCreate: React.FC = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleCreateSuccess = (updateData: ProductTypeCreateMutation) => {
    if (updateData.productTypeCreate.productErrors.length === 0) {
      notify({
        text: intl.formatMessage({id: 'successfully_created_product_type',
          defaultMessage: "Successfully created product type"
        })
      });
      navigate(productTypeUrl(updateData.productTypeCreate.productType.id));
    }
  };
  return (
    <TypedProductTypeCreateMutation onCompleted={handleCreateSuccess}>
      {(createProductType, createProductTypeOpts) => {
        const handleCreate = (formData: ProductTypeForm) =>
          createProductType({
            variables: {
              input: {
                hasVariants: false,
                isShippingRequired: formData.isShippingRequired,
                name: formData.name,
                weight: formData.weight
              }
            }
          });
        return (
          <TypedProductTypeCreateDataQuery displayLoader>
            {({ data, loading }) => (
              <>
                <WindowTitle
                  title={intl.formatMessage({
                    defaultMessage: "Create Product Type",
                    description: "window title",
                    id: "productTypeCreateHeader"
                  })}
                />
                <ProductTypeCreatePage
                  defaultWeightUnit={maybe(() => data.shop.defaultWeightUnit)}
                  disabled={loading}
                  errors={maybe(
                    () => createProductTypeOpts.data.productTypeCreate.productErrors,
                    []
                  )}
                  pageTitle={intl.formatMessage({
                    defaultMessage: "Create Product Type",
                    description: "header",
                    id: "productTypeCreatePageHeader"
                  })}
                  saveButtonBarState={createProductTypeOpts.status}
                  onBack={() => navigate(productTypeListUrl())}
                  onSubmit={handleCreate}
                />
              </>
            )}
          </TypedProductTypeCreateDataQuery>
        );
      }}
    </TypedProductTypeCreateMutation>
  );
};
export default ProductTypeCreate;
