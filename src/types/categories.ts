import { Product } from "./products";

export interface Category {
    id: number
    name: string
    products: Product[]
    categoryId: number
    createdAt: string
    updatedAt: string
}
