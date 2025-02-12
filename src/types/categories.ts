import { Product } from "./products";

export interface Category {
    id: number
    createdAt: string
    name: string
    products: Product[]
    categoryId: number
}
