import React from 'react';
import { Button, Separator } from '../ui';
import { CartDrawer } from './cart-drawer';
import { LoaderCircle, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store';

export const CartButton: React.FC = ({
}) => {
    const { totalAmount, items, loading } = useCartStore()
    return (
        <CartDrawer>
            <Button disabled={loading} className='flex items-center min-w-28'>
                {
                    !loading ? (
                        <>
                            <span>{totalAmount} $</span>
                            <Separator className="mx-1" orientation="vertical" />
                            <div className='flex items-center gap-1 '>
                                <ShoppingCart size={20} />
                                <span>{items.length}</span>
                            </div>
                        </>
                    ) : (
                        <LoaderCircle className='animate-spin'/>
                    )
                }

            </Button>
        </CartDrawer>

    );
};
