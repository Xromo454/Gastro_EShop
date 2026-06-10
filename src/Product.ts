export abstract class Product {
    private name: string;
    protected basePrice: number;

    constructor(name: string, basePrice: number) {
        if (!name || name.trim() === "") throw new Error("Name cannot be empty");
        if (basePrice < 0) throw new Error("Base price cannot be negative");

        this.name = name;
        this.basePrice = basePrice;
    }

    public abstract calculatePrice(isStudent: boolean, currentHour: number): number;

    public get getName(): string { return this.name; }
}



