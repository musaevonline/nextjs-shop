
import * as React from "react";
import {CheckoutContext, FavoritesContextInterface} from "./context";
import {Address} from "@sdk/fragments/types/Address";
import {ShippingMethod} from "@sdk/fragments/types/ShippingMethod";
import {PaymentMethod} from "@sdk/fragments/types/PaymentMethod";
import {useEffect, useState} from "react";
import {ApolloError} from "@apollo/client";
import {Checkout} from "@sdk/fragments/types/Checkout";
import {CheckoutLine} from "@sdk/fragments/types/CheckoutLine";
import {useApolloClient} from "@apollo/client";
import {CheckoutVariables} from "@sdk/queries/types/Checkout";
import {checkoutQuery} from "@sdk/queries/checkout";
import {meCheckout} from "@sdk/react/queries";
import {MeCheckout} from "@sdk/react/types/MeCheckout";
import _ from "lodash";
import {MAX_CHECKOUT_VARIANT_LINES} from "@temp/core/constants";
import useLocalStorage from "@temp/hooks/useLocalStorage";
import {
  checkoutLineDeleteMutation,
  checkoutLinesAddMutation,
  checkoutLinesUpdateMutation
} from "@sdk/mutations/checkout";
import {CheckoutLinesUpdate, CheckoutLinesUpdateVariables} from "@sdk/mutations/types/CheckoutLinesUpdate";
import {CheckoutLinesAdd, CheckoutLinesAddVariables} from "@sdk/mutations/types/CheckoutLinesAdd";
import {CheckoutLineInput} from "@temp/types/globalTypes";
import {ProductVariants_productVariants} from "@sdk/queries/types/ProductVariants";
import {CheckoutLineDelete, CheckoutLineDeleteVariables} from "@sdk/mutations/types/CheckoutLineDelete";

export const CHECKOUT_LOCALSTORAGE_KEY = 'checkoutData';

const initialData = {
  id: null,
  token: null,
  cart: [],
  lines: [],
  address: null,
  shippingMethod: null,
  paymentMethod: null,
  email: '',
};

export type TCartLine = {
  variant: string,
  quantity: number
}

export interface ILocalCheckout {
  id: string | null,
  token: string | null,
  cart: TCartLine[],
  lines: CheckoutLine[] | [],
  address: Address | null,
  shippingMethod: ShippingMethod | null,
  paymentMethod: PaymentMethod | null,
  email: string
}

