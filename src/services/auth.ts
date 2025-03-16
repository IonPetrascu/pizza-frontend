import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const login = async (email: string, password: string): Promise<any> => {
  return (await axiosInstance.post(ApiRoutes.LOGIN, { email, password })).data;
};

export const register = async (
  email: string,
  fullName: string,
  password: string,
  cartToken?: string
): Promise<any> => {
  return (await axiosInstance.post(ApiRoutes.REGISTER, { email, fullName, password, cartToken })).data;
};