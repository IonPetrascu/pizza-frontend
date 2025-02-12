"use client"

import React from 'react';
import CheckBoxGroup from './CheckBoxGroup';
import { useIngredients, useFilters } from '@/hooks';
import { cn } from '@/lib/utils';
import { Title } from './title';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients();
    const { selectedIngredients, toggleIngredients } = useFilters()

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className={cn(className, "flex flex-col gap-y-2")}>
            <Title className='font-bold' text={'Фильтрация'} />
            <CheckBoxGroup title={"Ингредиенты"} name="ingredients" onClickCheckbox={toggleIngredients} selected={selectedIngredients} items={items} />
        </div>
    );
};
