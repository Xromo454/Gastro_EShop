export class Product {
    private name: string;
    protected basePrice: number;

    constructor(name: string, basePrice: number) {
        this.name = name;
        this.basePrice = basePrice;
    }

    get getPrice(): number {
        return this.basePrice;
    }

    get getName(): string {
        return this.name;
    }
}
