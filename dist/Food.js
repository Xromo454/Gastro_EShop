import { Product } from "./Product.js";
export class Food extends Product {
    ingredients;
    boxPrice;
    constructor(name, basePrice, ingredients, boxPrice) {
        super(name, basePrice);
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
    get getPrice() {
        return this.basePrice + this.boxPrice;
    }
}
