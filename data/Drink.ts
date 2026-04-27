import { Product } from "./Product.js";

export class Drink extends Product {

    private deposit: number;

    constructor(name: string, basePrice: number, deposit: number) {
        super(name, basePrice);
        this.deposit = deposit;
    }

    get getDeposit(): number {
        return this.deposit;
    }

    get getPrice(): number {
        return this.basePrice + this.deposit
    }
}
