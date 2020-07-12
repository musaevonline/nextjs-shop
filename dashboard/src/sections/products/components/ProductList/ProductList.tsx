import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@temp/components/Checkbox";
import Money from "@temp/components/Money";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import StatusLabel from "@temp/components/StatusLabel";
import TableCellAvatar, {
  AVATAR_MARGIN
} from "@temp/components/TableCellAvatar";
import TableCellHeader from "@temp/components/TableCellHeader";
import TableHead from "@temp/components/TableHead";
import TablePagination from "@temp/components/TablePagination";
import { ProductListColumns } from "@temp/config";
import { maybe, renderCollection } from "@temp/misc";
import {
  getAttributeIdFromColumnValue,
  isAttributeColumnValue
} from "@temp/sections/products/components/ProductListPage/utils";
import { ProductList_products_edges_node } from "@temp/sections/products/types/ProductList";
import { ProductListUrlSortField } from "@temp/sections/products/urls";
import { ListActions, ListProps, SortPage } from "@temp/types";
import TDisplayColumn, {
  DisplayColumnProps
} from "@temp/utils/columns/DisplayColumn";
import { getArrowDirection } from "@temp/utils/sort";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {GridAttributes_grid_edges_node} from "@temp/sections/products/types/GridAttributes";
import {commonMessages} from "@temp/intl";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: "auto"
      },
      colPrice: {
        width: 200
      },
      colPublished: {
        width: 200
      },
      colType: {
        width: 200
      }
    },
    colAttribute: {
      width: 150
    },
    colFill: {
      padding: 0,
      width: "100%"
    },
    colName: {
      "&$colNameFixed": {
        width: 250
      }
    },
    colNameFixed: {},
    colNameHeader: {
      marginLeft: AVATAR_MARGIN
    },
    colPrice: {
      textAlign: "right"
    },
    colPublished: {},
    colType: {},
    link: {
      cursor: "pointer"
    },
    table: {
      tableLayout: "fixed"
    },
    tableContainer: {
      overflowX: "auto"
    },
    textLeft: {
      textAlign: "left"
    },
    textRight: {
      textAlign: "right"
    }
  }),
  { name: "ProductList" }
);

const DisplayColumn = TDisplayColumn as React.FunctionComponent<
  DisplayColumnProps<ProductListColumns>
>;

interface ProductListProps
  extends ListProps<ProductListColumns>,
    ListActions,
    SortPage<ProductListUrlSortField> {
  activeAttributeSortId: string;
  gridAttributes: GridAttributes_grid_edges_node[];
  products: ProductList_products_edges_node[];
}

