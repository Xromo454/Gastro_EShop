import { Food } from "./Food.js";
import { Drink } from "./Drink.js";
import { Cart } from "./Cart.js";
import { Combo } from "./Combo.js";
import { rawProducts } from "./data.js";
const cart = new Cart();
let currentCategory = "all";
let isStudentUser = false;
let currentHourValue = 7;
const menuGrid = document.getElementById("menu-grid");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceDisplay = document.getElementById("total-price");
const studentToggle = document.getElementById("student-toggle");
const timeToggle = document.getElementById("time-toggle");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");
// Создаем продукты ОДИН раз при запуске, чтобы ссылки в памяти были статичны
const standaloneProducts = rawProducts
    .filter(p => p.type !== "Combo")
    .map(product => {
    var _a;
    if (product.type === "Food") {
        return new Food(product.name, product.basePrice, (_a = product.ingredients) !== null && _a !== void 0 ? _a : [], product.extra);
    }
    else {
        return new Drink(product.name, product.basePrice, product.extra);
    }
});
const comboProducts = rawProducts
    .filter(p => p.type === "Combo")
    .map(combo => {
    const comboItemsList = combo.items || [];
    const components = standaloneProducts.filter(p => comboItemsList.indexOf(p.getName) !== -1);
    return new Combo(combo.name, combo.basePrice, components);
});
const instantiatedProducts = [...standaloneProducts, ...comboProducts];
function renderMenu() {
    if (!menuGrid)
        return;
    menuGrid.innerHTML = "";
    const filtered = instantiatedProducts.filter(product => {
        if (currentCategory === "all")
            return true;
        if (currentCategory === "food")
            return product instanceof Food;
        if (currentCategory === "drink")
            return product instanceof Drink;
        if (currentCategory === "combo")
            return product instanceof Combo;
        return true;
    });
    filtered.forEach(product => {
        var _a;
        const card = document.createElement("div");
        card.className = "product-card";
        let productType = "Food";
        if (product instanceof Drink)
            productType = "Drink";
        if (product instanceof Combo)
            productType = "Combo";
        let typeTag = "";
        let details = "";
        switch (productType) {
            case "Food":
                typeTag = `<span class="tag food">Jídlo</span>`;
                details = `<p class="ingredients-list">Složení: ${product.getIngredients.join(", ")}</p>`;
                break;
            case "Drink":
                typeTag = `<span class="tag drink">Nápoj</span>`;
                details = `<p class="ingredients-list">Včetně zálohy na obal</p>`;
                break;
            case "Combo":
                typeTag = `<span class="tag combo" style="background: #fef5e7; color: #e67e22; border: 1px solid #f39c12; font-weight: bold; padding: 2px 8px; border-radius: 4px;">Combo</span>`;
                const comboItemsNames = product.getItems.map(item => item.getName).join(" + ");
                details = `<p class="ingredients-list" style="color: #e67e22; font-weight: 600;">Menu obsahuje: ${comboItemsNames}</p>`;
                break;
        }
        const finalPrice = product.calculatePrice(isStudentUser, currentHourValue);
        const originalPrice = product.calculatePrice(false, 10);
        let priceHTML = "";
        if (finalPrice < originalPrice) {
            priceHTML = `
                <div class="price-box">
                    <span class="old-price">${originalPrice.toFixed(0)} Kč</span>
                    <span class="price-amount">${finalPrice.toFixed(0)} Kč</span>
                    <span class="badge-sleva">SLEVA</span>
                </div>
            `;
        }
        else {
            priceHTML = `
                <div class="price-box">
                    <span class="price-amount">${finalPrice.toFixed(0)} Kč</span>
                </div>
            `;
        }
        // 4. СБОРКА КАРТОЧКИ
        card.innerHTML = `
            <div class="product-info">
                <div class="product-meta-tags">${typeTag}</div>
                <h3>${product.getName}</h3>
                ${details}
            </div>
            <div class="product-action-zone">
                ${priceHTML}
                <button class="btn-add" data-name="${product.getName}">Přidat</button>
            </div>
        `;
        (_a = card.querySelector(".btn-add")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            cart.add(product);
            renderCart();
        });
        menuGrid.appendChild(card);
    });
}
function renderCart() {
    if (!cartItemsContainer || !totalPriceDisplay)
        return;
    const itemsMap = cart.getItems;
    if (itemsMap.size === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg">Košík je prázdný</p>`;
        totalPriceDisplay.innerText = "0 Kč";
        return;
    }
    cartItemsContainer.innerHTML = "";
    itemsMap.forEach((quantity, item) => {
        var _a;
        const itemRow = document.createElement("div");
        itemRow.className = "cart-item";
        const singlePrice = item.calculatePrice(isStudentUser, currentHourValue);
        const totalItemPrice = singlePrice * quantity;
        itemRow.innerHTML = `
            <span class="cart-item-name">${item.getName} <b style="color: #e74c3c; margin-left: 5px;">x${quantity}</b></span>
            <span class="cart-item-price">${totalItemPrice.toFixed(0)}&nbsp;Kč</span>
            <button class="btn-remove-item" data-name="${item.getName}">❌</button>
        `;
        (_a = itemRow.querySelector(".btn-remove-item")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            cart.remove(item);
            renderCart();
        });
        cartItemsContainer.appendChild(itemRow);
    });
    const total = cart.calculateTotal(isStudentUser, currentHourValue);
    totalPriceDisplay.innerText = `${total.toFixed(0)} Kč`;
}
// category listener
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
checkoutBtn === null || checkoutBtn === void 0 ? void 0 : checkoutBtn.addEventListener("click", () => {
    if (cart.getItems.size === 0) {
        alert("Košík je prázdný!");
        return;
    }
    alert("Objednávka byla úspěšně odeslána!");
    cart.clear();
    renderCart();
});
// render
renderMenu();
renderCart();
