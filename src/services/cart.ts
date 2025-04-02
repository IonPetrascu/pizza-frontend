import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import type { Cart } from "@/types/cart";

// Получение корзины по userId или token
export const getCart = async (
  userId?: number,
  token?: string | null
): Promise<Cart> => {
  const response = await axiosInstance.get<Cart>(ApiRoutes.CART, {
    params: userId ? { userId } : {},
    headers: token ? { "x-cart-token": token } : {},
  });
  return response.data;
};

// Обновление количества элемента в корзине
export const updateItemQuantity = async (
  id: number,
  quantity: number,
  userId?: number,
  token?: string
): Promise<Cart> => {
  const response = await axiosInstance.patch<Cart>(
    `${ApiRoutes.CART}/${id}`,
    { quantity },
    {
      params: userId ? { userId } : {},
      headers: token ? { "x-cart-token": token } : {},
    }
  );

  return response.data;
};

// Удаление элемента из корзины
export const deleteCartItem = async (
  id: number,
  userId?: number,
  token?: string | null
): Promise<Cart> => {
  const response = await axiosInstance.delete<Cart>(`${ApiRoutes.CART}/${id}`, {
    params: userId ? { userId } : {},
    headers: token ? { "x-cart-token": token } : {},
  });

  return response.data;
};

// Добавление элемента в корзину
export const addCartItem = async (
  productId: number,
  userId?: number,
  ingredients: number[] = [],
  token?: string | null
): Promise<{ cart: Cart; token?: string | null }> => {
  const response = await axiosInstance.post<{
    cart: Cart;
    token?: string | null;
  }>(
    ApiRoutes.CART,
    { productId, ingredients },
    {
      params: userId ? { userId } : {},
      headers: token ? { "x-cart-token": token } : {},
    }
  );
  return response.data;
};
