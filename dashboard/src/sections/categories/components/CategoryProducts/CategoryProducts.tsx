import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardTitle from "@temp/components/CardTitle";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ListActions, PageListProps } from "@temp/types";
import { CategoryDetails_category_products_edges_node } from "../../types/CategoryDetails";
import CategoryProductList from "../CategoryProductList";
import {buttonMessages, commonMessages} from "@temp/intl";

interface CategoryProductsProps extends PageListProps, ListActions {
  products: CategoryDetails_category_products_edges_node[];
  categoryName: string;
}

export const CategoryProducts: React.FC<CategoryProductsProps> = ({
  products,
  disabled,
  pageInfo,
  onAdd,
  onNextPage,
  onPreviousPage,
  onRowClick,
  categoryName,
  isChecked,
  selected,
  toggle,
  toggleAll,
  toolbar
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(
          commonMessages.productsInCategory,
          { categoryName }
        )}
        toolbar={
          <Button color="primary" variant="text" onClick={onAdd}>
            <FormattedMessage {...buttonMessages.addProduct}/>
          </Button>
        }
      />
      <CategoryProductList
        products={products}
        disabled={disabled}
        pageInfo={pageInfo}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowClick={onRowClick}
        selected={selected}
        isChecked={isChecked}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={toolbar}
      />
    </Card>
  );
};

CategoryProducts.displayName = "CategoryProducts";
export default CategoryProducts;
