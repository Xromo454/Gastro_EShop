import { Product } from "./Product.js";

export class Cart {
    private items: Map<Product, number>;

    constructor() {
        this.items = new Map<Product, number>();
    }

    public add(item: Product): void {
        const currentCount = this.items.get(item) || 0;
        this.items.set(item, currentCount + 1);
    }

    public remove(item: Product): void {
        if (!this.items.has(item)) return;

        const currentCount = this.items.get(item)!;
        if (currentCount > 1) {
            this.items.set(item, currentCount - 1);
        } else {
            this.items.delete(item);
        }
    }

    public clear(): void {
        this.items.clear();
    }

    public get getItems(): Map<Product, number> {
        return this.items;
    }

    public calculateTotal(isStudent: boolean, currentHour: number): number {
        let total = 0;
        this.items.forEach((quantity, item) => {
            total += item.calculatePrice(isStudent, currentHour) * quantity;
        });
        return total;
    }

    public printReceipt(isStudent: boolean, currentHour: number): void {
        console.log(`--- Receipt (Time: ${currentHour}:00, ISIC: ${isStudent ? "Yes" : "No"}) ---`);

        this.items.forEach((quantity, item) => {
            const finalPrice = item.calculatePrice(isStudent, currentHour);
            console.log(`> ${item.getName} x${quantity}: ${(finalPrice * quantity).toFixed(0)} Kč`);
        });

        const total = this.calculateTotal(isStudent, currentHour);
        console.log(`-----------------------------------------------`);
        console.log(`TOTAL AMOUNT: ${total.toFixed(0)} Kč`);
        console.log(`----------------------------------------------- \n`);
    }
}