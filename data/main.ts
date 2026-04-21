import { Food } from "./Food.js";
import { Drink } from "./Drink.js";
import { Cart } from "./Cart.js";


const cart = new Cart();
const pizza = new Food("Pizza", 8, ["Dough", "Tomato Sauce", "Cheese"], 1);
const cola = new Drink("Cola", 2, 0.5);


cart.add(pizza);
cart.add(cola);
console.log(cart.getTotal);
console.log(pizza.getIngredients);