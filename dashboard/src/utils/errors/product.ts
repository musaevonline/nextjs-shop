import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import {formMessages} from "@temp/intl";
import { BulkProductErrorFragment } from "@temp/sections/products/types/BulkProductErrorFragment";
import { ProductErrorCode } from "@temp/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  attributeAlreadyAssigned: {
    id: 'attribute_has_already_exist',
    defaultMessage:
      "This attribute has already been assigned to this product type"
  },
  attributeCannotBeAssigned: {
    id: 'attribute_cannot_be_assigned',
    defaultMessage: "This attribute cannot be assigned to this product type"
  },
  attributeVariantsDisabled: {
    id: 'attribute_variants_disabled',
    defaultMessage: "Variants are disabled in this product type"
  },
  skuUnique: {
    id: 'sku_unique',
    defaultMessage: "SKUs must be unique",
    description: "bulk variant create error"
  },
  variantNoDigitalContent: {
    id: 'variant_no_digital_content',
    defaultMessage: "This variant does not have any digital content"
  }
});

function getProductErrorMessage(
  err: Omit<ProductErrorFragment | BulkProductErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case ProductErrorCode.ATTRIBUTE_ALREADY_ASSIGNED:
        return intl.formatMessage(messages.attributeAlreadyAssigned);
      case ProductErrorCode.ATTRIBUTE_CANNOT_BE_ASSIGNED:
        return intl.formatMessage(messages.attributeCannotBeAssigned);
      case ProductErrorCode.ATTRIBUTE_VARIANTS_DISABLED:
        return intl.formatMessage(messages.attributeVariantsDisabled);
      case ProductErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case ProductErrorCode.REQUIRED:
        return intl.formatMessage(formMessages.requiredField);
      case ProductErrorCode.VARIANT_NO_DIGITAL_CONTENT:
        return intl.formatMessage(messages.variantNoDigitalContent);
      case ProductErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export function getBulkProductErrorMessage(
  err: BulkProductErrorFragment | undefined,
  intl: IntlShape
): string {
  if (err?.code === ProductErrorCode.UNIQUE && err.field === "sku") {
    return intl.formatMessage(messages.skuUnique);
  }
  return getProductErrorMessage(err, intl);
}

export default getProductErrorMessage;
