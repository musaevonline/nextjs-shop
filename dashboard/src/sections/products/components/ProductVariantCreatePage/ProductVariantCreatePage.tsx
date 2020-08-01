import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
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
import { getVariantAttributeInputFromProduct } from "@temp/sections/products/utils/data";
import React from "react";
import {IntlShape, useIntl} from "react-intl";

import { maybe } from "@temp/misc";
import { ProductVariantCreateData_product } from "../../types/ProductVariantCreateData";
import ProductStocks, { ProductStockInput } from "../ProductStocks";
import ProductVariantAttributes, {
    VariantAttributeInputData
} from "../ProductVariantAttributes";
import ProductVariantNavigation from "../ProductVariantNavigation";
import ProductVariantPrice from "../ProductVariantPrice";
import {useFormik} from "formik";
import * as yup from 'yup';
import {formMessages} from "@temp/intl";

const createSchema = (intl: IntlShape) => yup.object().shape({
    costPrice: yup.number()
        .required(intl.formatMessage(formMessages.requiredField))
        .min(0, intl.formatMessage(formMessages.min0)),
    images: yup.array(),
    priceOverride: yup.number(),
    quantity: yup.number().min(0, intl.formatMessage(formMessages.min0)),
    sku: yup.string().required(intl.formatMessage(formMessages.requiredField))
});

interface ProductVariantCreatePageFormData {
    costPrice: number;
    images: string[];
    priceOverride: number;
    quantity: number;
    sku: string;
}

export interface ProductVariantCreatePageSubmitData
    extends ProductVariantCreatePageFormData {
    attributes: FormsetData<VariantAttributeInputData>;
    stocks: ProductStockInput[];
}

interface ProductVariantCreatePageProps {
    currencySymbol: string;
    disabled: boolean;
    errors: ProductErrorFragment[];
    header: string;
    product: ProductVariantCreateData_product;
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onSubmit: (data: ProductVariantCreatePageSubmitData) => void;
    onVariantClick: (variantId: string) => void;
}

const ProductVariantCreatePage: React.FC<ProductVariantCreatePageProps> = ({
                                                                               currencySymbol,
                                                                               disabled,
                                                                               errors,
                                                                               header,
                                                                               product,
                                                                               saveButtonBarState,
                                                                               onBack,
                                                                               onSubmit,
                                                                               onVariantClick
                                                                           }) => {
    const intl = useIntl();
    const attributeInput = React.useMemo(
        () => getVariantAttributeInputFromProduct(product),
        [product]
    );
    const { change: changeAttributeData, data: attributes } = useFormset(
        attributeInput
    );
    const {
        add: addStock,
        change: changeStockData,
        data: stocks,
        remove: removeStock
    } = useFormset<null, string>([]);

    const initialForm: ProductVariantCreatePageFormData = {
        costPrice: 0,
        images: maybe(() => product.images.map(image => image.id)),
        priceOverride: 0,
        quantity: 0,
        sku: ""
    };

    const handleSubmit = (data: ProductVariantCreatePageFormData) =>{
        onSubmit({
            ...data,
            attributes,
            stocks
        });
    }


    const form = useFormik({
        initialValues: initialForm,
        enableReinitialize: true,
        validationSchema: createSchema(intl),
        onSubmit: values => {
            handleSubmit(values);
        }
    })
    const handleAttributeChange: FormsetChange = (id, value) => {
        changeAttributeData(id, value);
        // triggerChange();
    };
    return (
        <form onSubmit={form.handleSubmit}>
            <Container>
                <AppHeader onBack={onBack}>{maybe(() => product.name)}</AppHeader>
                <PageHeader title={header} />
                <Grid variant="inverted">
                    <div>
                        <ProductVariantNavigation
                            fallbackThumbnail={maybe(() => product.thumbnail.url)}
                            variants={maybe(() => product.variants)}
                            onRowClick={(variantId: string) => {
                                if (product && product.variants) {
                                    return onVariantClick(variantId);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <ProductVariantAttributes
                            attributes={attributes}
                            disabled={disabled}
                            errors={errors}
                            onChange={handleAttributeChange}
                        />
                        <CardSpacer />
                        <ProductVariantPrice
                            errors={errors}
                            priceOverride={form.values.priceOverride}
                            currencySymbol={currencySymbol}
                            costPrice={form.values.costPrice}
                            loading={disabled}
                            onChange={form.handleChange}
                        />
                        <CardSpacer />
                        <ProductStocks
                            data={form.values}
                            disabled={disabled}
                            onFormDataChange={form.handleChange}
                            errors={errors}
                            stocks={stocks}
                            onChange={(id, value) => {
                                // triggerChange();
                                changeStockData(id, value);
                            }}
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
                    disabled={disabled || !onSubmit || !form.dirty || !form.isValid}
                    labels={{
                        delete: intl.formatMessage({ id: 'delete_variant',
                            defaultMessage: "Delete Variant",
                            description: "button"
                        }),
                        save: intl.formatMessage({ id: 'save_variant',
                            defaultMessage: "Save variant",
                            description: "button"
                        })
                    }}
                    state={saveButtonBarState}
                    onCancel={onBack}
                    onSave={form.handleSubmit}
                />
            </Container>
        </form>
    );
};
ProductVariantCreatePage.displayName = "ProductVariantCreatePage";
export default ProductVariantCreatePage;
