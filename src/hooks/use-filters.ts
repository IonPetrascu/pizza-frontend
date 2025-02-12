import { useSearchParams, useRouter } from 'next/navigation';
import { useSet } from 'react-use';
import { useEffect } from 'react';


export const useFilters = () => {
    const searchParams = useSearchParams();
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set(searchParams.get('ingredients')?.split(',') || []));
    const router = useRouter()

    const changeParamsUrl = (selected: Set<string>, value: string, params: URLSearchParams) => {
        params.set(value, Array.from(selected).join(','));
    }
    useEffect(() => {
        const params = new URLSearchParams();
        console.log(selectedIngredients
        );

        if (selectedIngredients.size) changeParamsUrl(selectedIngredients, 'ingredients', params)

        router.push(`?${params.toString()}`, { scroll: false });
    }, [selectedIngredients, router]);

    return {
        selectedIngredients,
        toggleIngredients
    }


};
