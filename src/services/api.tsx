import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { FotosType } from '../Context/FotosProvider';
import { UserType } from '../Context/UserProvider';
import { FieldValuesUpdateUser } from '../Components/Nav/ValidationSchemaUpdate';
import { FieldValuesUpdateFoto } from '../pages/Gallery/ValidationSchemaUpdateFoto';

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

type SessionType = {
  user: UserType;
  token: string;
};

//Get Data
export const createSession = async (email: string | undefined, password: string | undefined): Promise<SessionType | null> => {
  try {
    const response: AxiosResponse<SessionType> = await api.post("/sessions", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error on fetching the user", error);
    throw error;
  }
}

export const getFotos = async (userId: string | null): Promise<FotosType[]> => {
  try {
    const response: AxiosResponse<FotosType[]> = await api.get(
      `/users/${userId}/fotos`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching the data', error);
      return [];
    }
  }
  
//Create Data
export const createUser = async (
  name: string | undefined,
  email: string | undefined,
  password: string | undefined,
  passwordConfirmation: string | undefined
): Promise<UserType | null> => {
  try {
    const response: AxiosResponse<UserType> = await api.post("/users", {
      name,
      email,
      password,
      passwordConfirmation,
    });
    return response.data;
  } catch (error) {
    console.error("Error on fetching the user", error);
    throw error;
  }
};

export const createFoto = async (
  title: string | undefined,
  category: string | undefined,
  image_url: string | undefined,
  userId: string | undefined
): Promise<FotosType | null> => {
  try {
    const response: AxiosResponse<FotosType> = await api.post('/fotos', {title, category, image_url, userId})
    return response.data;
  } catch (error) {
    console.error('Error on creating the photo', error)
    throw error
  }
};

//update Data 
export const updateUser = async (userId: string, data: FieldValuesUpdateUser): Promise<UserType> => {
    const response: AxiosResponse<UserType> = await api.put(`/users/${userId}`, data);
    return response.data;
}

export const updateFoto = async (fotoId: string, data: FieldValuesUpdateFoto): Promise<FotosType> => {
  const response: AxiosResponse<FotosType> = await api.put(`/fotos/${fotoId}`, data);
  return response.data;
}

//Delete Data
export const deleteFoto = async (id: string | undefined): Promise<FotosType | null> => {
    const response: AxiosResponse<FotosType> = await api.delete(`/fotos/${id}`);
    return response.data;
}

export const deleteUser = async (userId: string) => {
  await api.delete(`/users/${userId}`);
}

export const deleteAllUserFotos = async (userId: string) => {
  await api.delete(`/users/${userId}/fotos`)
}