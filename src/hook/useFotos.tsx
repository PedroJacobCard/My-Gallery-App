import { useContext } from "react";
import { UseFotosContextType } from "../Context/FotosProvider";
import { FotosContext } from "../Context/FotosProvider";

const useFotos = (): UseFotosContextType => {
  return useContext(FotosContext)
}

export default useFotos