import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { CartDTO } from './dto/cart.dto';

// Получение корзины по userId или token
export const getCart = async (userId?: number, token?: string): Promise<CartDTO> => {
  console.log("get cart", userId, token);

  const response = await axiosInstance.get<CartDTO>(ApiRoutes.CART, {
    params: userId ? { userId } : {},
    headers: token ? { 'x-cart-token': token } : {},
  });
  return response.data;
};

// Обновление количества элемента в корзине
export const updateItemQuantity = async (
  id: number,
  quantity: number,
  userId?: number,
  token?: string
): Promise<CartDTO> => {
  const response = await axiosInstance.patch<CartDTO>(
    `${ApiRoutes.CART}/${id}`,
    { quantity },
    {
      params: userId ? { userId } : {},
      headers: token ? { 'x-cart-token': token } : {},
    }
  );
  return response.data;
};

// Удаление элемента из корзины
export const deleteCartItem = async (id: number, userId?: number, token?: string): Promise<CartDTO> => {
  const response = await axiosInstance.delete<CartDTO>(`${ApiRoutes.CART}/${id}`, {
    params: userId ? { userId } : {},
    headers: token ? { 'x-cart-token': token } : {},
  });
  return response.data;
};

// Добавление элемента в корзину
export const addCartItem = async (
  productId: number,
  userId?: number,
  ingredients: number[] = [],
  token?: string
): Promise<{ cart: CartDTO; token: string }> => {
  const response = await axiosInstance.post<{ cart: CartDTO; token: string }>(
    ApiRoutes.CART,
    { productId, ingredients },
    {
      params: userId ? { userId } : {},
      headers: token ? { 'x-cart-token': token } : {},
    }
  );
  return response.data;
};