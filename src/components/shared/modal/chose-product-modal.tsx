"use client";

import { Button, Dialog, DialogContent, DialogTitle } from '@/components/ui';
import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/products';
import { Title } from '@/components/shared';
import { useCartStore } from '@/store';
import { useSession } from 'next-auth/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';

interface Props {
    product: Product;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    const { addCartItem } = useCartStore();
    const { data: session, status } = useSession();

    const handleAddToCart = async () => {
        const userId = status === 'authenticated' && session?.user?.id ? Number(session.user.id) : undefined;

        try {
            // Добавляем товар в корзину, передавая userId для авторизованных пользователей или undefined для гостей


            await addCartItem({ productId: product.id }, userId);
            toast.success('Вы успешно добавили товар', {
                icon: '✅',
            });
            router.back(); // Закрываем модалку после успешного добавления
        } catch (error) {
            console.error('Failed to add product to cart:', error);
            toast.error('Не удалось добавить товар в корзину', {
                icon: '❌',
            });
            router.back(); // Закрываем модалку даже при ошибке, чтобы пользователь не застрял
        }
    };

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogTitle className="hidden">title</DialogTitle>

            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className
                )}
            >
                <DialogDescription className="hidden" />
                <div className="flex gap-5">
                    <div className="w-1/2 rounded-3xl overflow-clip h-full p-2">
                        <img
                            className="object-cover object-center w-full rounded-2xl"
                            src="https://www.andys.md/public/product_images/89/2389/d8a3ce33289c10cc8f3bd26f27334754.webp"
                            alt="pizza mario"
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <Title size="lg" text={product.name} />
                        <h2>{product.name}</h2>
                        <div>Ingredients:</div>
                        <ul>
                            {product.ingredients?.map((el) => (
                                <li key={el.id}>{el.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Button onClick={handleAddToCart}>Add to cart</Button>
            </DialogContent>
        </Dialog>
    );
};