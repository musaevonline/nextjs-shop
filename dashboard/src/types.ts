import { MutationResult } from "react-apollo";
import {ConfirmButtonTransitionState} from "@temp/components/ConfirmButton";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export interface Node {
  id: string;
}
export interface ListSettings<TColumn extends string = string> {
  columns?: TColumn[];
  rowNumber: number;
}

export enum ListViews {
  ATTRIBUTE_LIST = "ATTRIBUTE_LIST",
  CATEGORY_LIST = "CATEGORY_LIST",
  COLLECTION_LIST = "COLLECTION_LIST",
  CUSTOMER_LIST = "CUSTOMER_LIST",
  DRAFT_LIST = "DRAFT_LIST",
  NAVIGATION_LIST = "NAVIGATION_LIST",
  ORDER_LIST = "ORDER_LIST",
  PAGES_LIST = "PAGES_LIST",
  PLUGINS_LIST = "PLUGIN_LIST",
  PRODUCT_LIST = "PRODUCT_LIST",
  PERMISSION_GROUP_LIST = "PERMISSION_GROUP_LIST",
  PRODUCT_TYPE_LIST = "PRODUCT_TYPE_LIST",
  SALES_LIST = "SALES_LIST",
  SHIPPING_METHODS_LIST = "SHIPPING_METHODS_LIST",
  STAFF_MEMBERS_LIST = "STAFF_MEMBERS_LIST",
  VOUCHER_LIST = "VOUCHER_LIST",
  WAREHOUSE_LIST = "WAREHOUSE_LIST",
  WEBHOOK_LIST = "WEBHOOK_LIST"
}

export type Pagination = Partial<{
  after: string;
  before: string;
}>;

export interface ListActionsWithoutToolbar {
  toggle: (id: string) => void;
  toggleAll: (items: React.ReactNodeArray, selected: number) => void;
  isChecked: (id: string) => boolean;
  selected: number;
}

export interface ListActions extends ListActionsWithoutToolbar {
  toolbar: React.ReactNode | React.ReactNodeArray;
}

export interface ListProps<TColumns extends string = string> {
  disabled: boolean;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  settings?: ListSettings<TColumns>;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onRowClick: (id: string) => () => void;
  onUpdateListSettings?: (
    key: keyof ListSettings<TColumns>,
    value: any
  ) => void;
  onListSettingsReset?: () => void;
}

export type Sort<TSort extends string = string> = Partial<{
  asc: boolean;
  sort: TSort;
}>;

export interface SortPage<TSortKey extends string> {
  sort: Sort<TSortKey>;
  onSort: (field: TSortKey, id?: string) => void;
}

export type BulkAction = Partial<{
  ids: string[];
}>;

export type Dialog<TDialog extends string> = Partial<{
  action: TDialog;
}>;

export type SingleAction = Partial<{
  id: string;
}>;

export type TabActionDialog = "save-search" | "delete-search";

export interface MutationResultAdditionalProps {
  status: ConfirmButtonTransitionState;
}

export type Filters<TFilters extends string> = Partial<
  Record<TFilters, string>
>;

export type ActiveTab<TTab extends string = string> = Partial<{
  activeTab: TTab;
}>;

export type TabListActions<
  TToolbars extends string
> = ListActionsWithoutToolbar &
  Record<TToolbars, React.ReactNode | React.ReactNodeArray>;

export interface PageListProps<TColumns extends string = string>
  extends ListProps<TColumns> {
  defaultSettings?: ListSettings<TColumns>;
  onAdd: () => void;
}
export interface FetchMoreProps {
  loading: boolean;
  hasMore: boolean;
  onFetchMore: () => void;
}

export interface UserError {
  field: string | null;
  message?: string;
}

export interface ReorderEvent {
  oldIndex: number;
  newIndex: number;
}
export type ReorderAction = (event: ReorderEvent) => void;

export interface PartialMutationProviderOutput<
  TData extends {} = {},
  TVariables extends {} = {}
> {
  opts: MutationResult<TData> & MutationResultAdditionalProps;
  mutate: (variables: TVariables) => void;
}