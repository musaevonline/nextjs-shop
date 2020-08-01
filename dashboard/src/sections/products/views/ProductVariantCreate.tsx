import NotFoundPage from "@temp/components/NotFound";
import { WindowTitle } from "@temp/components/WindowTitle";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import { commonMessages } from "@temp/intl";
import React from "react";
import { useIntl } from "react-intl";

import { decimal } from "@temp/misc";
import ProductVariantCreatePage, {
  ProductVariantCreatePageSubmitData
} from "../components/ProductVariantCreatePage";
import { TypedVariantCreateMutation } from "../mutations";
import { TypedProductVariantCreateQuery } from "../queries";
import { VariantCreate } from "../types/VariantCreate";
import { productUrl, productVariantEditUrl } from "../urls";

interface ProductVariantCreateProps {
  productId: string;
}

export const ProductVariant: React.FC<ProductVariantCreateProps> = ({
  productId
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  return (
    <TypedProductVariantCreateQuery displayLoader variables={{ id: productId }}>
      {({ data, loading: productLoading }) => {
        const product = data?.product;

        if (product === null) {
          return <NotFoundPage />;
        }

        const handleCreateSuccess = (data: VariantCreate) => {
          if (data.productVariantCreate.errors.length === 0) {
            notify({
              text: intl.formatMessage(commonMessages.savedChanges)
            });
            navigate(
              productVariantEditUrl(
                productId,
                data.productVariantCreate.productVariant.id
              )
            );
          }
        };

        return (
          <TypedVariantCreateMutation onCompleted={handleCreateSuccess}>
            {(variantCreate, variantCreateResult) => {
              const handleBack = () => navigate(productUrl(productId));
              const handleSubmit = (
                formData: ProductVariantCreatePageSubmitData
              ) =>
                variantCreate({
                  variables: {
                    input: {
                      attributes: formData.attributes
                        .filter(attribute => attribute.value !== "")
                        .map(attribute => ({
                          id: attribute.id,
                          values: [attribute.value]
                        })),
                      costPrice: decimal(formData.costPrice),
                      priceOverride: decimal(formData.priceOverride),
                      product: productId,
                      sku: formData.sku,
                      stocks: formData.stocks.map(stock => ({
                        quantity: parseInt(stock.value, 0)
                      }))
                    }
                  }
                });
              const handleVariantClick = (id: string) =>
                navigate(productVariantEditUrl(productId, id));

              const disableForm = productLoading || variantCreateResult.loading;

              return (
                <>
                  <WindowTitle
                    title={intl.formatMessage({ id: "create_variant",
                      defaultMessage: "Create variant",
                      description: "window title"
                    })}
                  />
                  <ProductVariantCreatePage
                    currencySymbol={"BYN"}
                    disabled={disableForm}
                    errors={
                      variantCreateResult.data?.productVariantCreate.errors ||
                      []
                    }
                    header={intl.formatMessage({ id: 'create_variant',
                      defaultMessage: "Create Variant",
                      description: "header"
                    })}
                    product={data?.product}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    onVariantClick={handleVariantClick}
                    saveButtonBarState={variantCreateResult.status}
                  />
                </>
              );
            }}
          </TypedVariantCreateMutation>
        );
      }}
    </TypedProductVariantCreateQuery>
  );
};
export default ProductVariant;
