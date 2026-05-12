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

    public clear(): void {
        this.items = [];
    }

    public calculateTotal(isStudent: boolean, currentHour: number): number {
        return this.items.reduce((total, item) => total + item.calculatePrice(isStudent, currentHour), 0);
    }

    public printReceipt(isStudent: boolean, currentHour: number): void {
        console.log(`--- Receipt (Time: ${currentHour}:00, ISIC: ${isStudent ? "Yes" : "No"}) ---`);

        this.items.forEach(item => {
            const finalPrice = item.calculatePrice(isStudent, currentHour);
            console.log(`> ${item.getName}: ${finalPrice.toFixed(2)} EUR`);
        });

        const total = this.calculateTotal(isStudent, currentHour);
        console.log(`-----------------------------------------------`);
        console.log(`TOTAL AMOUNT: ${total.toFixed(2)} EUR`);
        console.log(`----------------------------------------------- \n`);
    }
}