import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@temp/components/CardTitle";
import Checkbox from "@temp/components/Checkbox";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import {
  SortableTableBody,
  SortableTableRow
} from "@temp/components/SortableTable";
import TableHead from "@temp/components/TableHead";
import { maybe, renderCollection, stopPropagation } from "@temp/misc";
import { ListActions, ReorderAction } from "@temp/types";
import { AttributeTypeEnum } from "@temp/types/globalTypes";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  ProductTypeDetails_productType_productAttributes,
  ProductTypeDetails_productType_variantAttributes
} from "../../types/ProductTypeDetails";

const useStyles = makeStyles(
  theme => ({
    colName: {},
    colSlug: {
      width: 300
    },
    iconCell: {
      "&:last-child": {
        paddingRight: 0
      },
      width: 48 + theme.spacing(1.5)
    },
    link: {
      cursor: "pointer"
    },
    textLeft: {
      textAlign: "left"
    }
  }),
  { name: "ProductTypeAttributes" }
);

interface ProductTypeAttributesProps extends ListActions {
  attributes:
    | ProductTypeDetails_productType_productAttributes[]
    | ProductTypeDetails_productType_variantAttributes[];
  disabled: boolean;
  type: string;
  onAttributeAssign: (type: AttributeTypeEnum) => void;
  onAttributeClick: (id: string) => void;
  onAttributeReorder: ReorderAction;
  onAttributeUnassign: (id: string) => void;
}

const numberOfColumns = 5;

const ProductTypeAttributes: React.FC<ProductTypeAttributesProps> = props => {
  const {
    attributes,

    disabled,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar,
    type,
    onAttributeAssign,
    onAttributeClick,
    onAttributeReorder,
    onAttributeUnassign
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card
      data-tc={
        type === AttributeTypeEnum.PRODUCT
          ? "product-attributes"
          : "variant-attributes"
      }
    >
      <CardTitle
        title={
          type === AttributeTypeEnum.PRODUCT
            ? intl.formatMessage({id: 'product_attributes',
                defaultMessage: "Product Attributes",
                description: "section header"
              })
            : intl.formatMessage({id: 'variant_attributes',
                defaultMessage: "Variant Attributes",
                description: "section header"
              })
        }
        toolbar={
          <Button
            color="primary"
            variant="text"
            onClick={() => onAttributeAssign(AttributeTypeEnum[type])}
          >
            <FormattedMessage id="assign_attribute"
              defaultMessage="Assign attribute"
              description="button"
            />
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead
          colSpan={numberOfColumns}
          disabled={disabled}
          dragRows
          selected={selected}
          items={attributes}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCell className={classes.colName}>
            <FormattedMessage id="attribute_name" defaultMessage="Attribute name" />
          </TableCell>
          <TableCell className={classes.colName}>
            <FormattedMessage id="slug"
              defaultMessage="Slug"
              description="attribute internal name"
            />
          </TableCell>
          <TableCell />
        </TableHead>
        <SortableTableBody onSortEnd={onAttributeReorder}>
          {renderCollection(
            attributes,
            (attribute, attributeIndex) => {
              const isSelected = attribute ? isChecked(attribute.id) : false;

              return (
                <SortableTableRow
                  selected={isSelected}
                  className={!!attribute ? classes.link : undefined}
                  hover={!!attribute}
                  onClick={
                    !!attribute
                      ? () => onAttributeClick(attribute.id)
                      : undefined
                  }
                  key={maybe(() => attribute.id)}
                  index={attributeIndex || 0}
                  data-tc="id"
                  data-tc-id={maybe(() => attribute.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(attribute.id)}
                    />
                  </TableCell>
                  <TableCell className={classes.colName} data-tc="name">
                    {maybe(() => attribute.name) ? (
                      attribute.name
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colSlug} data-tc="slug">
                    {maybe(() => attribute.slug) ? (
                      attribute.slug
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton
                      onClick={stopPropagation(() =>
                        onAttributeUnassign(attribute.id)
                      )}
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </SortableTableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage id="no_attributes_found" defaultMessage="No attributes found" />
                </TableCell>
              </TableRow>
            )
          )}
        </SortableTableBody>
      </ResponsiveTable>
    </Card>
  );
};
ProductTypeAttributes.displayName = "ProductTypeAttributes";
export default ProductTypeAttributes;
