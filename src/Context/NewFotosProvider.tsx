import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { FotosType } from "./FotosProvider";
import { FotosContext } from "./FotosProvider";

const initState: FotosType[] = [];

export type UseNewFotosContextType = {
  newFotos: FotosType[];
  setNewFotos: React.Dispatch<React.SetStateAction<FotosType[]>>;
  resetNewFotos: () => void;
};

const initContextState: UseNewFotosContextType = { 
  newFotos: [], 
  setNewFotos: () => {}, 
  resetNewFotos: () => {}
};

// eslint-disable-next-line react-refresh/only-export-components
export const newFotosContext = createContext<UseNewFotosContextType>(initContextState);

type ChildrenProps = {
  children: ReactNode;
}

const NewFotosProvider = ({ children }: ChildrenProps) => {
  const {fotos} = useContext(FotosContext);
  const [newFotos, setNewFotos] = useState<FotosType[]>(initState);

  
  useEffect(() => {
    setNewFotos(fotos);
  }, [fotos])

  const resetNewFotos = () => {
    setNewFotos(fotos);
  }

  return (
    <newFotosContext.Provider value={{ newFotos, setNewFotos, resetNewFotos }}>
      { children }
    </newFotosContext.Provider>
  )
}

export default NewFotosProvider;