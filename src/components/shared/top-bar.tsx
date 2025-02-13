
import React from 'react';
import type { Category } from '@/types/categories';
import Link from 'next/link';
import { Button } from '@/components/ui';


interface Props {
    categories: Category[]
}

export const TopBar: React.FC<Props> = ({ categories }) => {
    return (<div className='sticky p-3 top-0 z-20 bg-white'>
        <ul className='flex flex-wrap gap-2 bg-gray-200 py-2 px-3 w-max rounded-3xl'>
            {categories.map((category) => (
                <li key={category.id}>
                    <Link href={`#${category.name}`} >
                        <Button className='bg-black text-white rounded-lg' variant={"outline"}>{category.name}</Button>
                    </Link>
                </li>
            ))}
        </ul>
    </div>

    )
};
