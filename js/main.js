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
  initializeImageEnlarger();
});

// 2. SHOP NOW BUTTON
// ========================================
function initializeShopButtons() {
  const shopButtons = document.querySelectorAll(".hero button, .products button");
  
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
  showNotification(`"${productName}" added to cart!`);
  console.log("Cart updated:", cart);
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
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
  const products = document.querySelectorAll(".product-item");
  
  products.forEach(product => {
    const name = product.textContent.toLowerCase();
    if (name.includes(query)) {
      product.style.display = "block";
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
  const container = document.querySelector(".products-grid");
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

// 11. IMAGE ENLARGER
// ========================================
function initializeImageEnlarger() {
  document.querySelectorAll('.product-img-wrapper img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openOverlay(img.src));
  });
}

function openOverlay(src) {
  let overlay = document.getElementById('image-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'image-overlay';
    overlay.style.cssText = `
      position: fixed;
      top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.8);
      display:flex;align-items:center;justify-content:center;
      z-index:10000;
    `;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `<img src="${src}" style="max-width:90%;max-height:90%;border:4px solid white;"/>`;
}

// ========================================
// SHOP MENU NAVIGATION
// ========================================

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

  document.getElementById("categoryTitle").textContent = category + " Fashion";
}

function backToMenu() {
  document.getElementById("productsSection").style.display = "none";
  document.getElementById("shopMenu").style.display = "block";
}