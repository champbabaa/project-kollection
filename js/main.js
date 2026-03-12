// ========================================
// O.K Kollection - Main JavaScript
// ========================================

// 1. PAGE INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("O.K Kollection website loaded!");
  
  initializeShopButtons();
  initializeNavigation();
  initializeSearchFunctionality();
  loadCartFromLocalStorage();
  renderCartPanel();
  initializeImageEnlarger();
});

// 2. SHOP NOW BUTTON
// ========================================
function initializeShopButtons() {
  // On the landing page we use the built-in `showMenu` handler.
  // For other product pages, keep the default navigation behavior.
  const shopButtons = document.querySelectorAll(".products button");

  shopButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "product.html";
    });
  });
}

// 3. NAVIGATION FUNCTIONALITY
// ========================================
function initializeNavigation() {
  const navLinks = document.querySelectorAll("nav a");
  
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      // Add active class to current page
      navLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

// 4. SHOPPING CART (localStorage)
// ========================================
const cart = [];

function addToCart(productId, productName, price) {
  const existingProduct = cart.find(item => item.id === productId);
  
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: price,
      quantity: 1
    });
  }
  
  saveCartToLocalStorage();
  renderCartPanel();
  showNotification(`"${productName}" added to cart!`);
  console.log("Cart updated:", cart);
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    renderCartPanel();
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem("okKollectionCart", JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("okKollectionCart");
  if (savedCart) {
    cart.splice(0, cart.length, ...JSON.parse(savedCart));
  }
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Expose cart helpers for other pages (e.g., checkout)
function getCart() {
  return cart;
}

function clearCart() {
  cart.length = 0;
  saveCartToLocalStorage();
  renderCartPanel();
}

function renderCartPanel() {
  const panel = document.getElementById('cart-panel');
  if (!panel) return;

  const items = getCart();
  if (items.length === 0) {
    panel.innerHTML = `
      <div class="cart-header">
        <h2>Your Cart</h2>
      </div>
      <div class="cart-empty">Your cart is empty.</div>
    `;
    return;
  }

  const rows = items.map(item => {
    return `
      <div class="cart-item">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">x${item.quantity}</div>
        <div class="cart-item-price">KES ${item.price * item.quantity}</div>
        <button class="remove-cart-btn" data-id="${item.id}">✕</button>
      </div>
    `;
  }).join('');

  panel.innerHTML = `
    <div class="cart-header">
      <h2>Your Cart</h2>
      <div class="cart-total">Total: KES ${getCartTotal()}</div>
    </div>
    <div class="cart-items">${rows}</div>
    <button class="cart-checkout-btn" onclick="location.href='../public files/checkout.html'">Go to Checkout</button>
  `;

  panel.querySelectorAll('.remove-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
    });
  });
}

// 5. SEARCH FUNCTIONALITY
// ========================================
function initializeSearchFunctionality() {
  const searchInput = document.querySelector(".search-input");
  
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      const query = e.target.value.toLowerCase();
      filterProducts(query);
    });
  }
}

function filterProducts(query) {
  const products = document.querySelectorAll(".product-card");
  
  products.forEach(product => {
    const name = product.textContent.toLowerCase();
    if (name.includes(query)) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });
}

// 6. NOTIFICATIONS
// ========================================
function showNotification(message, duration = 2000) {
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();
  
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, duration);
}

// 7. PRICE FILTER
// ========================================
function filterByPrice(minPrice, maxPrice) {
  const products = document.querySelectorAll(".product-item");
  
  products.forEach(product => {
    const price = parseFloat(product.getAttribute("data-price"));
    
    if (price >= minPrice && price <= maxPrice) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// 8. SORT PRODUCTS
// ========================================
function sortProducts(sortBy) {
  const container = document.querySelector(".products-container");
  const products = Array.from(document.querySelectorAll(".product-item"));
  
  products.sort((a, b) => {
    if (sortBy === "price-low") {
      return parseFloat(a.getAttribute("data-price")) - 
             parseFloat(b.getAttribute("data-price"));
    } else if (sortBy === "price-high") {
      return parseFloat(b.getAttribute("data-price")) - 
             parseFloat(a.getAttribute("data-price"));
    } else if (sortBy === "name") {
      return a.textContent.localeCompare(b.textContent);
    }
  });
  
  products.forEach(product => container.appendChild(product));
}

// 9. FORM VALIDATION
// ========================================
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input[required], textarea[required]");
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = "red";
      isValid = false;
    } else {
      input.style.borderColor = "";
    }
  });
  
  return isValid;
}

// 10. SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 11. IMAGE ENLARGER (double-click to zoom)
// ========================================

const productImages = document.querySelectorAll('.product-card img');
productImages.forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('dblclick', () => openOverlay(img.src));
});

function openOverlay(src) {
  let overlay = document.getElementById('image-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'image-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: zoom-out;
    `;

    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `<img src="${src}" style="max-width:90%;max-height:90%;border:4px solid white;box-shadow:0 0 0 100vw rgba(0,0,0,0.7);"/>`;

  // Close on escape
  const escListener = (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escListener);
    }
  };
  document.addEventListener('keydown', escListener);
}

// ========================================
// SHOP MENU NAVIGATION
// ========================================

// Utility used to build a large product list from an array of image paths.
function createProductsFromImages(prefix, images) {
  return images.map((img, index) => {
    const idx = index + 1;
    return {
      id: `${prefix}-${idx}`,
      name: `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} Item ${idx}`,
      price: 800 + (idx % 5) * 100,
      image: img,
      description: `Stylish ${prefix} item #${idx}`
    };
  });
}

