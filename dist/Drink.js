import { Product } from "./Product.js";
export class Drink extends Product {
    deposit;
    constructor(name, basePrice, deposit) {
        super(name, basePrice);
        this.deposit = deposit;
    }
    get getDeposit() {
        return this.deposit;
    }
    get getPrice() {
        return this.basePrice + this.deposit;
    }
}
