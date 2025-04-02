import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { User } from "@/types/user";

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.LOGIN, {
      email,
      password,
    });
    return response.data; // Токен сохраняется в NextAuth, а не в localStorage
  } catch (error) {
    console.error("[AUTH_LOGIN] Error:", error);
    throw error;
  }
};

export const register = async (
  email: string,
  fullName: string,
  password: string,
  cartToken?: string | null
): Promise<User> => {
  try {
    const response = await axiosInstance.post(ApiRoutes.REGISTER, {
      email,
      fullName,
      password,
      cartToken,
    });
    return response.data; // Токен сохраняется в NextAuth, а не в localStorage
  } catch (error) {
    console.error("[AUTH_REGISTER] Error:", error);
    throw error;
  }
};
