export class Product {
    constructor(name, basePrice) {
        if (!name || name.trim() === "")
            throw new Error("Name cannot be empty");
        if (basePrice < 0)
            throw new Error("Base price cannot be negative");
        this.name = name;
        this.basePrice = basePrice;
    }
    get getName() { return this.name; }
}
