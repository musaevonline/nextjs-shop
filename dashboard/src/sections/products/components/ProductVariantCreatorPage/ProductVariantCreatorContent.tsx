import { ProductDetails_product_productType_variantAttributes } from "@temp/sections/products/types/ProductDetails";
import { ProductVariantBulkCreate_productVariantBulkCreate_errors } from "@temp/sections/products/types/ProductVariantBulkCreate";
import { isSelected } from "@temp/utils/lists";
import React from "react";

import { ProductVariantCreateFormData } from "./form";
import ProductVariantCreatePriceAndSku from "./ProductVariantCreatorPriceAndSku";
import ProductVariantCreateSummary from "./ProductVariantCreatorSummary";
import ProductVariantCreateValues from "./ProductVariantCreatorValues";
import {
  ProductVariantCreateReducerAction,
  ProductVariantCreateReducerActionType
} from "./reducer";
import { ProductVariantCreatorStep } from "./types";

export interface ProductVariantCreatorContentProps {
  attributes: ProductDetails_product_productType_variantAttributes[];
  currencySymbol: string;
  data: ProductVariantCreateFormData;
  dispatchFormDataAction: React.Dispatch<ProductVariantCreateReducerAction>;
  errors: ProductVariantBulkCreate_productVariantBulkCreate_errors[];
  step: ProductVariantCreatorStep;
}

const ProductVariantCreatorContent: React.FC<ProductVariantCreatorContentProps> = ({
  attributes,
  currencySymbol,
  data,
  dispatchFormDataAction,
  errors,
  step
}) => {
  const selectedAttributes = attributes.filter(attribute =>
    isSelected(
      attribute.id,
      data.attributes.map(dataAttribute => dataAttribute.id),
      (a, b) => a === b
    )
  );

  return (
    <>
      {step === ProductVariantCreatorStep.values && (
        <ProductVariantCreateValues
          attributes={selectedAttributes}
          data={data}
          onValueClick={(attributeId, valueId) =>
            dispatchFormDataAction({
              selectValue: {
                attributeId,
                valueId
              },
              type: ProductVariantCreateReducerActionType.selectValue
            })
          }
        />
      )}
      {step === ProductVariantCreatorStep.prices && (
        <ProductVariantCreatePriceAndSku
          attributes={selectedAttributes}
          currencySymbol={currencySymbol}
          data={data}
          onApplyToAllChange={(mode, type) =>
            dispatchFormDataAction({
              applyPriceOrStockToAll: {
                mode
              },
              type:
                type === "price"
                  ? ProductVariantCreateReducerActionType.applyPriceToAll
                  : ProductVariantCreateReducerActionType.applyStockToAll
            })
          }
          onApplyToAllPriceChange={price =>
            dispatchFormDataAction({
              changeApplyPriceToAllValue: {
                price
              },
              type:
                ProductVariantCreateReducerActionType.changeApplyPriceToAllValue
            })
          }
          onApplyToAllStockChange={(quantity, stockIndex) =>
            dispatchFormDataAction({
              changeApplyStockToAllValue: {
                quantity,
                stockIndex
              },
              type:
                ProductVariantCreateReducerActionType.changeApplyStockToAllValue
            })
          }
          onAttributeSelect={(attributeId, type) =>
            dispatchFormDataAction({
              changeApplyPriceOrStockToAttributeId: {
                attributeId
              },
              type:
                type === "price"
                  ? ProductVariantCreateReducerActionType.changeApplyPriceToAttributeId
                  : ProductVariantCreateReducerActionType.changeApplyStockToAttributeId
            })
          }
          onAttributePriceChange={(valueId, price) =>
            dispatchFormDataAction({
              changeAttributeValuePrice: {
                price,
                valueId
              },
              type:
                ProductVariantCreateReducerActionType.changeAttributeValuePrice
            })
          }
          onAttributeStockChange={(valueId, quantity, warehouseIndex) =>
            dispatchFormDataAction({
              changeAttributeValueStock: {
                quantity,
                valueId,
                warehouseIndex
              },
              type:
                ProductVariantCreateReducerActionType.changeAttributeValueStock
            })
          }
        />
      )}
      {step === ProductVariantCreatorStep.summary && (
        <ProductVariantCreateSummary
          attributes={selectedAttributes}
          currencySymbol={currencySymbol}
          data={data}
          errors={errors}
          onVariantDataChange={(variantIndex, field, value) =>
            dispatchFormDataAction({
              changeVariantData: {
                field,
                value,
                variantIndex
              },
              type: ProductVariantCreateReducerActionType.changeVariantData
            })
          }
          onVariantStockDataChange={(variantIndex, stock, value) =>
            dispatchFormDataAction({
              changeVariantStockData: {
                stock: {
                  quantity: parseInt(value, 10)
                },
                variantIndex
              },
              type: ProductVariantCreateReducerActionType.changeVariantStockData
            })
          }
          onVariantDelete={variantIndex =>
            dispatchFormDataAction({
              deleteVariant: {
                variantIndex
              },
              type: ProductVariantCreateReducerActionType.deleteVariant
            })
          }
        />
      )}
    </>
  );
};

ProductVariantCreatorContent.displayName = "ProductVariantCreatorContent";
export default ProductVariantCreatorContent;
