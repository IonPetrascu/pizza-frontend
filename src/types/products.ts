import type { Ingredient } from "./ingredients";

export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    ingredients: Ingredient[];
    createdAt: string
    updatedAt: string
}
