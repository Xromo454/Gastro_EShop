import { Food } from "./Food.js";
import { Drink } from "./Drink.js";
import { Cart } from "./Cart.js";
import { rawProducts } from "./data.js";
import { Product } from "./Product.js";

const cart = new Cart();
let currentCategory: string = "all";

// Setup interactive variables matching your engine parameters
let isStudentUser: boolean = false;
let currentHourValue: number = 10;

// Element references
const menuGrid = document.getElementById("menu-grid") as HTMLDivElement;
const cartItemsContainer = document.getElementById("cart-items") as HTMLDivElement;
const totalPriceDisplay = document.getElementById("total-price") as HTMLSpanElement;

const studentToggle = document.getElementById("student-toggle") as HTMLSelectElement;
const timeToggle = document.getElementById("time-toggle") as HTMLSelectElement;
const clearCartBtn = document.getElementById("clear-cart") as HTMLButtonElement;
const checkoutCartBtn = document.getElementById("checkout") as HTMLButtonElement;

// Convert raw JSON configurations into structured objects
const instantiatedProducts: Product[] = rawProducts.map(product => {
    if (product.type === "Food") {
        return new Food(product.name, product.basePrice, product.ingredients ?? [], product.extra);
    } else {
        return new Drink(product.name, product.basePrice, product.extra);
    }
});

// Render Menu Cards
function renderMenu(): void {
    if (!menuGrid) return;
    menuGrid.innerHTML = "";

    const filtered = instantiatedProducts.filter(p => {
        if (currentCategory === "all") return true;
        if (currentCategory === "Food") return p instanceof Food;
        if (currentCategory === "Drink") return p instanceof Drink;
        return true;
    });

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const isFood = product instanceof Food;
        const typeTag = isFood ? `<span class="tag food">Jídlo</span>` : `<span class="tag drink">Nápoj</span>`;
        const details = isFood 
            ? `<p class="ingredients-list">Složení: ${(product as Food).getIngredients.join(", ")}</p>` 
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
        card.querySelector(".btn-add")?.addEventListener("click", () => {
            cart.add(product);
            renderCart();
        });

        menuGrid.appendChild(card);
    });
}

// Update Cart Display Component
function renderCart(): void {
    if (!cartItemsContainer || !totalPriceDisplay) return;
    
    const items = cart.getItems;
    
    if (items.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg">Košík je prázdný</p>`;
        totalPriceDisplay.innerText = "0.00 EUR";
        return;
    }

    cartItemsContainer.innerHTML = "";
    items.forEach(item => {
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

        itemRow.querySelector(".btn-remove-item")?.addEventListener("click", () => {
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
        document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
        const target = e.currentTarget as HTMLButtonElement;
        target.classList.add("active");
        currentCategory = target.getAttribute("data-category") ?? "all";
        renderMenu();
    });
});

// Sync simulation select drop-downs
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

checkoutCartBtn?.addEventListener("click", () => {
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