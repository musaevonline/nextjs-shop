import { ShopContext } from "@temp/components/Shop";
import { useContext } from "react";

function useShop() {
  return useContext(ShopContext);
}
export default useShop;
