import React from 'react';
import { Button, Separator } from '../ui';
import { CartDrawer } from './cart-drawer';
import { ShoppingCart } from 'lucide-react';

export const CartButton: React.FC = ({
}) => {
    return (
        <CartDrawer>
            <Button className='flex items-center'>
                <span>520 $</span>
                <Separator className="mx-1" orientation="vertical" />
                <div className='flex items-center gap-1 '>
                    <ShoppingCart size={20} />
                    <span>5</span>
                </div>
            </Button>
        </CartDrawer>

    );
};
