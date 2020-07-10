import { generatePageUrl } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 6;
export const SUPPORT_EMAIL = "support@example.com";

export const STATIC_PAGES = {
      about: {
        label: "О нас",
        url: generatePageUrl("about"),
      },
      returns: {
        label: "Возврат товара",
        url: generatePageUrl("returns"),
      }
    }
;

export const META_DEFAULTS = {
  custom: [],
  description:
    "СтройЛюксДрев - магазин строительных материалов.",
  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "СтройЛюксДрев",
  type: "website",
  url: window.location.origin,
};

export enum CheckoutStep {
  Address = 1,
  Shipping,
  Payment,
  Review,
}

export const CHECKOUT_STEPS = [
  {
    index: 0,
    link: "/checkout/address",
    name: "Адрес",
    nextActionName: "Continue to Shipping",
    nextStepLink: "/checkout/shipping",
    step: CheckoutStep.Address,
  },
  {
    index: 1,
    link: "/checkout/shipping",
    name: "Способ доставки",
    nextActionName: "Continue to Payment",
    nextStepLink: "/checkout/payment",
    step: CheckoutStep.Shipping,
  },
  {
    index: 2,
    link: "/checkout/payment",
    name: "Метод оплаты",
    nextActionName: "Continue to Review",
    nextStepLink: "/checkout/review",
    step: CheckoutStep.Payment,
  },
  {
    index: 3,
    link: "/checkout/review",
    name: "Заказ",
    nextActionName: "Place order",
    nextStepLink: "/order-finalized",
    step: CheckoutStep.Review,
  },
];