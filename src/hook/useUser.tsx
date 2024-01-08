import { useContext } from "react";
import { UseUserContextType, UserContext } from "../Context/UserProvider";

function useUser(): UseUserContextType {
  return useContext(UserContext);
}

export default useUser;