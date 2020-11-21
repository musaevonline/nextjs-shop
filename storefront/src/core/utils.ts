import { Base64 } from "js-base64";
import { each } from "lodash";
import { parse as parseQs } from "query-string";
import {MoneyRange} from "@sdk/fragments/types/MoneyRange";
import {OrderDirection, ProductOrderField} from "@temp/types/globalTypes";
import {useLocation} from "react-router";
import currencyFormatter from 'currency-formatter';
const BYN_CURRENCY = {
  "code": "UAH",
  "symbol": " р.",
  "thousandsSeparator": " ",
  "decimalSeparator": ",",
  "symbolOnLeft": false,
  "spaceBetweenAmountAndSymbol": false,
  "decimalDigits": 2
}

export const slugify = (text: string | number): string =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-"); // Replace multiple - with single -

export const getDBIdFromGraphqlId = (
    graphqlId: string,
    schema?: string
): number => {
  // This is temporary solution, we will use slugs in the future
  if (!graphqlId) return null;
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)/;
  const arr = regexp.exec(rawId);
  if (schema && schema !== arr![1]) {
    throw new Error("Schema is not correct");
  }
  return parseInt(arr![2], 10);
};

export const getGraphqlIdFromDBId = (id: string, schema: string): string =>
    // This is temporary solution, we will use slugs in the future
    Base64.encode(`${schema}:${id}`);

export const priceToString = (
    price: { amount: number; currency: string }
): string => {
  const { amount, currency } = price;
  return currencyFormatter.format(amount,
      currency === 'BYN' ? BYN_CURRENCY: {code: currency}
  );
};

export const generateProductUrl = (id: string, name: string) =>
    `/product/${slugify(name)}/${getDBIdFromGraphqlId(id, "Product")}/`;

export const generateCategoryUrl = (id: string, name: string) =>
    `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const generatePageUrl = (slug: string) => `/page/${slug}/`;


export const getValueOrEmpty = <T>(value: T): T | string =>
    value === undefined || value === null ? "" : value;

export const convertSortByFromString = (sortBy: string) => {
  if (!sortBy) {
    return null;
  }
  const direction = sortBy.startsWith("-")
      ? OrderDirection.DESC
      : OrderDirection.ASC;

  let field;
  switch (sortBy.replace(/^-/, "")) {
    case "name":
      field = ProductOrderField.NAME;
      break;

    case "published":
      field = ProductOrderField.PUBLISHED;
      break;

    case "updated_at":
      field = ProductOrderField.DATE;
      break;

    default:
      return null;
  }
  return { field, direction };
};

export const maybe = <T>(exp: () => T, d?: T) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

export const parseQueryString = (
    location: Location
): { [key: string]: string } => {
  const query = {
    ...parseQs((location as any).search.substr(1)),
  };
  each(query, (value, key) => {
    if (Array.isArray(value)) {
      query[key] = value[0];
    }
  });
  return query as { [key: string]: string };
};


// const getPriceCurrency = (currency: string | null):string => {
//   if (!currency){
//     return ''
//   }
//   return PRICE_CURRENCY[currency] || currency;
// };

export const showPriceRange = (priceRange: MoneyRange) =>{
  const isDifferentPrice = priceRange.start.amount !== priceRange.stop.amount;
  if (isDifferentPrice) {
    return `${priceToString(priceRange.start)} - ${priceToString(priceRange.stop)}`;
  }
  return `${priceToString(priceRange.start)}`;
};

export const dateToString = (stringDate: string): string =>{
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const date = new Date(stringDate);
  return date.toLocaleString("ru-Ru", options);
};

export const dateToShortString = (stringDate: string): string =>{
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(stringDate);
  return date.toLocaleString("ru-Ru", options);
};

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

export function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}