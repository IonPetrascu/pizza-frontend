export interface CartItem {
    id: number
    cartId: number
    productId: number
    quantity: number
    ingredients: { id: number; name: string; price: number }[];
    createdAt: string
    updatedAt: string
}
