import React from 'react';
import type { Product } from '@/types/products';
import { ProductCard } from './ProductCard';

interface Props {
    className?: string;
    items: Product[]
    title: string
    locale: string
}

export const ProductList: React.FC<Props> = ({ className, locale, items, title }) => {

    return <div className='grid grid-cols-1 gap-8  md:grid-cols-2 xl:grid-cols-3' id={title}>
        {items.map((item, idx) => <ProductCard locale={locale} item={item} key={idx} />)}
    </div>
};
