import type { Product } from "./products"

export interface CartItem {
    id: number
    cartId: number
    productId: number
    price: number
    quantity: number
    product: Product
    ingredients: { id: number; name: string; price: number }[];
    createdAt: string
    updatedAt: string
}
