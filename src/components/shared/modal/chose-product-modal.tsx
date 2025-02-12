'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui';
import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/products';
import { Title } from '../title';


interface Props {
    product: Product;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogTitle className='hidden'>ttile</DialogTitle>

            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}>
                <div className='flex gap-5'>
                    <div className='w-1/2 rounded-3xl overflow-clip h-full p-2'>
                        <img className='object-cover object-center w-full rounded-2xl' src="https://www.andys.md/public/product_images/89/2389/d8a3ce33289c10cc8f3bd26f27334754.webp" alt="pizza mario" />
                    </div>
                    <div className='w-1/2 p-2'>
                        <Title size='lg' text={product.name} />
                        <h2>{product.name}</h2>
                        <div>Ingredints:</div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};
