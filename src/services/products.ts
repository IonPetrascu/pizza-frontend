import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import type { Product } from "@/types/products";

export const getProducts = async (): Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>(ApiRoutes.PRODUCTS)).data;
};

export const searchProducts = async (name: string): Promise<Product[]> => {
  return (
    await axiosInstance.get<Product[]>(`${ApiRoutes.PRODUCTS}/search?name=${name}`)
  ).data;
};

export const getSingleProduct = async (id: number): Promise<Product> => {
  return (await axiosInstance.get<Product>(`${ApiRoutes.PRODUCTS}/${id}`)).data;
};
