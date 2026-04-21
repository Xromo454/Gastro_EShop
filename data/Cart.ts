import { Product } from "./Product.js";

export class Cart {
    private items: Product[] = [];

    public add(item: Product): void {
        this.items.push(item);
    }

    public remove(item: Product): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    clear(): void {
        this.items = [];
    }

    get getTotal(): number {
        return this.items.reduce((sum, item) => sum + item.getPrice, 0)
    }
}


const a = new Cart();
