export abstract class Product {
    private name: string;
    protected basePrice: number;

    constructor(name: string, basePrice: number) {
        this.name = name;
        this.basePrice = basePrice;
    }

    abstract get getPrice(): number;

    get getName(): string{
        return this.name;
    };
}
