import { Product } from "./Product.js";

export class Drink extends Product {
    private deposit: number;

    constructor(name: string, basePrice: number, deposit: number) {
        super(name, basePrice);
        if (deposit < 0) throw new Error("Deposit cannot be negative");
        this.deposit = deposit;
    }

    public calculatePrice(isStudent: boolean, currentHour: number): number {
        let price = this.basePrice + this.deposit;

        // Happy Hours (14:00 - 16:00) -> 20% discount
        if (currentHour >= 14.0 && currentHour <= 16.0) {
            price *= 0.8;
        }
        // ISIC discount -> 10%
        else if (isStudent) {
            price *= 0.9;
        }

        return price;
    }
}