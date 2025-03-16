import { CartItemDTO } from "@/services/dto/cart.dto"

/**
 * Функция для подсчёта полной стоймости товара корзины
 * @param item - товар в корзине
 * @returns number - общая стоймость товара (productPrice * ingredintsPrice) * quantityOfProducts
 */
export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.ingredients?.reduce((acc, ingredient) => acc + ingredient.price, 0) || 0
    return (ingredientsPrice + item.product.price) * item.quantity


}
