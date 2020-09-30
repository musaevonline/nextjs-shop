import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@temp/components/Checkbox";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import StatusLabel from "@temp/components/StatusLabel";
import TableCellHeader from "@temp/components/TableCellHeader";
import TableHead from "@temp/components/TableHead";
import TablePagination from "@temp/components/TablePagination";
import { maybe, renderCollection } from "@temp/misc";
import { PageListUrlSortField } from "@temp/sections/pages/urls";
import { ListActions, ListProps, SortPage } from "@temp/types";
import { getArrowDirection } from "@temp/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { PageList_pages_edges_node } from "../../types/PageList";

export interface PageListProps
    extends ListProps,
        ListActions,
        SortPage<PageListUrlSortField> {
  pages: PageList_pages_edges_node[];
}

const useStyles = makeStyles(
    theme => ({
      [theme.breakpoints.up("lg")]: {
        colSlug: {
          width: 250
        },
        colTitle: {},
        colVisibility: {
          width: 200
        }
      },
      colSlug: {},
      colTitle: {
        paddingLeft: 0
      },
      colVisibility: {},
      link: {
        cursor: "pointer"
      }
    }),
    { name: "PageList" }
);

const numberOfColumns = 4;

const PageList: React.FC<PageListProps> = props => {
  const {
    settings,
    pages,
    disabled,
    onNextPage,
    pageInfo,
    onRowClick,
    onSort,
    onUpdateListSettings,
    onPreviousPage,
    isChecked,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
      <Card>
        <ResponsiveTable>
          <TableHead
              colSpan={numberOfColumns}
              selected={selected}
              disabled={disabled}
              items={pages}
              toggleAll={toggleAll}
              toolbar={toolbar}
          >
            <TableCellHeader
                direction={
                  sort.sort === PageListUrlSortField.title
                      ? getArrowDirection(sort.asc)
                      : undefined
                }
                arrowPosition="right"
                onClick={() => onSort(PageListUrlSortField.title)}
                className={classes.colTitle}
            >
              <FormattedMessage
                  id="title"
                  defaultMessage="Title"
                  description="dialog header"
              />
            </TableCellHeader>
            <TableCellHeader
                direction={
                  sort.sort === PageListUrlSortField.slug
                      ? getArrowDirection(sort.asc)
                      : undefined
                }
                arrowPosition="right"
                onClick={() => onSort(PageListUrlSortField.slug)}
                className={classes.colSlug}
            >
              <FormattedMessage
                  id="slug"
                  defaultMessage="Slug"
                  description="page internal name"
              />
            </TableCellHeader>
            <TableCellHeader
                direction={
                  sort.sort === PageListUrlSortField.visible
                      ? getArrowDirection(sort.asc)
                      : undefined
                }
                arrowPosition="right"
                onClick={() => onSort(PageListUrlSortField.visible)}
                className={classes.colVisibility}
            >
              <FormattedMessage
                  id="visibility"
                  defaultMessage="Visibility"
                  description="page status"
              />
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
                pages,
                page => {
                  const isSelected = page ? isChecked(page.id) : false;

                  return (
                      <TableRow
                          hover={!!page}
                          className={!!page ? classes.link : undefined}
                          onClick={page ? onRowClick(page.id) : undefined}
                          key={page ? page.id : "skeleton"}
                          selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                              checked={isSelected}
                              disabled={disabled}
                              disableClickPropagation
                              onChange={() => toggle(page.id)}
                          />
                        </TableCell>
                        <TableCellHeader className={classes.colTitle}>
                          {maybe<React.ReactNode>(() => page.title, <Skeleton />)}
                        </TableCellHeader>
                        <TableCellHeader className={classes.colSlug}>
                          {maybe<React.ReactNode>(() => page.slug, <Skeleton />)}
                        </TableCellHeader>
                        <TableCellHeader className={classes.colVisibility}>
                          {maybe<React.ReactNode>(
                              () => (
                                  <StatusLabel
                                      label={
                                        page.isPublished
                                            ? intl.formatMessage({
                                              id: "published",
                                              defaultMessage: "Published",
                                              description: "page status"
                                            })
                                            : intl.formatMessage({
                                              id: "not_published",
                                              defaultMessage: "Not Published",
                                              description: "page status"
                                            })
                                      }
                                      status={page.isPublished ? "success" : "error"}
                                  />
                              ),
                              <Skeleton />
                          )}
                        </TableCellHeader>
                      </TableRow>
                  );
                },
                () => (
                    <TableRow>
                      <TableCell colSpan={numberOfColumns}>
                        <FormattedMessage id="no_pages_found" defaultMessage="No pages found" />
                      </TableCell>
                    </TableRow>
                )
            )}
          </TableBody>
        </ResponsiveTable>
      </Card>
  );
};
PageList.displayName = "PageList";
export default PageList;
