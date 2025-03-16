"use client"

import React from 'react';
import { CheckBoxGroup, Title } from '@/components/shared';
import { useIngredients, useFilters } from '@/hooks';
import { cn } from '@/lib/utils';


interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients();
    const { selectedIngredients, toggleIngredients } = useFilters()

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));


    return (
        <div className={cn(className, "flex flex-col gap-y-2")}>
            <Title className='font-bold' text={'Фильтрация'} />
            <CheckBoxGroup title={"Ингредиенты"} loading={loading} name="ingredients" onClickCheckbox={toggleIngredients} selected={selectedIngredients} items={items} />
        </div>
    );
};
