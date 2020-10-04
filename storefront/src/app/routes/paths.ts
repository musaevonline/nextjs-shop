// const slugUrl = ":slug([a-z-0-9]+)/:id([0-9]+)/";
import {getDBIdFromGraphqlId} from "@temp/core/utils";

export const baseUrl = "/";
export const searchUrl = `${baseUrl}search/`;
export const callBackModalUrl = `${baseUrl}callBackModal/`;
export const accountLoginUrl = `${baseUrl}login/`;
export const cartUrl = `${baseUrl}cart/`;
export const productDetailsUrl = `${baseUrl}product/:slug/:pk/`;
export const checkoutUrl = `${baseUrl}checkout/`;
export const orderCreated = `${baseUrl}order/created/:token/`;
export const categoryUrl = `${baseUrl}category/:slug/:pk/`;
export const orderPath = `${baseUrl}orders/:token/`;
export const ordersUrl = `${baseUrl}orders/`;

// AUTH //

export const signUpConfirmUrl = `${baseUrl}signup/confirm/`;
export const resetPasswordUrl = `${baseUrl}reset-password/`;

// USER //
export const userPath = `${baseUrl}user/`;
export const userProfileAddressesUrl = `${baseUrl}user/addresses/`;
export const userProfileSettingsUrl = `${baseUrl}user/settings/`;
export const userProfileFavoritesUrl = `${baseUrl}favorites/`;
export const userProfileOrdersUrl = `${baseUrl}user/orders/`;
export const userProfileReviewsUrl = `${baseUrl}user/reviews/`;
export const userProfileEmailChangeConfirmUrl = `${baseUrl}user/email-change-confirm/`;

// BLOG //
export const blogPath = `${baseUrl}blog/`;
export const blogCategoryPath = `${blogPath}:categorySlug/`;
export const blogArticlePath = `${blogCategoryPath}:articleSlug/`;

// PAGE //

export const pagePath = `${baseUrl}page/:slug/`;

// GET URL //
export const getCategoryUrl = (slug: string, id: string) =>{
    const pk = getDBIdFromGraphqlId(id, 'Category');
    return `${baseUrl}category/${slug}/${pk}/`
};
export const getProductUrl = (slug: string, id: string) =>{
    const pk = getDBIdFromGraphqlId(id, 'Product');
    return `${baseUrl}product/${slug}/${pk}/`
};

export const getOrderCreatedUrl = (token: string) => {
    return `${baseUrl}order/created/${token}/`;
};

export const getBlogCategoryUrl = (blogCategorySlug: string) => `${blogPath}${blogCategorySlug}/`;
export const getBlogArticleUrl = (blogCategorySlug: string, articleSlug: string) => `${blogPath}${blogCategorySlug}/${articleSlug}/`;

export const getPageUrl = (slug) => `${baseUrl}page/${slug}/`;

export const getOrderUrl = (token: string): string => {
    return `${baseUrl}orders/${token}/`;
}