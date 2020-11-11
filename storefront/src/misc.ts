
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
    > &
    { [K in Keys]-?: Required<Pick<T, K>> }[Keys];

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

export function removeTags(str: string | null): string {
  if (!str)
    return '';
  return str.replace( /(<([^>]+)>)/ig, '');
}