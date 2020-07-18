import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import AppHeader from "@temp/components/AppHeader";
import { CardSpacer } from "@temp/components/CardSpacer";
import CardTitle from "@temp/components/CardTitle";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import { Tab, TabContainer } from "@temp/components/Tab";
import {buttonMessages, commonMessages, sectionNames} from "@temp/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "@temp/misc";
import { TabListActions } from "@temp/types";
import CategoryDetailsForm from "../../components/CategoryDetailsForm";
import CategoryList from "../../components/CategoryList";
import {
    CategoryDetails_category,
    CategoryDetails_category_children_edges_node,
    CategoryDetails_category_products_edges_node
} from "../../types/CategoryDetails";
import CategoryBackground from "../CategoryBackground";
import CategoryProducts from "../CategoryProducts";
import {useFormik} from "formik";
import * as yup from 'yup';

const schema = yup.object().shape({
    backgroundImageAlt: yup.string(),
    description: yup.string(),
    name: yup.string()
});

export interface FormData {
    backgroundImageAlt: string;
    description: string;
    name: string;
}

export enum CategoryPageTab {
    categories = "categories",
    products = "products"
}

export interface CategoryUpdatePageProps
    extends TabListActions<"productListToolbar" | "subcategoryListToolbar"> {
    changeTab: (index: CategoryPageTab) => void;
    currentTab: CategoryPageTab;
    errors: ProductErrorFragment[];
    disabled: boolean;
    category: CategoryDetails_category;
    products: CategoryDetails_category_products_edges_node[];
    subcategories: CategoryDetails_category_children_edges_node[];
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    saveButtonBarState: ConfirmButtonTransitionState;
    onImageDelete: () => void;
    onSubmit: (data: FormData) => void;
    onImageUpload(file: File);
    onNextPage();
    onPreviousPage();
    onProductClick(id: string): () => void;
    onAddProduct();
    onBack();
    onDelete();
    onAddCategory();
    onCategoryClick(id: string): () => void;
}

const CategoriesTab = Tab(CategoryPageTab.categories);
const ProductsTab = Tab(CategoryPageTab.products);

export const CategoryUpdatePage: React.FC<CategoryUpdatePageProps> = ({
                                                                          changeTab,
                                                                          currentTab,
                                                                          category,
                                                                          disabled,
                                                                          errors,
                                                                          pageInfo,
                                                                          products,
                                                                          saveButtonBarState,
                                                                          subcategories,
                                                                          onAddCategory,
                                                                          onAddProduct,
                                                                          onBack,
                                                                          onCategoryClick,
                                                                          onDelete,
                                                                          onNextPage,
                                                                          onPreviousPage,
                                                                          onProductClick,
                                                                          onSubmit,
                                                                          onImageDelete,
                                                                          onImageUpload,
                                                                          isChecked,
                                                                          productListToolbar,
                                                                          selected,
                                                                          subcategoryListToolbar,
                                                                          toggle,
                                                                          toggleAll
                                                                      }: CategoryUpdatePageProps) => {
    const intl = useIntl();
    const initialValues: FormData = category
        ? {
            backgroundImageAlt: maybe(() => category.backgroundImage.alt, ""),
            description: maybe(() => category.description),
            name: category.name || ""
        }
        : {
            backgroundImageAlt: "",
            description: "",
            name: ""
        };
    const form = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: values => {
            onSubmit(values)
        }
    });
    return (
        <form onSubmit={form.handleSubmit}>
            <Container>
                <AppHeader onBack={onBack}>
                    {intl.formatMessage(sectionNames.categories)}
                </AppHeader>
                <PageHeader title={category ? category.name : undefined} />
                <CategoryDetailsForm
                    category={category}
                    data={form.values}
                    disabled={disabled}
                    errors={errors}
                    onChange={form.handleChange}
                />
                <CardSpacer />
                <CategoryBackground
                    data={form.values}
                    onImageUpload={onImageUpload}
                    onImageDelete={onImageDelete}
                    image={maybe(() => category.backgroundImage)}
                    onChange={form.handleChange}
                />
                <CardSpacer />
                <TabContainer>
                    <CategoriesTab
                        isActive={currentTab === CategoryPageTab.categories}
                        changeTab={changeTab}
                    >
                        <FormattedMessage {...commonMessages.subcategories}/>
                    </CategoriesTab>
                    <ProductsTab
                        isActive={currentTab === CategoryPageTab.products}
                        changeTab={changeTab}
                    >
                        <FormattedMessage {...commonMessages.numberOfProducts}/>
                    </ProductsTab>
                </TabContainer>
                <CardSpacer />
                {currentTab === CategoryPageTab.categories && (
                    <Card>
                        <CardTitle
                            title={intl.formatMessage(commonMessages.all)}
                            toolbar={
                                <Button
                                    color="primary"
                                    variant="text"
                                    onClick={onAddCategory}
                                >
                                    <FormattedMessage {...buttonMessages.createSubcategory} />
                                </Button>
                            }
                        />
                        <CategoryList
                            categories={subcategories}
                            disabled={disabled}
                            isChecked={isChecked}
                            isRoot={false}
                            pageInfo={pageInfo}
                            selected={selected}
                            sort={undefined}
                            toggle={toggle}
                            toggleAll={toggleAll}
                            toolbar={subcategoryListToolbar}
                            onNextPage={onNextPage}
                            onPreviousPage={onPreviousPage}
                            onRowClick={onCategoryClick}
                            onSort={() => undefined}
                        />
                    </Card>
                )}
                {currentTab === CategoryPageTab.products && (
                    <CategoryProducts
                        categoryName={maybe(() => category.name)}
                        products={products}
                        disabled={disabled}
                        pageInfo={pageInfo}
                        onNextPage={onNextPage}
                        onPreviousPage={onPreviousPage}
                        onRowClick={onProductClick}
                        onAdd={onAddProduct}
                        toggle={toggle}
                        toggleAll={toggleAll}
                        selected={selected}
                        isChecked={isChecked}
                        toolbar={productListToolbar}
                    />
                )}
                <SaveButtonBar
                    onCancel={onBack}
                    onDelete={onDelete}
                    onSave={form.handleSubmit}
                    state={saveButtonBarState}
                    disabled={disabled || !form.isValid || !form.dirty}
                />
            </Container>
        </form>
    );
};
CategoryUpdatePage.displayName = "CategoryUpdatePage";
export default CategoryUpdatePage;
