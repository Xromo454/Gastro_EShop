import { Product } from "./Product.js";

export class Combo extends Product {
    private items: Product[];

    constructor(name: string, comboBasePrice: number, items: Product[]) {
        super(name, comboBasePrice);
        this.items = items;
    }

    public get getItems(): Product[] {
        return this.items;
    }

    // Логика скидок такая же, как у всех продуктов
    calculatePrice(isStudent: boolean, currentHour: number): number {
        let price = this.basePrice;

        // Happy Hours (14:00 - 16:00) 20% discount
        if (currentHour >= 14 && currentHour <= 16) {
            price *= 0.8;
        }
        // ISIC discount 10%
        else if (isStudent) {
            price *= 0.9;
        }

        return price;
    }
}