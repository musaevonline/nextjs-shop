export const IS_DEV = process.env.NODE_ENV === 'development'
export const STOREFRONT_URL = IS_DEV ? 'http://localhost:3000' : '/'
export const apiUrl = `${process.env.PUBLIC_URL}/graphql/` || '/graphql/'
