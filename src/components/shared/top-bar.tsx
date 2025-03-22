"use client"

import React from 'react';
import type { Category } from '@/types/categories';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { useCategoryStore } from '@/store';
import { cn } from '@/lib/utils';
import { Container } from './container';

interface Props {
    categories: Category[]
}

export const TopBar: React.FC<Props> = ({ categories }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);

    return (
        <Container className='sticky top-0 z-20'>
            <div className='py-3 bg-white overflow-x-auto'>
                <ul className='flex  gap-2 w-max rounded-3xl'>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <Link href={`#${category.name}`} >
                                <Button className={cn('bg-black text-white rounded-lg', categoryActiveId === category.id && 'bg-white text-black')} variant={"outline"}>{category.name}</Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

        </Container>

    )
};
