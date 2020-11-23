import { Base64 } from "js-base64";
import slugify from "slugify";

export const slugifyStr = (text: string): string => {

  return slugify(text.replace(/&/g, "-and-"),
      {
        lower: true,
        remove: /[*+~.()'"!:@,ь?=№;%]/g
      })
}


export const getDBIdFromGraphqlId = (
    graphqlId: string,
    schema?: string
): number => {
  // This is temporary solution, we will use slugs in the future
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

