"use client"

import React from 'react';
import { Trash2 } from 'lucide-react';
import { CountButton } from '@/components/shared';
import { cn } from '@/lib';
import { Button } from '../ui';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { useTranslations } from 'next-intl';


interface Props {
    onClickCountButton: (types: "minus" | "plus") => void
    onClickDelete?: () => void
    className?: string;
    quantity: number
    ingredients: Array<{ name: string; price: number }>
    productPrice: number
    item: CartItemDTO
}

export const ProductCart: React.FC<Props> = ({ className, item, productPrice, quantity, ingredients, onClickCountButton, onClickDelete }) => {
    const t = useTranslations("Ingredients")

    return (<div className={cn('flex gap-4 p-2', className)} >
        <img className='w-[60px] h-[60px]' src="https://next-pizza-dun-two.vercel.app/assets/images/pizza3.webp" alt="pizza" />
        <div className='flex flex-col w-full gap-5'>
            <div>
                <h2 className='font-semibold text-xl'>{item.product.name}</h2>
                {
                    ingredients.length > 0 && (<>
                        <h4 className='text-sm font-semibold'>{t("title", { count: ingredients.length })}</h4>
                        <ul>
                            {ingredients.map((ingredient, idx) => {
                                return (
                                    <li className='font-light text-xs' key={idx}>{ingredient.name} - {ingredient.price}$</li>
                                )
                            })}
                        </ul>
                    </>
                    )
                }
            </div>
            <div className='flex justify-between pt-3 items-center border-t border-gray-300'>
                <div className='flex items-center gap-3'>
                    <CountButton onClick={(type) => onClickCountButton(type)} value={quantity} />
                </div>
                <div className='flex gap-3 items-center'>
                    <span className='font-semibold text-lg'>{productPrice}$</span>
                    <Button
                        onClick={onClickDelete}

                        className="group h-[30px] w-[30px] flex items-center bg-white text-black border  hover:bg-gray-800 hover:text-white"
                    >
                        <Trash2
                            size={15}
                            onMouseOver={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                                event.currentTarget.style.color = "white";
                            }}
                            onMouseOut={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                                event.currentTarget.style.color = "black";
                            }}
                        />
                    </Button>
                </div>

            </div>
        </div>
    </div>




    )

};
