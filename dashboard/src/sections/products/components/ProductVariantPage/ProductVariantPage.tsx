import AppHeader from "@temp/components/AppHeader";
import CardSpacer from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import useFormset, {
  FormsetChange,
  FormsetData
} from "@temp/hooks/useFormset";
import { VariantUpdate_productVariantUpdate_errors } from "@temp/sections/products/types/VariantUpdate";
import {
  getAttributeInputFromVariant,
  getStockInputFromVariant
} from "@temp/sections/products/utils/data";
import { diff } from "fast-array-diff";
import React from "react";
import _ from 'lodash';

import { maybe } from "@temp/misc";
import { ProductVariant } from "../../types/ProductVariant";
import ProductStocks, { ProductStockInput } from "../ProductStocks";
import ProductVariantAttributes, {
  VariantAttributeInputData
} from "../ProductVariantAttributes";
import ProductVariantImages from "../ProductVariantImages";
import ProductVariantImageSelectDialog from "../ProductVariantImageSelectDialog";
import ProductVariantNavigation from "../ProductVariantNavigation";
import ProductVariantPrice from "../ProductVariantPrice";
import {IntlShape, useIntl} from "react-intl";
import * as yup from "yup";
import {formMessages} from "@temp/intl";
import {useFormik} from "formik";

const createSchema = (intl: IntlShape) => yup.object().shape({
  costPrice: yup.number()
      .required(intl.formatMessage(formMessages.requiredField))
      .min(0, intl.formatMessage(formMessages.min0)),
  priceOverride: yup.number(),
  sku: yup.string().required(intl.formatMessage(formMessages.requiredField))
});

export interface ProductVariantPageFormData {
  costPrice: number;
  priceOverride: number;
  sku: string;
}

export interface ProductVariantPageSubmitData
    extends ProductVariantPageFormData {
  attributes: FormsetData<VariantAttributeInputData, string>;
  addStocks: ProductStockInput[];
  updateStocks: ProductStockInput[];
  removeStocks: string[];
}

interface ProductVariantPageProps {
  variant?: ProductVariant;
  errors: VariantUpdate_productVariantUpdate_errors[];
  saveButtonBarState: ConfirmButtonTransitionState;
  loading?: boolean;
  placeholderImage?: string;
  header: string;
  onAdd();
  onBack();
  onDelete();
  onSubmit(data: ProductVariantPageSubmitData);
  onImageSelect(id: string);
  onVariantClick(variantId: string);
}

const ProductVariantPage: React.FC<ProductVariantPageProps> = ({
                                                                 errors,
                                                                 loading,
                                                                 header,
                                                                 placeholderImage,
                                                                 saveButtonBarState,
                                                                 variant,
                                                                 onAdd,
                                                                 onBack,
                                                                 onDelete,
                                                                 onImageSelect,
                                                                 onSubmit,
                                                                 onVariantClick
                                                               }) => {
  const intl = useIntl();
  const attributeInput = React.useMemo(
      () => getAttributeInputFromVariant(variant),
      [variant]
  );
  const stockInput = React.useMemo(() => getStockInputFromVariant(variant), [
    variant
  ]);
  const { change: changeAttributeData, data: attributes } = useFormset(
      attributeInput
  );
  const {
    add: addStock,
    change: changeStockData,
    data: stocks,
    remove: removeStock
  } = useFormset(stockInput);

  const [isModalOpened, setModalStatus] = React.useState(false);
  const toggleModal = () => setModalStatus(!isModalOpened);

  const variantImages = maybe(() => variant.images.map(image => image.id), []);
  const productImages = maybe(() =>
      _.sortBy(variant?.product.images, img => img.sortOrder)
  );
  const images = maybe(() =>
      productImages
          .filter(image => variantImages.indexOf(image.id) !== -1)
          .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
  );

  const initialForm: ProductVariantPageFormData = {
    costPrice: maybe(() => variant.costPrice.amount, 0),
    priceOverride: maybe(() => variant.priceOverride.amount, 0),
    sku: maybe(() => variant.sku, "")
  };

  const handleSubmit = (data: ProductVariantPageFormData) => {
    const dataStocks = stocks.map(stock => stock.id);
    const variantStocks = variant.stocks.map(stock => stock.id);
    const stockDiff = diff(variantStocks, dataStocks);
    onSubmit({
      ...data,
      addStocks: stocks.filter(stock =>
          stockDiff.added.some(addedStock => addedStock === stock.id)
      ),
      attributes,
      removeStocks: stockDiff.removed,
      updateStocks: stocks.filter(
          stock => !stockDiff.added.some(addedStock => addedStock === stock.id)
      )
    });
  };

  const form = useFormik({
    initialValues: initialForm,
    enableReinitialize: true,
    validationSchema: createSchema(intl),
    onSubmit: values => {
      handleSubmit(values);
    }
  });

  const handleAttributeChange: FormsetChange = (id, value) => {
    changeAttributeData(id, value);
    // triggerChange();
  };

  return (
      <>
        <Container>
          <AppHeader onBack={onBack}>
            {maybe(() => variant.product.name)}
          </AppHeader>
          <PageHeader title={header} />
          <form onSubmit={form.handleSubmit}>
            <Grid variant="inverted">
              <div>
                <ProductVariantNavigation
                    current={variant ? variant.id : undefined}
                    fallbackThumbnail={maybe(
                        () => variant.product.thumbnail.url
                    )}
                    variants={maybe(() => variant.product.variants)}
                    onAdd={onAdd}
                    onRowClick={(variantId: string) => {
                      if (variant) {
                        return onVariantClick(variantId);
                      }
                    }}
                />
              </div>
              <div>
                <ProductVariantAttributes
                    attributes={attributes}
                    disabled={loading}
                    errors={errors}
                    onChange={handleAttributeChange}
                />
                <CardSpacer />
                <ProductVariantImages
                    disabled={loading}
                    images={images}
                    placeholderImage={placeholderImage}
                    onImageAdd={toggleModal}
                />
                <CardSpacer />
                <ProductVariantPrice
                    errors={errors}
                    priceOverride={form.values.priceOverride}
                    currencySymbol={
                      variant && variant.priceOverride
                          ? variant.priceOverride.currency
                          : variant && variant.costPrice
                          ? variant.costPrice.currency
                          : ""
                    }
                    costPrice={form.values.costPrice}
                    loading={loading}
                    onChange={form.handleChange}
                />
                <CardSpacer />
                <ProductStocks
                    data={form.values}
                    disabled={loading}
                    errors={errors}
                    stocks={stocks}
                    onChange={(id, value) => {
                      // triggerChange();
                      changeStockData(id, value);
                    }}
                    onFormDataChange={form.handleChange}
                    onStockAdd={id => {
                      // triggerChange();
                      addStock({
                        data: null,
                        id,
                        label: id,
                        value: "0"
                      });
                    }}
                    onStockDelete={id => {
                      // triggerChange();
                      removeStock(id);
                    }}
                />
              </div>
            </Grid>
            <SaveButtonBar
                disabled={loading || !form.isValid}
                state={saveButtonBarState}
                onCancel={onBack}
                onDelete={onDelete}
                onSave={form.handleSubmit}
            />
          </form>
        </Container>
        {variant && (
            <ProductVariantImageSelectDialog
                onClose={toggleModal}
                onImageSelect={onImageSelect}
                open={isModalOpened}
                images={productImages}
                selectedImages={maybe(() => variant.images.map(image => image.id))}
            />
        )}
      </>
  );
};
ProductVariantPage.displayName = "ProductVariantPage";
export default ProductVariantPage;
