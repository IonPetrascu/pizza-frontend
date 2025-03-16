
import { CartDTO } from "@/services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calt-cart-item-total-price";

export type CartStateItem = {
    id: number
    quantity: number
    name: string
    imageUrl: string
    price: number
    ingredients: Array<{ name: string; price: number }>
}

export interface ReturnProps {
    items: CartStateItem[]
    totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        ingredients: item.ingredients
    }))
    console.log("Return",items);
    
    return {
        totalAmount: data.totalAmount,
        items
    }
}