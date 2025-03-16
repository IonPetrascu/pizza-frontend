import React from 'react';
import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;

}

export const ProductCardSkeleton: React.FC<Props> = ({ className }) => {

    return (
        <div className={cn('flex flex-col gap-y-2 p-1 h-auto', className)}>
            <Skeleton className='w-full' />
            <Skeleton className='h-8 w-14' />
            <Skeleton className='w-full h-10' />
            <div className='flex items-center justify-between mt-auto'>
                <Skeleton className='h-7 w-14' />
                <Skeleton className='h-9 w-24' />
            </div>
        </div>
    )
};
