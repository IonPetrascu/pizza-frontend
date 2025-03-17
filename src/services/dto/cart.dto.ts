import type { CartItem } from "@/types/CartItem"
import type { Product } from "@/types/products"

export type CartItemDTO = CartItem & {
    product: Product
}
