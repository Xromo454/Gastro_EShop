export class Cart {
    constructor() {
        this.items = new Map();
    }
    add(item) {
        const currentCount = this.items.get(item) || 0;
        this.items.set(item, currentCount + 1);
    }
    remove(item) {
        if (!this.items.has(item))
            return;
        const currentCount = this.items.get(item);
        if (currentCount > 1) {
            this.items.set(item, currentCount - 1);
        }
        else {
            this.items.delete(item);
        }
    }
    clear() {
        this.items.clear();
    }
    get getItems() {
        return this.items;
    }
    calculateTotal(isStudent, currentHour) {
        let total = 0;
        this.items.forEach((quantity, item) => {
            total += item.calculatePrice(isStudent, currentHour) * quantity;
        });
        return total;
    }
    printReceipt(isStudent, currentHour) {
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