export const ProductList: React.FC<ProductListProps> = props => {
  const {
    activeAttributeSortId,
    settings,
    disabled,
    isChecked,
    gridAttributes,
    pageInfo,
    products,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const gridAttributesFromSettings = settings.columns.filter(
    isAttributeColumnValue
  );
  const numberOfColumns = 2 + settings.columns.length;

  return (
    <div className={classes.tableContainer}>
      <ResponsiveTable className={classes.table}>
        <colgroup>
          <col />
          <col className={classes.colName} />
          <DisplayColumn column="productType" displayColumns={settings.columns}>
            <col className={classes.colType} />
          </DisplayColumn>
          <DisplayColumn column="isPublished" displayColumns={settings.columns}>
            <col className={classes.colPublished} />
          </DisplayColumn>
          {gridAttributesFromSettings.map(gridAttribute => (
            <col className={classes.colAttribute} key={gridAttribute} />
          ))}
          <DisplayColumn column="price" displayColumns={settings.columns}>
            <col className={classes.colPrice} />
          </DisplayColumn>
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={products}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            arrowPosition="right"
            className={classNames(classes.colName, {
              [classes.colNameFixed]: settings.columns.length > 4
            })}
            direction={
              sort.sort === ProductListUrlSortField.name
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(ProductListUrlSortField.name)}
          >
            <span className={classes.colNameHeader}>
              <FormattedMessage {...commonMessages.productName} />
            </span>
          </TableCellHeader>
          <DisplayColumn column="productType" displayColumns={settings.columns}>
            <TableCellHeader
              className={classes.colType}
              direction={
                sort.sort === ProductListUrlSortField.productType
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              onClick={() => onSort(ProductListUrlSortField.productType)}
            >
              <FormattedMessage {...commonMessages.productType}/>
            </TableCellHeader>
          </DisplayColumn>
          <DisplayColumn column="isPublished" displayColumns={settings.columns}>
            <TableCellHeader
              className={classes.colPublished}
              direction={
                sort.sort === ProductListUrlSortField.status
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              onClick={() => onSort(ProductListUrlSortField.status)}
            >
              <FormattedMessage {...commonMessages.productStatus}/>
            </TableCellHeader>
          </DisplayColumn>
          {gridAttributesFromSettings.map(gridAttributeFromSettings => {
            const attributeId = getAttributeIdFromColumnValue(
              gridAttributeFromSettings
            );

            return (
              <TableCellHeader
                className={classes.colAttribute}
                direction={
                  sort.sort === ProductListUrlSortField.attribute &&
                  attributeId === activeAttributeSortId
                    ? getArrowDirection(sort.asc)
                    : undefined
                }
                onClick={() =>
                  onSort(ProductListUrlSortField.attribute, attributeId)
                }
                key={gridAttributeFromSettings}
              >
                {maybe<React.ReactNode>(
                  () =>
                    gridAttributes.find(
                      gridAttribute => attributeId === gridAttribute.id
                    ).name,
                  <Skeleton />
                )}
              </TableCellHeader>
            );
          })}
          <DisplayColumn column="price" displayColumns={settings.columns}>
            <TableCellHeader
              className={classes.colPrice}
              direction={
                sort.sort === ProductListUrlSortField.price
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              textAlign="right"
              onClick={() => onSort(ProductListUrlSortField.price)}
            >
              <FormattedMessage {...commonMessages.price}/>
            </TableCellHeader>
          </DisplayColumn>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={numberOfColumns}
              settings={settings}
              hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
              onNextPage={onNextPage}
              onUpdateListSettings={onUpdateListSettings}
              hasPreviousPage={
                pageInfo && !disabled ? pageInfo.hasPreviousPage : false
              }
              onPreviousPage={onPreviousPage}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            products,
            product => {
              const isSelected = product ? isChecked(product.id) : false;

              return (
                <TableRow
                  selected={isSelected}
                  hover={!!product}
                  key={product ? product.id : "skeleton"}
                  onClick={product && onRowClick(product.id)}
                  className={classes.link}
                  data-tc="id"
                  data-tc-id={maybe(() => product.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(product.id)}
                    />
                  </TableCell>
                  <TableCellAvatar
                    className={classes.colName}
                    thumbnail={maybe(() => product.thumbnail.url)}
                    data-tc="name"
                  >
                    {maybe<React.ReactNode>(() => product.name, <Skeleton />)}
                  </TableCellAvatar>
                  <DisplayColumn
                    column="productType"
                    displayColumns={settings.columns}
                  >
                    <TableCell
                      className={classes.colType}
                      data-tc="product-type"
                    >
                      {product && product.productType ? (
                        product.productType.name
                      ) : (
                        <Skeleton />
                      )}
                    </TableCell>
                  </DisplayColumn>
                  <DisplayColumn
                    column="isPublished"
                    displayColumns={settings.columns}
                  >
                    <TableCell
                      className={classes.colPublished}
                      data-tc="isPublished"
                      data-tc-is-published={maybe(() => product.isPublished)}
                    >
                      {product &&
                      maybe(() => product.isPublished !== undefined) ? (
                        <StatusLabel
                          label={
                            product.isPublished
                              ? intl.formatMessage(commonMessages.published)
                              : intl.formatMessage(commonMessages.notPublished)
                          }
                          status={product.isPublished ? "success" : "error"}
                        />
                      ) : (
                        <Skeleton />
                      )}
                    </TableCell>
                  </DisplayColumn>
                  {gridAttributesFromSettings.map(gridAttribute => (
                    <TableCell
                      className={classes.colAttribute}
                      key={gridAttribute}
                      data-tc="attribute"
                      data-tc-attribute={getAttributeIdFromColumnValue(
                        gridAttribute
                      )}
                    >
                      {maybe<React.ReactNode>(() => {
                        const attribute = product.attributes.find(
                          attribute =>
                            attribute.attribute.id ===
                            getAttributeIdFromColumnValue(gridAttribute)
                        );
                        if (attribute) {
                          return attribute.values
                            .map(value => value.name)
                            .join(", ");
                        }
                        return "-";
                      }, <Skeleton />)}
                    </TableCell>
                  ))}
                  <DisplayColumn
                    column="price"
                    displayColumns={settings.columns}
                  >
                    <TableCell className={classes.colPrice}>
                      {maybe(() => product.minimalVariantPrice) &&
                      maybe(() => product.minimalVariantPrice.amount) !== undefined &&
                      maybe(() => product.minimalVariantPrice.currency) !== undefined ? (
                        <Money money={product.minimalVariantPrice} />
                      ) : (
                        <Skeleton />
                      )}
                    </TableCell>
                  </DisplayColumn>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage {...commonMessages.noProductsFound}/>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
};
ProductList.displayName = "ProductList";
export default ProductList;
