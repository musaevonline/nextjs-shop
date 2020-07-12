import {MutationResult} from "react-apollo";
import urlJoin from "url-join";
import {APP_MOUNT_URI} from "@temp/core/config";

export function hasErrors(errorList: UserError[] | null): boolean {
  return !(
    errorList === undefined ||
    errorList === null ||
    errorList.length === 0
  );
}

export function getMutationState(
  called: boolean,
  loading: boolean,
  ...errorList: UserError[][]
): ConfirmButtonTransitionState {
  if (loading) {
    return "loading";
  }
  if (called) {
    return errorList.map(hasErrors).reduce((acc, curr) => acc || curr, false)
      ? "error"
      : "success";
  }
  return "default";
}

export interface UserError {
  field: string | null;
  message?: string;
}
interface SaleorMutationResult {
  errors?: UserError[];
}
type ConfirmButtonTransitionState =
    | "loading"
    | "success"
    | "error"
    | "default";

export function getMutationStatus<
    TData extends Record<string, SaleorMutationResult | any>
    >(opts: MutationResult<TData>): ConfirmButtonTransitionState {
  const errors = opts.data
      ? Object.values(opts.data).reduce(
          (acc: UserError[], mut) => [...acc, ...maybe(() => mut.errors, [])],
          []
      )
      : [];

  return getMutationState(opts.called, opts.loading, errors);
}

export function maybe<T>(exp: () => T): T | undefined;
export function maybe<T>(exp: () => T, d: T): T;
export function maybe(exp: any, d?: any) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  { [K in Keys]-?: Required<Pick<T, K>> }[Keys];

export function createHref(url: string) {
  return urlJoin(APP_MOUNT_URI, url);
}
export function findValueInEnum<TEnum extends object>(
  needle: string,
  haystack: TEnum
): TEnum[keyof TEnum] {
  const match = Object.entries(haystack).find(([_, value]) => value === needle);

  if (!match) {
    throw new Error(`Value ${needle} not found in enum`);
  }

  return (needle as unknown) as TEnum[keyof TEnum];
}

export function parseBoolean(a: string, defaultValue: boolean): boolean {
  if (a === undefined) {
    return defaultValue;
  }
  return a === "true";
}

export function renderCollection<T>(
  collection: T[],
  renderItem: (
    item: T | undefined,
    index: number | undefined,
    collection: T[]
  ) => any,
  renderEmpty?: (collection: T[]) => any
) {
  if (collection === undefined) {
    return renderItem(undefined, undefined, collection);
  }
  if (collection.length === 0) {
    return !!renderEmpty ? renderEmpty(collection) : null;
  }
  return collection.map(renderItem);
}