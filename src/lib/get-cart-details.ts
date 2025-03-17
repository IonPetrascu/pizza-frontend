
import type { Cart } from "@/types/cart";
import { calcCartItemTotalPrice } from "./calt-cart-item-total-price";

// export type CartStateItem = {
//     id: number
//     quantity: number
//     name: string
//     imageUrl: string
//     price: number
//     ingredients: Array<{ name: string; price: number }>
// }

import { CartItemDTO } from "@/services/dto/cart.dto";

export const getCartDetails = (data: Cart): CartItemDTO[] => {
    const items = data.items.map((item) => ({
        id: item.id,
        cartId: item.cartId,
        productId: item.productId,
        quantity: item.quantity,
        product: item.product,
        price: calcCartItemTotalPrice(item),
        ingredients: item.ingredients,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    }));
    return items;
};