const CheckoutProvider: React.FC<{
  children: React.FC<{
    checkoutContext: FavoritesContextInterface
  }>
}> = ({ children }) => {
  const client = useApolloClient();

  const [checkout, setCheckout] = useLocalStorage<ILocalCheckout>(CHECKOUT_LOCALSTORAGE_KEY, initialData);
  const [errors, setErrors] = useState<ApolloError[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(_.sumBy(checkout.cart, line => line.quantity));

  // useEffect(() => {
  //   console.log('effect checkout token');
  //   if (checkout.token){
  //     authenticate(checkout.token);
  //   }
  // }, [checkout.token]);

  useEffect(() => {
    const quantity = _.sumBy(checkout.cart, line => line.quantity);
    setQuantity(quantity);
  }, [checkout.cart]);

  const authenticate = (token: string):void => {
    setLoading(true);
    client.query<Checkout, CheckoutVariables>({
      query: checkoutQuery,
      variables: {token: token}
    })
        .then(res => {
          const errors = res.errors;
          if (!errors?.length) updateCheckout(res.data);
          else resetCheckout();
        })
        .catch(err => {
          console.error('checkout authenticate by token',err);
          setErrors(err);
          resetCheckout();
        })
        .finally(() => setLoading(false))
  };

  const updateCheckout = (values:Checkout, email?: string | null) => {
    const data:ILocalCheckout = {
      id: values.id,
      token: values.token,
      address: values.shippingAddress,
      email: email || values.email,
      shippingMethod: values.shippingMethod,
      paymentMethod: checkout.paymentMethod,
      lines: values.lines,
      cart: values.lines.map(line => ({variant: line.variant.id, quantity: line.quantity})),
    };
    setCheckout(data);
  };

  const resetCheckout = () => {
    setCheckout({
      ...initialData,
      cart: checkout.cart
    });
  };
  const clearCheckout = () => {
    setCheckout({...initialData});
  };

  const findUserCheckout = async () => {
    setLoading(true);
    try {
      const res = await client.query<MeCheckout>({
        query: meCheckout
      });
      const checkout = res.data.me.checkout;
      if (checkout) updateCheckout(checkout);
    }catch ({message}) {
      setErrors(message);
    }
    setLoading(false);
  };
  const calculateCheckoutTotal = (items: ProductVariants_productVariants): number => {
    let amount = 0;
    items?.edges.forEach(edge => {
      const localLine = checkout.cart.find(el => el.variant === edge.node.id);
      if (!localLine) return null;
      const node = edge.node;
      amount += node.price.amount * localLine.quantity;
    });
    return amount;
  };
  const getLastCompletedStep = (): number =>{
    let step = 0;
    if (checkout.address){
      step += 1;
    }
    if (checkout.shippingMethod){
      step += 1;
    }
    if (checkout.paymentMethod){
      step += 1;
    }
    return step;
  };

  /* ACTIONS */
  const addVariant = async (variantData:TCartLine) =>{
    const variant = checkout.cart.find(el => el.variant === variantData.variant);
    if (variant){
      await changeVariantQuantity(variantData.variant, variant.quantity + variantData.quantity);
    }else{
      if (checkout.id){
        const lines = [{quantity: variantData.quantity, variantId: variantData.variant}];
        await submitAddCheckoutLines(lines);
      }else{
        setCheckout({...checkout, cart: [...checkout.cart, variantData]});
      }
    }
  };
  const changeVariantQuantity = async (variantId: string, quantity: number) => {
    if (quantity > 0) {
      const newCart = [...checkout.cart];
      const line = newCart.find(el => el.variant === variantId);
      const deltaQuantity = quantity - line.quantity;
      line.quantity = _.min([line.quantity + deltaQuantity, MAX_CHECKOUT_VARIANT_LINES]);
      if (checkout.id) {
        await submitUpdateCheckoutLines(newCart);
      }else{
        const newData = {...checkout, cart: newCart};
        setCheckout(newData);
      }
    }
  };
  const deleteCartLine = async (variantId: string) =>{
    if (checkout.id){
      await submitDeleteCheckoutLine(variantId);
    }else{
      const newLines = _.filter(checkout.cart, line => line.variant !== variantId);
      setCheckout({...checkout, cart: newLines});
    }
  };
  const updateEmail = (email: string) => {
    setCheckout({...checkout, email});
  };
  const updatePaymentMethod = (method: PaymentMethod) => {
    setCheckout({...checkout, paymentMethod:method});
  };

  /* GRAPHQL MUTATIONS */
  const submitUpdateCheckoutLines = async (newCart:TCartLine[]) => {
    try {
      const lines = newCart.map(line => ({quantity: line.quantity, variantId: line.variant}));
      const res = await client.mutate<CheckoutLinesUpdate, CheckoutLinesUpdateVariables>({
        mutation: checkoutLinesUpdateMutation,
        variables: {
          checkoutId: checkout.id,
          lines
        }
      });
      const errors = res.data.checkoutLinesUpdate.checkoutErrors;
      if (!errors.length){
        updateCheckout(res.data.checkoutLinesUpdate.checkout);
      }
    }catch (e) {
      setErrors(e.message);
    }
  };
  const submitAddCheckoutLines = async (lines:CheckoutLineInput[]) => {
    try {
      const res = await client.mutate<CheckoutLinesAdd, CheckoutLinesAddVariables>({
        mutation: checkoutLinesAddMutation,
        variables: {
          checkoutId: checkout.id,
          lines
        }
      });
      const errors = res.data.checkoutLinesAdd.checkoutErrors;
      if (!errors.length){
        updateCheckout(res.data.checkoutLinesAdd.checkout);
      }
    }catch (e) {
      setErrors(e.message);
    }
  };
  const submitDeleteCheckoutLine = async (variantId: string) => {
    try {
      const res = await client.mutate<CheckoutLineDelete, CheckoutLineDeleteVariables>({
        mutation: checkoutLineDeleteMutation,
        variables: {
          checkoutId: checkout.id,
          variantId
        }
      });
      const errors = res.data.checkoutLineDelete.checkoutErrors;
      if (!errors.length){
        updateCheckout(res.data.checkoutLineDelete.checkout);
      }
    }catch (e) {
      setErrors(e.message);
    }
  };


  const context:FavoritesContextInterface = {
    checkout,
    errors,
    loading,
    authenticate,
    updateCheckout,
    resetCheckout,
    clearCheckout,
    findUserCheckout,
    addVariant,
    changeVariantQuantity,
    deleteCartLine,
    updateEmail,
    updatePaymentMethod,
    quantity,
    calculateCheckoutTotal,
    getLastCompletedStep
  };

  return (
      <CheckoutContext.Provider value={context}>
        {children({checkoutContext: context})}
      </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;