export const MAX_CHECKOUT_VARIANT_LINES = 10000;

export const STOREFRONT_URL = process.env.STOREFRONT_URL || "http://localhost:3000/";

export const SIGNUP_REDIRECT_URL = STOREFRONT_URL + "signup/confirm/";
export const RESET_PASSWORD_REDIRECT_URL = STOREFRONT_URL + "reset-password/";
export const CONFIRM_EMAIL_CHANGE_REDIRECT_URL = STOREFRONT_URL + "user/email-change-confirm/";

export const FAVORITES_STORAGE_KEY = "favoritesData";

export const IS_REQUIRED_TEXT = 'Обязательно для заполнения';