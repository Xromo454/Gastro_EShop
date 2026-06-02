import { Product } from "./Product.js";

export class Food extends Product {
    private ingredients: string[];
    private boxPrice: number;

    constructor(name: string, basePrice: number, ingredients: string[], boxPrice: number) {
        super(name, basePrice);
        if (boxPrice < 0) throw new Error("Box price cannot be negative");
        if (!ingredients || ingredients.length === 0) throw new Error("Ingredients cannot be empty");
        
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

    calculatePrice(isStudent: boolean, currentHour: number): number {
        let price = this.basePrice + this.boxPrice;

        // Happy Hours (14:00 - 16:00) 20% discount
        if (currentHour >= 14.0 && currentHour <= 16.0) { 
            price *= 0.8; 
        }
        // ISIC discount 10%
        else if (isStudent) { 
            price *= 0.9; 
        }

        return price;
    }
}