import { useContext } from "react";
import { UseNewFotosContextType } from "../Context/NewFotosProvider";
import { newFotosContext } from "../Context/NewFotosProvider";

const useNewFotos = (): UseNewFotosContextType => {
  return useContext(newFotosContext);
}

export default useNewFotos;