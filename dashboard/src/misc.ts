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