import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import AppHeader from "@temp/components/AppHeader";
import CardSpacer from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import VisibilityCard from "@temp/components/VisibilityCard";
import useDateLocalize from "@temp/hooks/useDateLocalize";
import useFormset from "@temp/hooks/useFormset";
import useStateFromProps from "@temp/hooks/useStateFromProps";
import { sectionNames } from "@temp/intl";
import { maybe } from "@temp/misc";
import { SearchCategories_search_edges_node } from "@temp/searches/types/SearchCategories";
import { FetchMoreProps, ListActions } from "@temp/types";
import createSingleAutocompleteSelectHandler from "@temp/utils/handlers/singleAutocompleteSelectChangeHandler";
import { diff } from "fast-array-diff";
import React from "react";
import { useIntl } from "react-intl";

import {
    ProductDetails_product,
    ProductDetails_product_images,
    ProductDetails_product_variants
} from "../../types/ProductDetails";
import {
    getAttributeInputFromProduct,
    getChoices,
    getProductUpdatePageFormData,
    getSelectedAttributesFromProduct,
    getStockInputFromProduct,
    ProductAttributeValueChoices,
    ProductUpdatePageFormData
} from "../../utils/data";
import {
    createAttributeChangeHandler,
    createAttributeMultiChangeHandler
} from "../../utils/handlers";
import ProductAttributes, { ProductAttributeInput } from "../ProductAttributes";
import ProductDetailsForm from "../ProductDetailsForm";
import ProductImages from "../ProductImages";
import ProductOrganization from "../ProductOrganization";
import ProductStocks, { ProductStockInput } from "../ProductStocks";
import ProductVariants from "../ProductVariants";
import {useFormik} from "formik";
import * as yup from 'yup';

const schema = yup.object().shape({
    category: yup.string(),
    description: yup.string(),
    isPublished: yup.bool(),
    name: yup.string(),
    publicationDate: yup.string(),
    sku: yup.string(),
});

export interface ProductUpdatePageProps extends ListActions {
    errors: ProductErrorFragment[];
    placeholderImage: string;
    categories: SearchCategories_search_edges_node[];
    disabled: boolean;
    fetchMoreCategories: FetchMoreProps;
    variants: ProductDetails_product_variants[];
    images: ProductDetails_product_images[];
    product: ProductDetails_product;
    header: string;
    saveButtonBarState: ConfirmButtonTransitionState;
    fetchCategories: (query: string) => void;
    onVariantsAdd: () => void;
    onVariantShow: (id: string) => () => void;
    onImageDelete: (id: string) => () => void;
    onBack?();
    onDelete();
    onImageEdit?(id: string);
    onImageReorder?(event: { oldIndex: number; newIndex: number });
    onImageUpload(file: File);
    onSubmit?(data: ProductUpdatePageSubmitData);
    onVariantAdd?();
}

export interface ProductUpdatePageSubmitData extends ProductUpdatePageFormData {
    attributes: ProductAttributeInput[];
    addStocks: ProductStockInput[];
    updateStocks: ProductStockInput[];
    removeStocks: string[];
}

