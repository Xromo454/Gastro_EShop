import { Food } from "./Food.js";
import { Drink } from "./Drink.js";
import { Cart } from "./Cart.js";
import { Combo } from "./Combo.js";
import { rawProducts } from "./data.js";
import { Product } from "./Product.js";

const cart = new Cart();
let currentCategory: string = "all";
let isStudentUser: boolean = false;
let currentHourValue: number = 7;

const menuGrid = document.getElementById("menu-grid") as HTMLDivElement;
const cartItemsContainer = document.getElementById("cart-items") as HTMLDivElement;
const totalPriceDisplay = document.getElementById("total-price") as HTMLSpanElement;

const studentToggle = document.getElementById("student-toggle") as HTMLSelectElement;
const timeToggle = document.getElementById("time-toggle") as HTMLSelectElement;
const clearCartBtn = document.getElementById("clear-cart") as HTMLButtonElement;
const checkoutBtn = document.getElementById("checkout") as HTMLButtonElement;

// Создаем продукты ОДИН раз при запуске, чтобы ссылки в памяти были статичны
const standaloneProducts: Product[] = rawProducts
    .filter(p => p.type !== "Combo")
    .map(product => {
        if (product.type === "Food") {
            return new Food(product.name, product.basePrice, product.ingredients ?? [], product.extra);
        } else {
            return new Drink(product.name, product.basePrice, product.extra);
        }
    });
const comboProducts: Product[] = rawProducts
    .filter(p => p.type === "Combo")
    .map(combo => {
        const comboItemsList = combo.items || [];
        const components = standaloneProducts.filter(p => comboItemsList.indexOf(p.getName) !== -1);
        return new Combo(combo.name, combo.basePrice, components);
    });
const instantiatedProducts: Product[] = [...standaloneProducts, ...comboProducts];
function renderMenu(): void {
    if (!menuGrid) return;
    menuGrid.innerHTML = "";
    const filtered = instantiatedProducts.filter(product => {
        if (currentCategory === "all") return true;
        if (currentCategory === "food") return product instanceof Food;
        if (currentCategory === "drink") return product instanceof Drink;
        if (currentCategory === "combo") return product instanceof Combo;
        return true;
    });
    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card"

        let productType: "Food" | "Drink" | "Combo" = "Food";
        if (product instanceof Drink) productType = "Drink";
        if (product instanceof Combo) productType = "Combo";

        let typeTag = "";
        let details = "";

        switch (productType) {
            case "Food":
                typeTag = `<span class="tag food">Jídlo</span>`;
                details = `<p class="ingredients-list">Složení: ${(product as Food).getIngredients.join(", ")}</p>`;
                break;
            case "Drink":
                typeTag = `<span class="tag drink">Nápoj</span>`;
                details = `<p class="ingredients-list">Včetně zálohy na obal</p>`;
                break;
            case "Combo":
                typeTag = `<span class="tag combo" style="background: #fef5e7; color: #e67e22; border: 1px solid #f39c12; font-weight: bold; padding: 2px 8px; border-radius: 4px;">Combo</span>`;

                const comboItemsNames = (product as Combo).getItems.map(item => item.getName).join(" + ");
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
        } else {
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

        card.querySelector(".btn-add")?.addEventListener("click", () => {
            cart.add(product);
            renderCart();
        });

        menuGrid.appendChild(card);
    });
}


function renderCart(): void {
    if (!cartItemsContainer || !totalPriceDisplay) return;

    const itemsMap = cart.getItems;


    if (itemsMap.size === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg">Košík je prázdný</p>`;
        totalPriceDisplay.innerText = "0 Kč";
        return;
    }

    cartItemsContainer.innerHTML = "";


    itemsMap.forEach((quantity, item) => {
        const itemRow = document.createElement("div");
        itemRow.className = "cart-item";

        const singlePrice = item.calculatePrice(isStudentUser, currentHourValue);
        const totalItemPrice = singlePrice * quantity;

        itemRow.innerHTML = `
            <span class="cart-item-name">${item.getName} <b style="color: #e74c3c; margin-left: 5px;">x${quantity}</b></span>
            <span class="cart-item-price">${totalItemPrice.toFixed(0)}&nbsp;Kč</span>
            <button class="btn-remove-item" data-name="${item.getName}">❌</button>
        `;

        itemRow.querySelector(".btn-remove-item")?.addEventListener("click", () => {
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
        document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
        const target = e.currentTarget as HTMLButtonElement;
        target.classList.add("active");
        currentCategory = target.getAttribute("data-category") ?? "all";
        renderMenu();
    });
});

studentToggle?.addEventListener("change", (e) => {
    isStudentUser = (e.target as HTMLSelectElement).value === "true";
    renderMenu();
    renderCart();
});

timeToggle?.addEventListener("change", (e) => {
    currentHourValue = parseFloat((e.target as HTMLSelectElement).value);
    renderMenu();
    renderCart();
});

clearCartBtn?.addEventListener("click", () => {
    cart.clear();
    renderCart();
});


checkoutBtn?.addEventListener("click", () => {
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