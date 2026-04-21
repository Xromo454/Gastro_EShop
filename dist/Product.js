export class Product {
    name;
    basePrice;
    constructor(name, basePrice) {
        this.name = name;
        this.basePrice = basePrice;
    }
    get getPrice() {
        return this.basePrice;
    }
    get getName() {
        return this.name;
    }
}