const womenImagePaths = [
  "images/IMG-20260204-WA0001.jpg",
  "images/IMG-20260204-WA0002.jpg",
  "images/IMG-20260204-WA0003.jpg",
  "images/IMG-20260204-WA0004.jpg",
  "images/IMG-20260204-WA0005.jpg",
  "images/IMG-20260204-WA0006.jpg",
  "images/IMG-20260204-WA0007.jpg",
  "images/IMG-20260204-WA0008.jpg",
  "images/IMG-20260204-WA0009.jpg",
  "images/IMG-20260204-WA0010.jpg",
  "images/IMG-20260204-WA0011.jpg",
  "images/IMG-20260204-WA0012.jpg",
  "images/IMG-20260204-WA0013.jpg",
  "images/IMG-20260204-WA0014.jpg",
  "images/IMG-20260204-WA0015.jpg",
  "images/IMG-20260204-WA0016.jpg",
  "images/IMG-20260204-WA0017.jpg",
  "images/IMG-20260204-WA0018.jpg",
  "images/IMG-20260204-WA0019.jpg",
  "images/IMG-20260204-WA0020.jpg",
  "images/IMG-20260204-WA0021.jpg",
  "images/IMG-20260204-WA0022.jpg",
  "images/IMG-20260204-WA0023.jpg",
  "images/IMG-20260204-WA0024.jpg",
  "images/IMG-20260204-WA0025.jpg",
  "images/IMG-20260204-WA0026.jpg",
  "images/IMG-20260204-WA0027.jpg",
  "images/IMG-20260204-WA0028.jpg",
  "images/IMG-20260204-WA0029.jpg",
  "images/IMG-20260204-WA0030.jpg",
  "images/IMG-20260204-WA0031.jpg",
  "images/IMG-20260204-WA0032.jpg",
  "images/IMG-20260204-WA0033.jpg",
  "images/IMG-20260204-WA0034.jpg",
  "images/IMG-20260204-WA0035.jpg",
  "images/IMG-20260204-WA0036.jpg",
  "images/IMG-20260204-WA0037.jpg",
  "images/IMG-20260204-WA0038.jpg",
  "images/IMG-20260204-WA0039.jpg",
  "images/IMG-20260204-WA0040.jpg",
  "images/IMG-20260204-WA0041.jpg",
  "images/IMG-20260204-WA0042.jpg",
  "images/IMG-20260204-WA0043.jpg",
  "images/IMG-20260204-WA0044.jpg",
  "images/IMG-20260204-WA0045.jpg",
  "images/IMG-20260204-WA0046.jpg",
  "images/IMG-20260204-WA0047.jpg",
  "images/IMG-20260204-WA0048.jpg",
  "images/IMG-20260204-WA0049.jpg",
  "images/IMG-20260204-WA0050.jpg",
  "images/IMG-20260204-WA0051.jpg",
  "images/IMG-20260204-WA0052.jpg",
  "images/IMG-20260204-WA0053.jpg",
  "images/IMG-20260204-WA0054.jpg",
  "images/IMG-20260204-WA0056.jpg",
  "images/IMG-20260204-WA0057.jpg",
  "images/IMG-20260204-A0057.jpg"
];

const productCatalog = {
  mens: [
    {
      id: "men-1",
      name: "Men's Classic Shirt",
      price: 950,
      image: "images/clothing/IMG-20260204-WA0007.jpg",
      description: "Elegant everyday shirt"
    },
    {
      id: "men-2",
      name: "Men's Denim Jacket",
      price: 1500,
      image: "images/clothing/IMG-20260204-WA0001.jpg",
      description: "Casual denim jacket"
    },
    {
      id: "men-3",
      name: "Men's Joggers",
      price: 800,
      image: "images/clothing/IMG-20260204-WA0002.jpg",
      description: "Comfort-fit joggers"
    }
  ],
  womens: createProductsFromImages("women", womenImagePaths),
  kids: [
    {
      id: "kids-1",
      name: "Kids Graphic Tee",
      price: 450,
      image: "images/clothing/IMG-20260204-WA0004.jpg",
      description: "Fun printed tee"
    },
    {
      id: "kids-2",
      name: "Kids Hoodie",
      price: 650,
      image: "images/clothing/IMG-20260204-WA0005.jpg",
      description: "Warm and cozy"
    },
    {
      id: "kids-3",
      name: "Kids Joggers",
      price: 550,
      image: "images/clothing/IMG-20260204-WA0006.jpg",
      description: "Play-ready bottoms"
    }
  ]
};

function renderProductsForCategory(category) {
  const products = productCatalog[category] || [];
  const grid = document.getElementById("productsGrid");
  const title = document.getElementById("categoryTitle");

  const displayName = {
    mens: "Men's Fashion",
    womens: "Women's Fashion",
    kids: "Kids' Fashion"
  }[category] || "Products";

  title.textContent = displayName;

  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `<div class="empty-state">No products found for this category.</div>`;
    return;
  }

  grid.innerHTML = products
    .map(product => {
      return `
        <div class="product-card" data-product-id="${product.id}" data-price="${product.price}">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">KES ${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
          </div>
        </div>
      `;
    })
    .join("");

  grid.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);
      addToCart(id, name, price);
    });
  });
}

function showMenu() {
  document.getElementById("hero").style.display = "none";
  document.getElementById("shopMenu").style.display = "block";
}

function backToHome() {
  document.getElementById("shopMenu").style.display = "none";
  document.getElementById("hero").style.display = "block";
}

function showCategory(category) {
  document.getElementById("shopMenu").style.display = "none";
  document.getElementById("productsSection").style.display = "block";
  renderProductsForCategory(category);
}

function backToMenu() {
  document.getElementById("productsSection").style.display = "none";
  document.getElementById("shopMenu").style.display = "block";
}