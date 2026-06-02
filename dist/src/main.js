import { Food } from "./Food.js";
import { Drink } from "./Drink.js";
import { Cart } from "./Cart.js";
import { rawProducts } from "./data.js";
const cart = new Cart();
let currentCategory = "all";
// Setup interactive variables matching your engine parameters
let isStudentUser = false;
let currentHourValue = 10;
// Element references
const menuGrid = document.getElementById("menu-grid");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceDisplay = document.getElementById("total-price");
const studentToggle = document.getElementById("student-toggle");
const timeToggle = document.getElementById("time-toggle");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutCartBtn = document.getElementById("checkout");
// Convert raw JSON configurations into structured objects
const instantiatedProducts = rawProducts.map(product => {
    var _a;
    if (product.type === "Food") {
        return new Food(product.name, product.basePrice, (_a = product.ingredients) !== null && _a !== void 0 ? _a : [], product.extra);
    }
    else {
        return new Drink(product.name, product.basePrice, product.extra);
    }
});
// Render Menu Cards
function renderMenu() {
    if (!menuGrid)
        return;
    menuGrid.innerHTML = "";
    const filtered = instantiatedProducts.filter(p => {
        if (currentCategory === "all")
            return true;
        if (currentCategory === "Food")
            return p instanceof Food;
        if (currentCategory === "Drink")
            return p instanceof Drink;
        return true;
    });
    filtered.forEach(product => {
        var _a;
        const card = document.createElement("div");
        card.className = "product-card";
        const isFood = product instanceof Food;
        const typeTag = isFood ? `<span class="tag food">Jídlo</span>` : `<span class="tag drink">Nápoj</span>`;
        const details = isFood
            ? `<p class="ingredients-list">Složení: ${product.getIngredients.join(", ")}</p>`
            : `<p class="ingredients-list">Včetně zálohy na obal</p>`;
        const computedPrice = product.calculatePrice(isStudentUser, currentHourValue);
        card.innerHTML = ` 
            <div class="product-info">
                <div class="product-meta-tags">${typeTag}</div>
                <h3>${product.getName}</h3>
                ${details}
            </div>
            <div class="product-action-zone">
                <div class="price-display">
                    <div class="price-amount">${computedPrice.toFixed(2)} EUR</div>
                </div>
                <button class="btn-add" data-name="${product.getName}">Přidat</button>
            </div>
        `;
        // Bind click hook directly to the localized button instance
        (_a = card.querySelector(".btn-add")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            cart.add(product);
            renderCart();
        });
        menuGrid.appendChild(card);
    });
}
// Update Cart Display Component
function renderCart() {
    if (!cartItemsContainer || !totalPriceDisplay)
        return;
    const items = cart.getItems;
    if (items.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg">Košík je prázdný</p>`;
        totalPriceDisplay.innerText = "0.00 EUR";
        return;
    }
    cartItemsContainer.innerHTML = "";
    items.forEach(item => {
        var _a;
        const itemRow = document.createElement("div");
        itemRow.className = "cart-item";
        const price = item.calculatePrice(isStudentUser, currentHourValue);
        itemRow.innerHTML = `
            <span class="cart-item-name">${item.getName}</span>
            <div>
                <span style="margin-right:10px; font-weight:600;">${price.toFixed(2)} EUR</span>
                <button class="btn-remove-item" data-name="${item.getName}">❌</button>
            </div>
        `;
        (_a = itemRow.querySelector(".btn-remove-item")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            cart.remove(item);
            renderCart();
        });
        cartItemsContainer.appendChild(itemRow);
    });
    const total = cart.calculateTotal(isStudentUser, currentHourValue);
    totalPriceDisplay.innerText = `${total.toFixed(2)} EUR`;
}
// Attach Event Listeners to Category Bar Switchers
document.querySelectorAll(".nav-link").forEach(btn => {
    btn.addEventListener("click", (e) => {
        var _a;
        document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
        const target = e.currentTarget;
        target.classList.add("active");
        currentCategory = (_a = target.getAttribute("data-category")) !== null && _a !== void 0 ? _a : "all";
        renderMenu();
    });
});
// Sync simulation select drop-downs
studentToggle === null || studentToggle === void 0 ? void 0 : studentToggle.addEventListener("change", (e) => {
    isStudentUser = e.target.value === "true";
    renderMenu();
    renderCart();
});
timeToggle === null || timeToggle === void 0 ? void 0 : timeToggle.addEventListener("change", (e) => {
    currentHourValue = parseFloat(e.target.value);
    renderMenu();
    renderCart();
});
clearCartBtn === null || clearCartBtn === void 0 ? void 0 : clearCartBtn.addEventListener("click", () => {
    cart.clear();
    renderCart();
});
checkoutCartBtn === null || checkoutCartBtn === void 0 ? void 0 : checkoutCartBtn.addEventListener("click", () => {
    if (cart.getItems.length === 0) {
        alert("Košík je prázdný!");
        return;
    }
    alert("Objednávka byla úspěšně odeslána do kuchyně!");
    cart.clear();
    renderCart();
});
// Initial boot execution
renderMenu();
renderCart();
