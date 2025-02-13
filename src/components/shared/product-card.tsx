
import React from 'react';
import type { Product } from '@/types/products';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { Title } from '@/components/shared';


interface Props {
    className?: string;
    item: Product
    locale: string
}

export const ProductCard: React.FC<Props> = ({ locale, className, item }) => {
    return (
        <Link className='relative flex flex-col gap-y-2 p-1 h-auto' href={`${locale}/products/${item.id}`}>
            <div className='rounded-3xl overflow-hidden'>
                <img className='object-cover object-center w-full' src="https://www.andys.md/public/product_images/89/2389/d8a3ce33289c10cc8f3bd26f27334754.webp" />
            </div>
            <Title text={item.name} />
            <p className='font-light text-sm text-gray-500'>Красный лук, Сочные ананасы, Итальянские травы, Сладкий перец</p>
            <div className='flex items-center justify-between mt-auto'>
                <span>от 15$</span>
                <Button size={"sm"}>
                    <span>Выбрать</span>
                    <Plus size={15} />
                </Button>
            </div>
        </Link>



    )

};
