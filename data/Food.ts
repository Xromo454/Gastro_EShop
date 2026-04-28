import { Product } from "./Product.js";

export class Food extends Product {


    private ingredients: string[];
    private boxPrice: number;

    constructor(name: string, basePrice: number, ingredients: string[], boxPrice: number) {
        super(name, basePrice);
        this.ingredients = ingredients;
        this.boxPrice = boxPrice;
    }

    addIngredient(ingredient: string): void {
        this.ingredients.push(ingredient);
    }
    removeIngredient(ingredient: string): void {
        const index = this.ingredients.indexOf(ingredient);
        if (index !== -1) {
            this.ingredients.splice(index, 1);
        }
    }

    get getIngredients(): string[] {
        return this.ingredients;
    }
    get getPrice(): number {
        return this.basePrice + this.boxPrice;
    }
}


