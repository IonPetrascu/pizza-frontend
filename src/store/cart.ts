import { create } from 'zustand';
import { Api } from '@/services/api-client'; // Импорт остается таким же
import { CartItemDTO } from '@/services/dto/cart.dto';
import { getCartDetails } from '@/lib';

interface CartState {
    items: CartItemDTO[];
    totalAmount: number;
    token: string | null;
    loading: boolean;
    error: boolean;
    addCartItem: (values: { productId: number; ingredients?: number[] }, userId?: number) => Promise<void>;
    fetchCart: (userId?: number) => Promise<void>;
    updateItemQuantity: (id: number, quantity: number, userId?: number) => Promise<void>;
    deleteCartItem: (id: number, userId?: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    totalAmount: 0,
    token: typeof window !== 'undefined' ? localStorage.getItem('cartToken') : null,
    loading: true,
    error: false,

    addCartItem: async (values: { productId: number; ingredients?: number[] }, userId?: number) => {
        try {
            set({ loading: true, error: false });
            const currentToken = useCartStore.getState().token;
            const data = await Api.cart.addCartItem(values.productId, userId, values.ingredients || [], currentToken);
            set({
                items: getCartDetails(data.cart),
                totalAmount: data.cart.totalAmount,
                token: data.token,
            });

            localStorage.setItem('cartToken', data.token);
        } catch (error) {
            console.error('[addCartItem] Error:', error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    fetchCart: async (userId?: number) => {
        try {
            set({ loading: true, error: false });
            const currentToken = useCartStore.getState().token;

            // Если нет ни userId, ни token, сбрасываем корзину
            if (!userId && !currentToken) {
                set({ items: [], totalAmount: 0 });
                return;
            }

            // Передаем userId, если он есть; иначе используем token
            const data = await Api.cart.getCart(userId, currentToken);
            set({
                items: getCartDetails(data),
                totalAmount: data.totalAmount,
                token: data.token || currentToken, // Сохраняем token, если он вернулся
            });

            if (data.token) localStorage.setItem('cartToken', data.token);
        } catch (error) {
            console.error('[fetchCart] Error:', error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const currentToken = useCartStore.getState().token;
            if (!currentToken) {
                throw new Error('No cart token available');
            }
            const data = await Api.cart.updateItemQuantity(id, quantity, undefined, currentToken);
            set({
                items: getCartDetails(data),
                totalAmount: data.totalAmount,
            });
        } catch (error) {
            console.error('[updateItemQuantity] Error:', error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    deleteCartItem: async (id: number, userId?: number) => {
        try {
            set({ loading: true, error: false });
            const currentToken = useCartStore.getState().token;
            const data = await Api.cart.deleteCartItem(id, userId, currentToken);
            set({
                items: getCartDetails(data),
                totalAmount: data.totalAmount,
            });
        } catch (error) {
            console.error('[deleteCartItem] Error:', error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));