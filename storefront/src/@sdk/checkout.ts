import {ssrMode} from "@temp/constants";

export const CHECKOUT_EVENT = 'checkout';

export const checkoutTokenEvent = !ssrMode ? new Event("checkoutToken") : null;
export const checkoutEvent = !ssrMode ? new Event(CHECKOUT_EVENT) : null;

export function getCheckoutToken(): string | null {
  try {
    return localStorage.getItem("checkoutToken");
  } catch {
    return null;
  }
}

// export function setCheckoutToken(token: string) {
//   localStorage.setItem("checkoutToken", token);
//   dispatchEvent(checkoutTokenEvent);
// }
//
// export function clearCheckoutToken() {
//   localStorage.removeItem("checkoutToken");
//   dispatchEvent(checkoutTokenEvent);
// }

export const getCheckoutStorage = () =>{
  try {
    return JSON.parse(localStorage.getItem("data_checkout"));
  } catch {
    return null;
  }
};
export const setCheckoutStorage = (data) =>{
  localStorage.setItem("data_checkout", JSON.stringify(data));
  dispatchEvent(checkoutEvent);
};

export const clearCheckoutStorage = () =>{
  localStorage.removeItem("data_checkout");
  dispatchEvent(checkoutEvent);
};