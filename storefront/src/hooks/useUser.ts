import { useContext } from "react";
import {UserContext} from "@temp/components/User/context";


function useUser() {
  const user = useContext(UserContext);
  return user;
}
export default useUser;