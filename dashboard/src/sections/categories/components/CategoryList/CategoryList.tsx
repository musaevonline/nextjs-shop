import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@temp/components/Checkbox";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import TableCellHeader from "@temp/components/TableCellHeader";
import TableHead from "@temp/components/TableHead";
import TablePagination from "@temp/components/TablePagination";
import { maybe, renderCollection } from "@temp/misc";
import { ListActions, ListProps, SortPage } from "@temp/types";
import { getArrowDirection } from "@temp/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";
import {CategoryListUrlSortField} from "@temp/sections/categories/urls";
import {CategoryFragment} from "@temp/sections/categories/types/CategoryFragment";
import {commonMessages} from "@temp/intl";

const useStyles = makeStyles(
    theme => ({
        [theme.breakpoints.up("lg")]: {
            colName: {
                width: 900
            },
            colProducts: {
                width: 110
            },
            colSubcategories: {
                width: 140
            }
        },
        colName: {
            paddingLeft: 0
        },
        colProducts: {
            textAlign: "center"
        },
        colSubcategories: {
            textAlign: "center"
        },
        tableRow: {
            cursor: "pointer"
        }
    }),
    { name: "CategoryList" }
);

interface CategoryListProps
    extends ListProps,
        ListActions,
        SortPage<CategoryListUrlSortField> {
    categories?: CategoryFragment[];
    isRoot: boolean;
    onAdd?();
}

const numberOfColumns = 4;

const CategoryList: React.FC<CategoryListProps> = props => {
    const {
        categories,
        disabled,
        settings,
        sort,
        pageInfo,
        isChecked,
        isRoot,
        selected,
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

    return (
        <ResponsiveTable>
            <TableHead
                colSpan={numberOfColumns}
                selected={selected}
                disabled={disabled}
                items={categories}
                toggleAll={toggleAll}
                toolbar={toolbar}
            >
                <TableCellHeader
                    direction={
                        isRoot && sort.sort === CategoryListUrlSortField.name
                            ? getArrowDirection(sort.asc)
                            : undefined
                    }
                    arrowPosition="right"
                    className={classes.colName}
                    disableClick={!isRoot}
                    onClick={() => isRoot && onSort(CategoryListUrlSortField.name)}
                >
                    <FormattedMessage {...commonMessages.name} />
                </TableCellHeader>
                <TableCellHeader
                    direction={
                        isRoot && sort.sort === CategoryListUrlSortField.subcategory_count
                            ? getArrowDirection(sort.asc)
                            : undefined
                    }
                    className={classes.colSubcategories}
                    disableClick={!isRoot}
                    textAlign="center"
                    onClick={() =>
                        isRoot && onSort(CategoryListUrlSortField.subcategory_count)
                    }
                >
                    <FormattedMessage {...commonMessages.subcategories}
                    />
                </TableCellHeader>
                <TableCellHeader
                    direction={
                        isRoot && sort.sort === CategoryListUrlSortField.product_count
                            ? getArrowDirection(sort.asc)
                            : undefined
                    }
                    className={classes.colProducts}
                    textAlign="center"
                    disableClick={!isRoot}
                    onClick={() =>
                        isRoot && onSort(CategoryListUrlSortField.product_count)
                    }
                >
                    <FormattedMessage {...commonMessages.numberOfProducts} />
                </TableCellHeader>
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
                    categories,
                    category => {
                        const isSelected = category ? isChecked(category.id) : false;

                        return (
                            <TableRow
                                className={classes.tableRow}
                                hover={!!category}
                                onClick={category ? onRowClick(category.id) : undefined}
                                key={category ? category.id : "skeleton"}
                                selected={isSelected}
                                data-tc="id"
                                data-tc-id={maybe(() => category.id)}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isSelected}
                                        disabled={disabled}
                                        disableClickPropagation
                                        onChange={() => toggle(category.id)}
                                    />
                                </TableCell>
                                <TableCell className={classes.colName} data-tc="name">
                                    {category && category.name ? category.name : <Skeleton />}
                                </TableCell>
                                <TableCell className={classes.colSubcategories}>
                                    {category &&
                                    category.children &&
                                    category.children.totalCount !== undefined ? (
                                        category.children.totalCount
                                    ) : (
                                        <Skeleton />
                                    )}
                                </TableCell>
                                <TableCell className={classes.colProducts}>
                                    {category &&
                                    category.products &&
                                    category.products.totalCount !== undefined ? (
                                        category.products.totalCount
                                    ) : (
                                        <Skeleton />
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    },
                    () => (
                        <TableRow>
                            <TableCell colSpan={numberOfColumns}>
                                <FormattedMessage {...commonMessages.noFound} />
                            </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </ResponsiveTable>
    );
};

CategoryList.displayName = "CategoryList";
export default CategoryList;
