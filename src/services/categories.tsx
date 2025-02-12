import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import type { Category } from '@/types/categories'

export const getCategoriesWithProducts = async (): Promise<Category[]> => {

    return (await axiosInstance.get<Category[]>(ApiRoutes.CATEGORIES))
        .data;
};