"use client"

import React, { useEffect, useRef } from 'react';
import type { Product } from '@/types/products';
import { ProductCard } from '@/components/shared';
import { Separator } from '@/components/ui';
import { useCategoryStore } from '@/store';
import { useIntersection } from 'react-use';
interface Props {
    className?: string;
    items: Product[]
    title: string
    locale: string
    categoryId: number
}

export const ProductList: React.FC<Props> = ({ className, categoryId, locale, items, title }) => {

    const { setActiveId } = useCategoryStore()

    const intersectionRef = useRef(null);
    //@ts-ignore TODO: add type intersecionRef
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.5,
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveId(categoryId);
        }
    }, [intersection?.isIntersecting, categoryId]);



    return (
        <div id={title} ref={intersectionRef} className='flex flex-col gap-3 scroll-mt-20'>
            <div className='flex items-center gap-5'>
                <h3 className='font-bold text-4xl'>{title}</h3>
                <Separator className="bg-black flex-1" orientation="horizontal" />
            </div>
            <div className={'grid grid-cols-1 gap-8  md:grid-cols-2 xl:grid-cols-3 transform duration-500'} >
                {items.map((item, idx) => <ProductCard locale={locale} item={item} key={idx} />)}
            </div>
        </div>)

};
