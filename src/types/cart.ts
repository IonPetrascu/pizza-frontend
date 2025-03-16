import { CartItem } from "./CartItem";

export interface Cart {
    id: number

    userId: number
    token: string
    items: CartItem[]
    totalAmount: number

    createdAt: string
    updatedAt: string
}


