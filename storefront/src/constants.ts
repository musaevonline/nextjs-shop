
export const apiUrl = process.env.API_URI || "/graphql/";
export const STOREFRONT_URL = process.env.STOREFRONT_URL || "http://localhost:3000/";
export const ssrMode = typeof window === "undefined";