import { ReactNode, createContext, useEffect, useState } from "react"
import { api, createFoto, deleteFoto, getFotos, updateFoto } from "../services/api";
import useUser from "../hook/useUser";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { FieldValuesUpdateFoto } from "../pages/Gallery/ValidationSchemaUpdateFoto";

export type FotosType = {
  id: string,
  title: string,
  category: string,
  image_url: string,
  userId: string,
}

const initState: FotosType[] = [];

export type UseFotosContextType = {
  fotos: FotosType[];
  handleCreateFoto: (data: Omit<FotosType, "id">) => void;
  handleUpdateFoto: (fotoId: string, data: FieldValuesUpdateFoto) => void;
  handleDeleteFoto: (fotoId: string) => void;
};

const initContextState: UseFotosContextType = {
  fotos: [],
  handleCreateFoto: () => {},
  handleUpdateFoto: () => {},
  handleDeleteFoto: () => {},
};

export const FotosContext = createContext<UseFotosContextType>(initContextState);

type ChildrenProps = {
  children: ReactNode
}

const FotosProvider = ({children}: ChildrenProps) => {
  const [fotos, setFotos] = useState<FotosType[]>(initState)

  const { user, token } = useUser();

  useEffect(() => {
    if (user && token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const fetchFotos = async (): Promise<void> => {
        try {
          const fotosResponse = await getFotos(user!.id);
          
          setFotos(fotosResponse)
          
          localStorage.setItem('fotos', JSON.stringify(fotosResponse))
        } catch (error) {
          console.error('Error on fetching the data', error)
          setFotos(initState)
        }
      }
      fetchFotos();
    } 
  }, [user, token])
  
  useEffect(() => {
      const storageFotos = localStorage.getItem('fotos')
    
      if (storageFotos) {
        const parsedFotos = JSON.parse(storageFotos);
        setFotos(parsedFotos);
      }
  }, [])

  function handleCreateFoto(data: Omit<FotosType, 'id'>) {
    if (user && token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const fetchFotos = async (): Promise<void> => {
        try {
          const newFoto = await createFoto(data.title, data.category.toLowerCase(), data.image_url, data.userId);
          
          if (newFoto) {
            setFotos([...fotos, newFoto])
            toast.success('New Foto successfuly created');
          } else {
            console.log('Something went wrong')
          }
        } catch (error) {
          console.error('Error on creating a new photo', error)
          if (error as AxiosError) {
            alert((error as AxiosError).response?.data)
          }
        }
      }
      fetchFotos();
    }
  }

  function handleUpdateFoto(fotoId: string, data: FieldValuesUpdateFoto) {
      updateFoto(fotoId, data).then((res) => {
      setFotos([...fotos.filter(foto => foto.id !== res.id), res])
      toast.success('Photo successefully updated!')
    })
  }

  function handleDeleteFoto(id: string) {
    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`
      const filteredFotos = fotos.filter(item => item.id !== id)

      try {
        deleteFoto(id);
        setFotos(filteredFotos)
        toast.success(`Photo was successfully deleted`)
      } catch (error) {
        console.error(`Error on deleting the foto`, error)
      }
    }
  }

  return (
    <FotosContext.Provider value={{fotos, handleCreateFoto, handleUpdateFoto, handleDeleteFoto}}>
      {children}
    </FotosContext.Provider>
  )
}

export default FotosProvider