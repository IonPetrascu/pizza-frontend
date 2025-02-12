
/**
 * Функция для подсчёта стоимости товаров
 * @example  ```calcTotalPrice(150, 200)```
 * @param price1 - цена первого товара
 * @param price2 - цена второго товара
 * @returns number - общая стоймость
 */
export const calcTotalPrice = (price1: number, price2: number): number => {
    return price1 + price2
}