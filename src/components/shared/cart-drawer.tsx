"use client";

import React, { PropsWithChildren, useEffect } from 'react';
import {
    Button,
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui";
import Link from 'next/link';
import { ProductCart } from '@/components/shared';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
    const { totalAmount, fetchCart, updateItemQuantity, deleteCartItem, items, token } = useCartStore();
    const { data: session } = useSession();
    useEffect(() => {
        // Извлекаем userId из сессии, если пользователь авторизован
        const userId = session?.user?.id ? Number(session.user.id) : undefined;
        fetchCart(userId); // Передаем userId в fetchCart
        console.log("fetchCart called with userId:", userId);
    }, [fetchCart, session]); // Добавляем session в зависимости

    const onClickCountButton = (id: number, quantity: number, type: "minus" | "plus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        if (token) {
            updateItemQuantity(id, newQuantity);
        } else {
            toast.error('Добавьте товар в корзину, чтобы изменить количество');
        }
    };

    const onClickDelete = (id: number) => {
        if (token) {
            deleteCartItem(id);
        } else {
            toast.error('Добавьте товар в корзину, чтобы удалить его');
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col bg-gray-100 p-0 py-4">
                <SheetHeader className="px-2">
                    <SheetTitle>В корзине {items.length} товар(ов)</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col overflow-y-auto bg-white">
                    {items.map((item, idx) => (
                        <ProductCart
                            key={idx}
                            onClickDelete={() => onClickDelete(item.id)}
                            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                            productPrice={item.price}
                            quantity={item.quantity}
                            item={item}
                            ingredients={item.ingredients}
                        />
                    ))}
                </div>
                <SheetFooter className="mt-auto px-4 flex !flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">Итого</span>
                        <span className="font-bold text-lg">{totalAmount}$</span>
                    </div>
                    <Link href="/checkout">
                        <Button
                            onClick={() => console.log("go to /checkout")}
                            type="submit"
                            className="w-full h-12 text-base"
                        >
                            Оформить заказ
                            <ArrowRight className="w-5 ml-2" />
                        </Button>
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};