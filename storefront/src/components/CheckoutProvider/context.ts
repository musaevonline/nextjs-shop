import * as React from "react";
import {Checkout} from "@sdk/fragments/types/Checkout";
import {ILocalCheckout, TCartLine} from "@temp/components/CheckoutProvider/index";
import {ProductVariants_productVariants} from "@sdk/queries/types/ProductVariants";
import {PaymentMethod} from "@sdk/fragments/types/PaymentMethod";
import {ApolloError} from "@apollo/client";

export interface FavoritesContextInterface {
    loading: boolean;
    errors: ApolloError[] | null;
    checkout: ILocalCheckout | null;
    authenticate(token: string): void;
    updateCheckout: (checkout: Checkout | null, email?: string | null) => void;
    resetCheckout: () => void;
    clearCheckout: () => void;
    findUserCheckout: () => void;
    addVariant: (variantData: TCartLine) => void,
    quantity: number,
    calculateCheckoutTotal(items:ProductVariants_productVariants): number,
    changeVariantQuantity(variantId: string, quantity: number): void
    deleteCartLine(variantId: string): void,
    getLastCompletedStep(): number,
    updateEmail(email: string): void,
    updatePaymentMethod(method: PaymentMethod): void,
}

export const defaultContext: FavoritesContextInterface = {
    authenticate: token => {},
    errors: null,
    loading: false,
    updateCheckout: () => {},
    resetCheckout: () => {},
    clearCheckout: () => {},
    findUserCheckout: () => {},
    addVariant: () => {},
    checkout: null,
    quantity: 0,
    calculateCheckoutTotal: items => 0,
    changeVariantQuantity: (id, quantity) => {},
    deleteCartLine: (id) => {},
    getLastCompletedStep: () => 0,
    updateEmail: (email) => {},
    updatePaymentMethod: (method) => {}
};

export const CheckoutContext = React.createContext<FavoritesContextInterface>(defaultContext);

CheckoutContext.displayName = "CheckoutContext";