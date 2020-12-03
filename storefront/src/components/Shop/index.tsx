import React from "react";
import {useQuery} from "@apollo/client";
import {shopQuery} from "@sdk/queries/shop";
import {ShopInfo, ShopInfo_shop} from "@sdk/queries/types/ShopInfo";

type ShopContext = ShopInfo_shop;

export const ShopContext = React.createContext<ShopContext>(undefined);

export const ShopProvider: React.FC = ({ children }) => {
  const {data} = useQuery<ShopInfo>(shopQuery, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  return (
      <>
        <ShopContext.Provider value={data ? data.shop : undefined}>
          {children}
        </ShopContext.Provider>
      </>
  );
}
export const Shop = ShopContext.Consumer;
export default Shop;
