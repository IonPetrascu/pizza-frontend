import React from 'react';
import { Button, Separator } from '../ui';
import { CartDrawer } from './cart-drawer';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store';
export const CartButton: React.FC = ({
}) => {
    const { totalAmount, items } = useCartStore()
    return (
        <CartDrawer>
            <Button className='flex items-center'>
                <span>{totalAmount} $</span>
                <Separator className="mx-1" orientation="vertical" />
                <div className='flex items-center gap-1 '>
                    <ShoppingCart size={20} />
                    <span>{items.length}</span>
                </div>
            </Button>
        </CartDrawer>

    );
};
