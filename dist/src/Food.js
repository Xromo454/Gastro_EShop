import { Product } from "./Product.js";
export class Food extends Product {
    constructor(name, basePrice, ingredients, boxPrice) {
        super(name, basePrice);
        if (boxPrice < 0)
            throw new Error("Box price cannot be negative");
        if (!ingredients || ingredients.length === 0)
            throw new Error("Ingredients cannot be empty");
        this.ingredients = ingredients;
        this.boxPrice = boxPrice;
    }
    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }
    removeIngredient(ingredient) {
        const index = this.ingredients.indexOf(ingredient);
        if (index !== -1) {
            this.ingredients.splice(index, 1);
        }
    }
    get getIngredients() {
        return this.ingredients;
    }
    calculatePrice(isStudent, currentHour) {
        let price = this.basePrice + this.boxPrice;
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
