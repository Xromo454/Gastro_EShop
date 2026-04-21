export class Cart {
    items = [];
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
    get getTotal() {
        return this.items.reduce((sum, item) => sum + item.getPrice, 0);
    }
}
const a = new Cart();
