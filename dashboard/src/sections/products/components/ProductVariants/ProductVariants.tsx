import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import Checkbox from "@temp/components/Checkbox";
import LinkChoice from "@temp/components/LinkChoice";
import Money from "@temp/components/Money";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import { SingleAutocompleteChoiceType } from "@temp/components/SingleAutocompleteSelectField";
import Skeleton from "@temp/components/Skeleton";
import TableHead from "@temp/components/TableHead";
import React from "react";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";

import { maybe, renderCollection } from "@temp/misc";
import { ListActions } from "@temp/types";
import {
    ProductDetails_product_variants, ProductDetails_product_variants_stocks
} from "../../types/ProductDetails";
import { ProductVariant_costPrice } from "../../types/ProductVariant";

function getStockChoices(
  variants: ProductDetails_product_variants[],
  intl: IntlShape
): SingleAutocompleteChoiceType[] {
  return [
    {
      label: intl.formatMessage({ id: 'all_stocks',
        defaultMessage: "All Stocks",
        description: "filtering option"
      }),
      value: null
    },
    ...variants
      .reduce<ProductDetails_product_variants_stocks[]>(
        (stocks, variant) => [
          ...stocks,
          ...variant.stocks
        ],
        []
      )
      .map(s => ({
        label: s.id,
        value: s.id
      }))
  ];
}

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colInventory: {
        width: 300
      },
      colName: {},
      colPrice: {
        width: 150
      },
      colSku: {
        width: 200
      }
    },
    colInventory: {
      textAlign: "right"
    },
    colName: {},
    colPrice: {
      textAlign: "right"
    },
    colSku: {},
    colStatus: {},
    denseTable: {
      "& td, & th": {
        paddingRight: theme.spacing(3)
      }
    },
    link: {
      cursor: "pointer"
    },
    select: {
      display: "inline-block"
    },
    textLeft: {
      textAlign: "left" as "left"
    },
    textRight: {
      textAlign: "right" as "right"
    },
    warehouseLabel: {
      display: "inline-block",
      marginRight: theme.spacing()
    },
    warehouseSelectContainer: {
      paddingTop: theme.spacing(2)
    }
  }),
  { name: "ProductVariants" }
);

function getAvailabilityLabel(
  intl: IntlShape,
  stock: string,
  variant: ProductDetails_product_variants,
  numAvailable: number
): string {
  const variantStock = variant.stocks.find(s => s.id === stock);

  if (!!stock) {
    if (!!variantStock) {
      if (variantStock.quantity > 0) {
        return intl.formatMessage(
          { id: 'product_stock',
            defaultMessage:
              "{stockQuantity,plural,one{{stockQuantity} available} other{{stockQuantity} available}}",
            description: "product variant inventory"
          },
          {
            stockQuantity: variantStock.quantity
          }
        );
      } else {
        return intl.formatMessage({ id: 'unavailable',
          defaultMessage: "Unavailable",
          description: "product variant inventory"
        });
      }
    } else {
      return intl.formatMessage({ id: 'not_stocked',
        defaultMessage: "Not stocked",
        description: "product variant inventory"
      });
    }
  } else {
    if (numAvailable > 0) {
      return intl.formatMessage(
        { id: 'available_at_location',
          defaultMessage:
            "{numLocations,plural,one{{numAvailable} available at {numLocations} location} other{{numAvailable} available at {numLocations} locations}}",
          description: "product variant inventory"
        },
        {
          numAvailable,
          numLocations: variant.stocks.length
        }
      );
    } else {
      return intl.formatMessage({ id: 'unavailable_in_all_locations',
        defaultMessage: "Unavailable in all locations",
        description: "product variant inventory"
      });
    }
  }
}

interface ProductVariantsProps extends ListActions {
  disabled: boolean;
  variants: ProductDetails_product_variants[];
  fallbackPrice?: ProductVariant_costPrice;
  onRowClick: (id: string) => () => void;
  onVariantAdd?();
  onVariantsAdd?();
}

const numberOfColumns = 5;

