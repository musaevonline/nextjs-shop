import { useContext } from "react";

import { UserContext } from "../core/auth/";

function useUser() {
  const user = useContext(UserContext);
  return user;
}
export default useUser;