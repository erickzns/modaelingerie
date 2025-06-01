// script.js

function addToCart(productName, price, imageSrc) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: productName, price: price, image: imageSrc });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function addToCartWithVariation(productName, price, imageSrc) {
    const tamanho = document.getElementById("tamanho").value;
    const cor = document.getElementById("cor").value;

    let itemName = `${productName} - ${tamanho}, ${cor}`;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: itemName, price: price, image: imageSrc });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();

    alert(`${itemName} adicionado ao carrinho`);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    // Atualiza contador em todas as páginas
    const cartCountEls = document.querySelectorAll(".cart-count");
    cartCountEls.forEach(el => {
        el.textContent = getCartCount();
    });

    if (!cartItems) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="80" />
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$${item.price.toFixed(2)}</div>
      </div>
      <button onclick="removeFromCart(${index})" class="remove-btn">🗑️</button>
    `;
        cartItems.appendChild(div);
        total += item.price;
    });

    if (cartTotal) cartTotal.textContent = total.toFixed(2);
}

function getCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length;
}