import { Food } from "./Food.js";
import { Drink } from "./Drink.js";
import { Cart } from "./Cart.js";
import { rawProducts } from "./data.js";
const cart = new Cart();
rawProducts.forEach(product => {
    var _a;
    if (product.type === "Food") {
        cart.add(new Food(product.name, product.basePrice, (_a = product.ingredients) !== null && _a !== void 0 ? _a : [], product.extra));
    }
    else if (product.type === "Drink") {
        cart.add(new Drink(product.name, product.basePrice, product.extra));
    }
});
cart.printReceipt(true, 15);
cart.printReceipt(false, 15);
cart.printReceipt(true, 10);
cart.printReceipt(false, 10);