export const ProductVariants: React.FC<ProductVariantsProps> = props => {
  const {
    disabled,
    variants,
    fallbackPrice,
    onRowClick,
    onVariantAdd,
    onVariantsAdd,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();
  const [stock, setStock] = React.useState<string>(null);
  const hasVariants = maybe(() => variants.length > 0, true);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({ id: 'variants',
          defaultMessage: "Variants",
          description: "section header"
        })}
        toolbar={
          hasVariants ? (
            <Button
              onClick={onVariantAdd}
              variant="text"
              color="primary"
              data-tc="button-add-variant"
            >
              <FormattedMessage id="create_variant"
                defaultMessage="Create variant"
                description="button"
              />
            </Button>
          ) : (
            <Button
              onClick={onVariantsAdd}
              variant="text"
              color="primary"
              data-tc="button-add-variants"
            >
              <FormattedMessage id="create_variants"
                defaultMessage="Create variants"
                description="button"
              />
            </Button>
          )
        }
      />

      {variants.length > 0 ? (
        <CardContent className={classes.warehouseSelectContainer}>
          <Typography className={classes.warehouseLabel}>
            <FormattedMessage id="stock_available_at"
              defaultMessage="Available inventory at:"
              description="variant stock status"
            />
          </Typography>
          <LinkChoice
            className={classes.select}
            choices={getStockChoices(variants, intl)}
            name="stock"
            value={stock}
            onChange={event => setStock(event.target.value)}
          />
        </CardContent>
      ) : (
        <CardContent>
          <Typography color={hasVariants ? "textPrimary" : "textSecondary"}>
            <FormattedMessage id="use_variants_for_products"
                              defaultMessage="Use variants for products that come in a variety of versions for example different sizes or colors" />
          </Typography>
        </CardContent>
      )}
      {hasVariants && (
        <ResponsiveTable className={classes.denseTable}>
          <TableHead
            colSpan={numberOfColumns}
            selected={selected}
            disabled={disabled}
            items={variants}
            toggleAll={toggleAll}
            toolbar={toolbar}
          >
            <TableCell className={classes.colName}>
              <FormattedMessage id="variant"
                defaultMessage="Variant"
                description="product variant name"
              />
            </TableCell>
            <TableCell className={classes.colSku}>
              <FormattedMessage id="sku" defaultMessage="SKU" />
            </TableCell>
            <Hidden smDown>
              <TableCell className={classes.colPrice}>
                <FormattedMessage id="price"
                  defaultMessage="Price"
                  description="product variant price"
                />
              </TableCell>
            </Hidden>
            <TableCell className={classes.colInventory}>
              <FormattedMessage id="inventory"
                defaultMessage="Inventory"
                description="product variant inventory status"
              />
            </TableCell>
          </TableHead>
          <TableBody>
            {renderCollection(variants, variant => {
              const isSelected = variant ? isChecked(variant.id) : false;
              const numAvailable =
                variant && variant.stocks
                  ? variant.stocks.reduce(
                      (acc, s) => acc + s.quantity - s.quantityAllocated,
                      0
                    )
                  : null;

              return (
                <TableRow
                  selected={isSelected}
                  hover={!!variant}
                  onClick={onRowClick(variant.id)}
                  key={variant ? variant.id : "skeleton"}
                  className={classes.link}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(variant.id)}
                    />
                  </TableCell>
                  <TableCell className={classes.colName} data-tc="name">
                    {variant ? variant.name || variant.sku : <Skeleton />}
                  </TableCell>
                  <TableCell className={classes.colSku} data-tc="sku">
                    {variant ? variant.sku : <Skeleton />}
                  </TableCell>
                  <Hidden smDown>
                    <TableCell className={classes.colPrice} data-tc="price">
                      {variant ? (
                        variant.priceOverride ? (
                          <Money money={variant.priceOverride} />
                        ) : fallbackPrice ? (
                          <Money money={fallbackPrice} />
                        ) : (
                          <Skeleton />
                        )
                      ) : (
                        <Skeleton />
                      )}
                    </TableCell>
                  </Hidden>
                  <TableCell
                    className={classes.colInventory}
                    data-tc="inventory"
                  >
                    {numAvailable === null ? (
                      <Skeleton />
                    ) : (
                      getAvailabilityLabel(
                        intl,
                        stock,
                        variant,
                        numAvailable
                      )
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ResponsiveTable>
      )}
    </Card>
  );
};
ProductVariants.displayName = "ProductVariants";
export default ProductVariants;