export const ProductUpdatePage: React.FC<ProductUpdatePageProps> = ({
                                                                        disabled,
                                                                        categories: categoryChoiceList,
                                                                        errors,
                                                                        fetchCategories,
                                                                        fetchMoreCategories,
                                                                        images,
                                                                        header,
                                                                        placeholderImage,
                                                                        product,
                                                                        saveButtonBarState,
                                                                        variants,
                                                                        onBack,
                                                                        onDelete,
                                                                        onImageDelete,
                                                                        onImageEdit,
                                                                        onImageReorder,
                                                                        onImageUpload,
                                                                        onSubmit,
                                                                        onVariantAdd,
                                                                        onVariantsAdd,
                                                                        onVariantShow,
                                                                        isChecked,
                                                                        selected,
                                                                        toggle,
                                                                        toggleAll,
                                                                        toolbar
                                                                    }) => {
    const intl = useIntl();
    const localizeDate = useDateLocalize();
    const attributeInput = React.useMemo(
        () => getAttributeInputFromProduct(product),
        [product]
    );
    const stockInput = React.useMemo(() => getStockInputFromProduct(product), [
        product
    ]);
    const { change: changeAttributeData, data: attributes } = useFormset(
        attributeInput
    );
    const {
        change: changeStockData,
        data: stocks,
        remove: removeStock
    } = useFormset(stockInput);

    const [selectedAttributes, setSelectedAttributes] = useStateFromProps<
        ProductAttributeValueChoices[]
        >(getSelectedAttributesFromProduct(product));

    const [selectedCategory, setSelectedCategory] = useStateFromProps(
        maybe(() => product.category.name, "")
    );

    const initialData = getProductUpdatePageFormData(product, variants);
    const initialDescription = maybe<string>(() => product.description);

    const categories = getChoices(categoryChoiceList);
    const hasVariants = maybe(() => product.productType.hasVariants, false);

    const handleSubmit = (data: ProductUpdatePageFormData) => {
        const dataStocks = stocks.map(stock => stock.id);
        console.log(dataStocks);
        const variantStocks = product.variants[0]?.stocks.map(
            stock => stock.id
        ) || dataStocks;
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
        initialValues: initialData,
        validationSchema: schema,
        enableReinitialize: true,
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    const triggerChange = () => {
        console.log('trigger change');
    };

    const handleCategorySelect = createSingleAutocompleteSelectHandler(
        (e) => {form.handleChange(e as any)},
        setSelectedCategory,
        categories
    );
    const handleAttributeChange = createAttributeChangeHandler(
        changeAttributeData,
        setSelectedAttributes,
        selectedAttributes,
        attributes,
        triggerChange
    );
    const handleAttributeMultiChange = createAttributeMultiChangeHandler(
        changeAttributeData,
        setSelectedAttributes,
        selectedAttributes,
        attributes,
        triggerChange
    );

    return (
        <form onSubmit={form.handleSubmit} >
            <>
                <Container>
                    <AppHeader onBack={onBack}>
                        {intl.formatMessage(sectionNames.products)}
                    </AppHeader>
                    <PageHeader title={header} />
                    <Grid>
                        <div>
                            <ProductDetailsForm
                                data={form.values}
                                disabled={disabled}
                                errors={errors}
                                initialDescription={initialDescription}
                                onChange={form.handleChange}
                            />
                            <CardSpacer />
                            <ProductImages
                                images={images}
                                placeholderImage={placeholderImage}
                                onImageDelete={onImageDelete}
                                onImageReorder={onImageReorder}
                                onImageEdit={onImageEdit}
                                onImageUpload={onImageUpload}
                            />
                            <CardSpacer />
                            {attributes.length > 0 && (
                                <ProductAttributes
                                    attributes={attributes}
                                    disabled={disabled}
                                    onChange={handleAttributeChange}
                                    onMultiChange={handleAttributeMultiChange}
                                />
                            )}
                            <CardSpacer />
                            {hasVariants ? (
                                <ProductVariants
                                    disabled={disabled}
                                    variants={variants}
                                    fallbackPrice={product ? product.minimalVariantPrice : undefined}
                                    onRowClick={onVariantShow}
                                    onVariantAdd={onVariantAdd}
                                    onVariantsAdd={onVariantsAdd}
                                    toolbar={toolbar}
                                    isChecked={isChecked}
                                    selected={selected}
                                    toggle={toggle}
                                    toggleAll={toggleAll}
                                />
                            ) : (
                                <ProductStocks
                                    data={form.values}
                                    disabled={disabled}
                                    errors={errors}
                                    stocks={stocks}
                                    onChange={(id, value) => {
                                        triggerChange();
                                        changeStockData(id, value);
                                    }}
                                    onFormDataChange={(event => {form.handleChange(event as any)})}
                                    onWarehouseStockDelete={id => {
                                        triggerChange();
                                        removeStock(id);
                                    }}
                                />
                            )}
                            <CardSpacer />
                        </div>
                        <div>
                            <ProductOrganization
                                canChangeType={false}
                                categories={categories}
                                categoryInputDisplayValue={selectedCategory}
                                data={form.values}
                                disabled={disabled}
                                errors={errors}
                                fetchCategories={fetchCategories}
                                fetchMoreCategories={fetchMoreCategories}
                                productType={maybe(() => product.productType)}
                                onCategoryChange={handleCategorySelect}
                            />
                            <CardSpacer />
                            <VisibilityCard
                                data={form.values}
                                errors={errors}
                                disabled={disabled}
                                hiddenMessage={intl.formatMessage(
                                    { id: 'will_be_visible',
                                        defaultMessage: "will be visible from {date}",
                                        description: "product"
                                    },
                                    {
                                        date: localizeDate(form.values.publicationDate)
                                    }
                                )}
                                onChange={form.handleChange}
                                visibleMessage={intl.formatMessage(
                                    {
                                        id: 'since_date',
                                        defaultMessage: "since {date}",
                                        description: "product"
                                    },
                                    {
                                        date: localizeDate(form.values.publicationDate)
                                    }
                                )}
                            />
                        </div>
                    </Grid>
                    <SaveButtonBar
                        onCancel={onBack}
                        onDelete={onDelete}
                        onSave={form.handleSubmit}
                        state={saveButtonBarState}
                        disabled={disabled || !form.dirty || !form.isValid}
                    />
                </Container>
            </>
        </form>
    );
};
ProductUpdatePage.displayName = "ProductUpdatePage";
export default ProductUpdatePage;
