import { MutationFunction, MutationResult } from "@apollo/client";
import urlJoin from "url-join";
import {APP_MOUNT_URI} from "@temp/core/config";
import {MutationResultAdditionalProps, PartialMutationProviderOutput} from "@temp/types";
import {StaffMemberDetails_user} from "@temp/sections/staff/types/StaffMemberDetails";
import {User} from "@sdk/fragments/types/User";
import {StaffList_staffUsers_edges_node} from "@temp/sections/staff/types/StaffList";
import {
  AddressInput,
  AuthorizationKeyType,
  CountryCode,
  OrderStatus,
  PaymentChargeStatusEnum
} from "@temp/types/globalTypes";
import {AddressType, AddressTypeInput} from "@temp/sections/customers/types";
import {CustomerDetails_user} from "@temp/sections/customers/types/CustomerDetails";
import {ListCustomers_customers_edges_node} from "@temp/sections/customers/types/ListCustomers";
import {defineMessages, IntlShape} from "react-intl";


export const authorizationKeyTypes = {
  [AuthorizationKeyType.FACEBOOK]: "Facebook",
  [AuthorizationKeyType.GOOGLE_OAUTH2]: "Google OAuth2"
};

export function hasErrors(errorList: UserError[] | null): boolean {
  return !(
      errorList === undefined ||
      errorList === null ||
      errorList.length === 0
  );
}
export function findInEnum<TEnum extends object>(
    needle: string,
    haystack: TEnum
) {
  const match = Object.keys(haystack).find(key => key === needle);
  if (!!match) {
    return haystack[needle as keyof TEnum];
  }

  throw new Error(`Key ${needle} not found in enum`);
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

export function decimal(value: string | number) {
  if (typeof value === "string") {
    return value === "" ? null : value;
  }
  return value;
}

export function getMutationProviderData<TData, TVariables>(
    mutateFn: MutationFunction<TData, TVariables>,
    opts: MutationResult<TData> & MutationResultAdditionalProps
): PartialMutationProviderOutput<TData, TVariables> {
  return {
    mutate: variables => mutateFn({ variables }),
    opts
  };
}
interface AnyEvent {
  stopPropagation: () => void;
}

export function stopPropagation(cb: () => void) {
  return (event: AnyEvent) => {
    event.stopPropagation();
    cb();
  };
}

export function getStringOrPlaceholder(s: string | undefined): string {
  return s || "...";
}

export function getUserName(user?: StaffMemberDetails_user |
    StaffList_staffUsers_edges_node |
    CustomerDetails_user |
    ListCustomers_customers_edges_node, returnEmail?: boolean) {
  return user && (user.email || (user.firstName && user.lastName))
      ? user.firstName && user.lastName
          ? [user.firstName, user.lastName].join(" ")
          : returnEmail
              ? user.email
              : user.email.split("@")[0]
      : undefined;
}

export function getUserInitials(user?: StaffMemberDetails_user | User | StaffList_staffUsers_edges_node) {
  return user && (user.email || (user.firstName && user.lastName))
      ? (user.firstName && user.lastName
              ? user.firstName[0] + user.lastName[0]
              : user.email.slice(0, 2)
      ).toUpperCase()
      : undefined;
}

export function capitalize(s: string) {
  return s.charAt(0).toLocaleUpperCase() + s.slice(1);
}

export function transformFormToAddress<T>(
    address: T & AddressTypeInput
): T & AddressInput {
  return {
    ...address,
    country: findInEnum(address.country, CountryCode)
  };
}

const paymentStatusMessages = defineMessages({
  paid: {
    id: "fully_paid",
    defaultMessage: "Fully paid",
    description: "payment status"
  },
  partiallyPaid: {
    id: "partially_paid",
    defaultMessage: "Partially paid",
    description: "payment status"
  },
  partiallyRefunded: {
    id: "partially_refunded",
    defaultMessage: "Partially refunded",
    description: "payment status"
  },
  refunded: {
    id: "fully_refunded",
    defaultMessage: "Fully refunded",
    description: "payment status"
  },
  unpaid: {
    id: "unpaid",
    defaultMessage: "Unpaid",
    description: "payment status"
  }
});

export const transformPaymentStatus = (status: string, intl: IntlShape) => {
  switch (status) {
    case PaymentChargeStatusEnum.PARTIALLY_CHARGED:
      return {
        localized: intl.formatMessage(paymentStatusMessages.partiallyPaid),
        status: "error"
      };
    case PaymentChargeStatusEnum.FULLY_CHARGED:
      return {
        localized: intl.formatMessage(paymentStatusMessages.paid),
        status: "success"
      };
    case PaymentChargeStatusEnum.PARTIALLY_REFUNDED:
      return {
        localized: intl.formatMessage(paymentStatusMessages.partiallyRefunded),
        status: "error"
      };
    case PaymentChargeStatusEnum.FULLY_REFUNDED:
      return {
        localized: intl.formatMessage(paymentStatusMessages.refunded),
        status: "success"
      };
    default:
      return {
        localized: intl.formatMessage(paymentStatusMessages.unpaid),
        status: "error"
      };
  }
};

export const orderStatusMessages = defineMessages({
  cancelled: {
    id: "cancelled",
    defaultMessage: "Cancelled",
    description: "order status"
  },
  draft: {
    id: "draft",
    defaultMessage: "Draft",
    description: "order status"
  },
  fulfilled: {
    id: "fulfilled",
    defaultMessage: "Fulfilled",
    description: "order status"
  },
  partiallyFulfilled: {
    id: "partially_fulfilled",
    defaultMessage: "Partially fulfilled",
    description: "order status"
  },
  readyToCapture: {
    id: "ready_to_capture",
    defaultMessage: "Ready to capture",
    description: "order status"
  },
  readyToFulfill: {
    id: "ready_to_fulfill",
    defaultMessage: "Ready to fulfill",
    description: "order status"
  },
  unfulfilled: {
    id: "unfulfilled",
    defaultMessage: "Unfulfilled",
    description: "order status"
  }
});

export const transformOrderStatus = (status: string, intl: IntlShape) => {
  switch (status) {
    case OrderStatus.FULFILLED:
      return {
        localized: intl.formatMessage(orderStatusMessages.fulfilled),
        status: "success"
      };
    case OrderStatus.PARTIALLY_FULFILLED:
      return {
        localized: intl.formatMessage(orderStatusMessages.partiallyFulfilled),
        status: "neutral"
      };
    case OrderStatus.UNFULFILLED:
      return {
        localized: intl.formatMessage(orderStatusMessages.unfulfilled),
        status: "error"
      };
    case OrderStatus.CANCELED:
      return {
        localized: intl.formatMessage(orderStatusMessages.cancelled),
        status: "error"
      };
    case OrderStatus.DRAFT:
      return {
        localized: intl.formatMessage(orderStatusMessages.draft),
        status: "error"
      };
  }
  return {
    localized: status,
    status: "error"
  };
};


export const transformAddressToForm = (data: AddressType) => ({
  city: maybe(() => data.city, ""),
  cityArea: maybe(() => data.cityArea, ""),
  companyName: maybe(() => data.companyName, ""),
  country: maybe(() => data.country.code, ""),
  countryArea: maybe(() => data.countryArea, ""),
  firstName: maybe(() => data.firstName, ""),
  lastName: maybe(() => data.lastName, ""),
  phone: maybe(() => data.phone, ""),
  postalCode: maybe(() => data.postalCode, ""),
  streetAddress1: maybe(() => data.streetAddress1, ""),
  streetAddress2: maybe(() => data.streetAddress2, "")
});