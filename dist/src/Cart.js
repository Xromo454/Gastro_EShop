export class Cart {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
    clear() {
        this.items = [];
    }
    calculateTotal(isStudent, currentHour) {
        return this.items.reduce((total, item) => total + item.calculatePrice(isStudent, currentHour), 0);
    }
    printReceipt(isStudent, currentHour) {
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
    get getItems() {
        return this.items;
    }
}
let zxc = [1, 3, 4, 5, 6];
console.log(zxc.splice(2, 0));
console.log(zxc);
