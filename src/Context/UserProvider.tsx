import { ReactNode, createContext, useEffect, useState } from "react";
import { api, createSession, createUser, deleteAllUserFotos, deleteUser, updateUser } from "../services/api";
import { FieldValuesLogin } from "../pages/Login/ValidationSchemaLogin";
import { useNavigate } from "react-router-dom";
import { FieldValuesSignupLogin } from "../pages/Login/ValidationSchemaSignupLogin";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { FieldValuesUpdateUser } from "../Components/Nav/ValidationSchemaUpdate";

export type UserType = {
  id: string;
  name: string;
  email: string;
};

const initState: UserType | null = null;

export type UseUserContextType = {
  user: UserType | null;
  handleGetUser: (data: FieldValuesLogin) => void;
  handleCreateUser: (data: FieldValuesSignupLogin) => void;
  errorMessage: AxiosError | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<AxiosError | null>>;
  loading: boolean;
  logout: () => void;
  token: string | null;
  successfullyCreated: boolean;
  setSuccessfullyCreated: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateUser: (data: FieldValuesUpdateUser) => void;
  handleDeleteUser: (userId: string) => void;
};

const initContextState: UseUserContextType = {
  user: null,
  handleGetUser: () => {},
  handleCreateUser: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
  loading: false,
  logout: () => {},
  token: null,
  successfullyCreated: false,
  setSuccessfullyCreated: () => {},
  handleUpdateUser: () => {},
  handleDeleteUser: () => {}
};

export const UserContext = createContext<UseUserContextType>(initContextState);

type ChildrenType = {
  children: ReactNode,
}

function UserProvider({children}: ChildrenType) {
  const [user, setUser] = useState<UserType | null>(initState);
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successfullyCreated, setSuccessfullyCreated] = useState<boolean>(false);

  const navigate = useNavigate();

  function handleGetUser(data: FieldValuesLogin) {
    try {
      const fetchUser = async (): Promise<void> => {
        try {
          const response = await createSession(data.email, data.password);
          
          
          if (response!.user) setLoading(true);

          const loggedUser = response!.user;
          const tokenResponse = response!.token;

          localStorage.setItem('user', JSON.stringify(loggedUser))
          localStorage.setItem('token', JSON.stringify(tokenResponse));

          api.defaults.headers.Authorization = `Bearer ${tokenResponse}`;

          setToken(tokenResponse);
          navigate('/gallery')
        } catch(error) {
          console.error('Error fetching the user', error)
          setUser(null)
          setErrorMessage(error as AxiosError);
        }
      }
      fetchUser()
    } catch(error) {
      console.log('User not provided', error);
    }
  }
  
  useEffect(() => {
    const storageUser = localStorage.getItem('user');
    const storageToken = localStorage.getItem('token');
    
    if (storageUser && storageToken) {
      setUser(JSON.parse(storageUser));
      setToken(JSON.parse(storageToken));
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(storageToken)}`
      navigate('/gallery')
    }
  }, [navigate])
  
  function handleCreateUser(data: FieldValuesSignupLogin) {
    try {
      const fetchUser = async (): Promise<void> => {
        try {
          const response = await createUser(data.name, data.email, data.password, data.confirmPassword);
          
          if (response) {
            setSuccessfullyCreated(true);
            navigate('/')
          }  
        } catch(error) {
          console.error('Error fetching the user', error)
          setUser(null)
          setErrorMessage(error as AxiosError);
        }
      }
      fetchUser()
    } catch(error) {
      console.log('User not provided', error);
    }
  }
  
  function handleUpdateUser(data: FieldValuesUpdateUser) {
    updateUser(user!.id, data).then((res) => {
      setUser(res);
      toast.success("User successfully updated!");
      })
  }
  
  const logout = () => {
    try {
      setUser(null)
      localStorage.removeItem('user')
      api.defaults.headers.Authorization = null;
      localStorage.removeItem('token');
      localStorage.removeItem('fotos');
      setLoading(false)
      navigate('/')
    } catch (error) {
      console.error("Error on logout", error);
    }
  };
  
  function handleDeleteUser(userId: string) {
    deleteUser(userId)
    .then(() => {
      deleteAllUserFotos(userId)
      toast.success(`User successfully deleted!`)
      logout();
    }).catch((err) => {
      toast.error(err)
    })
  }
  
  return (
    <UserContext.Provider
    value={{
        user,
        handleGetUser,
        handleCreateUser,
        errorMessage,
        setErrorMessage,
        loading,
        logout,
        token,
        successfullyCreated,
        setSuccessfullyCreated,
        handleUpdateUser,
        handleDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
