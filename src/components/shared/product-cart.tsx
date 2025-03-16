"use client"

import React from 'react';
import { Trash2 } from 'lucide-react';
import { CountButton } from '@/components/shared';
import { CartStateItem } from '@/lib/get-cart-details';



interface Props {
    onClickCountButton: (types: "minus" | "plus") => void
    onClickDelete?: () => void
    className?: string;
    quantity: number
    ingredients: Array<{ name: string; price: number }>
    productPrice: number
    item: CartStateItem
}

export const ProductCart: React.FC<Props> = ({ className, item, productPrice, quantity, ingredients, onClickCountButton, onClickDelete }) => {

    return (<div className='flex gap-4 p-2'>
        <img className='w-[60px] h-[60px]' src="https://next-pizza-dun-two.vercel.app/assets/images/pizza3.webp" alt="pizza" />
        <div className='flex flex-col w-full gap-5'>
            <div>
                <h2 className='font-semibold text-xl'>{item.name}</h2>

                {

                    ingredients.length > 0 && (<>
                        <h4 className='font-light text-sm font-semibold'>Ingredients:</h4>
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
                <div className='flex items-center gap-2'>
                    <span className='font-semibold text-lg'>{productPrice}$</span>
                    <Trash2 onClick={onClickDelete} size={15} />
                </div>
            </div>
        </div>
    </div>




    )

};
