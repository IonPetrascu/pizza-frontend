import { cn } from '@/lib/utils';
import React from 'react';
import type { Category } from '@/types/categories';
import { ProductList } from '@/components/shared';


interface Props {
    className?: string;
    categoryProductGroup: Category[]
    locale: string
}

export const ProductGroupList: React.FC<Props> = ({ className, locale, categoryProductGroup }) => {
    return (
        <div className={cn('flex flex-col gap-10', className)}  >
            {categoryProductGroup.map((category) =>
                <ProductList
                    key={category.id}
                    items={category.products}
                    title={category.name}
                    locale={locale}
                    categoryId={category.id}
                />)}
        </div >)
};
