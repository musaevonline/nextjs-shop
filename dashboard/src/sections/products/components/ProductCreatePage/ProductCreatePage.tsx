import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import AppHeader from "@temp/components/AppHeader";
import CardSpacer from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Form from "@temp/components/Form";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import VisibilityCard from "@temp/components/VisibilityCard";
import useDateLocalize from "@temp/hooks/useDateLocalize";
import useFormset from "@temp/hooks/useFormset";
import useStateFromProps from "@temp/hooks/useStateFromProps";
import { sectionNames } from "@temp/intl";
import {
  getChoices,
  ProductAttributeValueChoices,
  ProductType
} from "@temp/sections/products/utils/data";
import { SearchCategories_search_edges_node } from "@temp/searches/types/SearchCategories";
import { SearchProductTypes_search_edges_node_productAttributes } from "@temp/searches/types/SearchProductTypes";
import createSingleAutocompleteSelectHandler from "@temp/utils/handlers/singleAutocompleteSelectChangeHandler";
import React from "react";
import { useIntl } from "react-intl";

import { FetchMoreProps } from "@temp/types";
import {
  createAttributeChangeHandler,
  createAttributeMultiChangeHandler,
  createProductTypeSelectHandler
} from "../../utils/handlers";
import ProductAttributes, {
  ProductAttributeInput,
  ProductAttributeInputData
} from "../ProductAttributes";
import ProductDetailsForm from "../ProductDetailsForm";
import ProductOrganization from "../ProductOrganization";
import ProductStocks, { ProductStockInput } from "../ProductStocks";

interface FormData {
  publicationDate: string;
  category: string;
  chargeTaxes: boolean;
  description: string;
  isPublished: boolean;
  name: string;
  productType: string;
  sku: string;
  stockQuantity: number;
}
export interface ProductCreatePageSubmitData extends FormData {
  attributes: ProductAttributeInput[];
  stocks: ProductStockInput[];
}

interface ProductCreatePageProps {
  errors: ProductErrorFragment[];
  categories: SearchCategories_search_edges_node[];
  currency: string;
  disabled: boolean;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreProductTypes: FetchMoreProps;
  productTypes?: Array<{
    id: string;
    name: string;
    hasVariants: boolean;
    productAttributes: SearchProductTypes_search_edges_node_productAttributes[];
  }>;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  fetchCategories: (data: string) => void;
  fetchProductTypes: (data: string) => void;
  onBack?();
  onSubmit?(data: ProductCreatePageSubmitData);
}

export const ProductCreatePage: React.FC<ProductCreatePageProps> = ({
  currency,
  disabled,
  categories: categoryChoiceList,
  errors,
  fetchCategories,
  fetchMoreCategories,
  fetchMoreProductTypes,
  header,
  productTypes: productTypeChoiceList,
  saveButtonBarState,
  onBack,
  fetchProductTypes,
  onSubmit
}: ProductCreatePageProps) => {
  const intl = useIntl();
  const localizeDate = useDateLocalize();
  // Form values
  const {
    change: changeAttributeData,
    data: attributes,
    set: setAttributeData
  } = useFormset<ProductAttributeInputData>([]);
  const {
    change: changeStockData,
    data: stocks,
    remove: removeStock
  } = useFormset<null, string>([]);

  // Ensures that it will not change after component rerenders, because it
  // generates different block keys and it causes editor to lose its content.
  const initialDescription = React.useRef(
    ''
  );
  const initialData: FormData = {
    category: "",
    chargeTaxes: false,
    description: {} as any,
    isPublished: false,
    name: "",
    productType: "",
    publicationDate: "",
    sku: null,
    stockQuantity: null
  };

  // Display values
  const [selectedAttributes, setSelectedAttributes] = useStateFromProps<
    ProductAttributeValueChoices[]
  >([]);

  const [selectedCategory, setSelectedCategory] = useStateFromProps("");

  const [productType, setProductType] = React.useState<ProductType>(null);

  const categories = getChoices(categoryChoiceList);
  const productTypes = getChoices(productTypeChoiceList);

  const handleSubmit = (data: FormData) =>
    onSubmit({
      attributes,
      stocks,
      ...data
    });

  return (
    <Form onSubmit={handleSubmit} initial={initialData} confirmLeave>
      {({ change, data, hasChanged, submit, triggerChange, toggleValue }) => {
        const handleCategorySelect = createSingleAutocompleteSelectHandler(
          change,
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

        const handleProductTypeSelect = createProductTypeSelectHandler(
          change,
          setAttributeData,
          setSelectedAttributes,
          setProductType,
          productTypeChoiceList
        );

        return (
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.products)}
            </AppHeader>
            <PageHeader title={header} />
            <Grid>
              <div>
                <ProductDetailsForm
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  initialDescription={initialDescription.current}
                  onChange={change}
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
                {!!productType && !productType.hasVariants && (
                  <>
                    <ProductStocks
                      data={data}
                      disabled={disabled}
                      onFormDataChange={change}
                      errors={errors}
                      stocks={stocks}
                      onChange={(id, value) => {
                        triggerChange();
                        changeStockData(id, value);
                      }}
                      onWarehouseStockDelete={id => {
                        triggerChange();
                        removeStock(id);
                      }}
                    />
                    <CardSpacer />
                  </>
                )}

              </div>
              <div>
                <ProductOrganization
                  canChangeType={true}
                  categories={categories}
                  categoryInputDisplayValue={selectedCategory}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  fetchCategories={fetchCategories}
                  fetchMoreCategories={fetchMoreCategories}
                  fetchMoreProductTypes={fetchMoreProductTypes}
                  fetchProductTypes={fetchProductTypes}
                  productType={productType}
                  productTypeInputDisplayValue={productType?.name || ""}
                  productTypes={productTypes}
                  onCategoryChange={handleCategorySelect}
                  onProductTypeChange={handleProductTypeSelect}
                />
                <CardSpacer />
                <VisibilityCard
                  data={data}
                  errors={errors}
                  disabled={disabled}
                  hiddenMessage={intl.formatMessage({id: 'will_be_visible_date',
                      defaultMessage: "will be visible from {date}",
                      description: "product"
                    },
                    {
                      date: localizeDate(data.publicationDate)
                    }
                  )}
                  onChange={change}
                  visibleMessage={intl.formatMessage({id: 'since_date',
                      defaultMessage: "since {date}",
                      description: "product"
                    },
                    {
                      date: localizeDate(data.publicationDate)
                    }
                  )}
                />
              </div>
            </Grid>
            <SaveButtonBar
              onCancel={onBack}
              onSave={submit}
              state={saveButtonBarState}
              disabled={disabled || !onSubmit || !hasChanged}
            />
          </Container>
        );
      }}
    </Form>
  );
};
ProductCreatePage.displayName = "ProductCreatePage";
export default ProductCreatePage;
