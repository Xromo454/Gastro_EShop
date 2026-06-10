import { Product } from "./Product.js";
export class Combo extends Product {
    constructor(name, comboBasePrice, items) {
        super(name, comboBasePrice);
        this.items = items;
    }
    get getItems() {
        return this.items;
    }
    calculatePrice(isStudent, currentHour) {
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
