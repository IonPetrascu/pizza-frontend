import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import type { Ingredient } from '@/types/ingredients';

export const getIngredients = async (): Promise<Ingredient[]> => {
    return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS))
        .data;
};
