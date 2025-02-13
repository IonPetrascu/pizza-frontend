import { cn } from '@/lib/utils';
import React from 'react';
import type { Category } from '@/types/categories';
import { ProductList } from '@/components/shared';
import { Separator } from '@/components/ui';

interface Props {
    className?: string;
    categoryProductGroup: Category[]
    locale: string
}

export const ProductGroupList: React.FC<Props> = ({ className, locale, categoryProductGroup }) => {

    return <div className={cn('flex flex-col gap-10', className)}  >
        {
            categoryProductGroup.map((category) =>
                <div className='flex flex-col gap-3' key={category.id}>
                    <div className='flex items-center gap-5'>
                        <h3 className='font-bold text-4xl'>{category.name}</h3>
                        <Separator className="bg-black flex-1" orientation="horizontal" />
                    </div>

                    <ProductList locale={locale} title={category.name} items={category.products} />
                </div>
            )
        }
    </div >
};
