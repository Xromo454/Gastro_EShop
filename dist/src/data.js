export const rawProducts = [
    {
        type: "Food",
        name: "Lunch Box (Kuřecí s rýží)",
        basePrice: 165.00,
        ingredients: ["Rýže", "Kuřecí maso", "Zelenina", "Omáčka"],
        extra: 15.00
    },
    {
        type: "Food",
        name: "Smažený sýr v housce",
        basePrice: 120.00,
        ingredients: ["Smažený eidam", "Houska", "Tatarská omáчка", "Salát"],
        extra: 10.00
    },
    {
        type: "Food",
        name: "Hovězí Burger Klasik",
        basePrice: 185.00,
        ingredients: ["Hovězí maso", "Bulka", "Cheddar", "Kyselá okurka", "Cibulová majonéza"],
        extra: 15.00
    },
    {
        type: "Food",
        name: "Domácí Svíčková s knedlíkem",
        basePrice: 195.00,
        ingredients: ["Hovězí pečeně", "Smetanová omáčka", "Karlovarský knedlík", "Brusinky"],
        extra: 20.00
    },
    {
        type: "Food",
        name: "Čerstvý Zahradní Salát",
        basePrice: 95.00,
        ingredients: ["Ledový salát", "Rajčata", "Okurka", "Balkánský sýr", "Olivový olej"],
        extra: 10.00
    },
    {
        type: "Drink",
        name: "Coca-Cola (Plech)",
        basePrice: 45.00,
        extra: 5.00
    },
    {
        type: "Drink",
        name: "Pilsner Urquell (Sklo)",
        basePrice: 55.00,
        extra: 3.00
    },
    {
        type: "Drink",
        name: "Domácí Pomerančová Limonáda",
        basePrice: 65.00,
        extra: 0.00
    },
    {
        type: "Combo",
        name: "🍔 Student Menu (Burger + Cola)",
        basePrice: 210.00,
        items: ["Hovězí Burger Klasik", "Coca-Cola (Plech)"],
        extra: 0
    },
    {
        type: "Combo",
        name: "🥪 Lehký Oběd (Salát + Voda)",
        basePrice: 140.00,
        items: ["Čerstvý Zahradní Salát", "Domácí Pomerančová Limonáda"],
        extra: 0
    },
    {
        type: "Combo",
        name: "🐷 Tradiční Česko (Svíčková + Pivo)",
        basePrice: 230.00, // Выгода! Отдельно вышло бы 195 + 55 = 250 Kč
        items: ["Domácí Svíčková s knedlíkem", "Pilsner Urquell (Sklo)"],
        extra: 0
    },
    {
        type: "Combo",
        name: "🧀 Smažák Klasik (Sýr + Limonáda)",
        basePrice: 165.00, // Выгода! Отдельно вышло бы 120 + 65 = 185 Kč
        items: ["Smažený sýr v housce", "Domácí Pomerančová Limonáda"],
        extra: 0
    },
    {
        type: "Combo",
        name: "📦 Maxi Lunch Box (Jídlo + Cola)",
        basePrice: 185.00, // Выгода! Отдельно вышло бы 165 + 45 = 210 Kč
        items: ["Lunch Box (Kuřecí s rýží)", "Coca-Cola (Plech)"],
        extra: 0
    },
    {
        type: "Combo",
        name: "👑 Executive Menu (Burger + Smažák + Pivo)",
        basePrice: 310.00, // Королевский выбор! Отдельно вышло бы 185 + 120 + 55 = 360 Kč
        items: ["Hovězí Burger Klasik", "Smažený sýr v housce", "Pilsner Urquell (Sklo)"],
        extra: 0
    }
];
