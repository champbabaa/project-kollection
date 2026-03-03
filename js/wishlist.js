// ========================================
// O.K Kollection - Wishlist Management
// ========================================

// Initialize wishlist from localStorage
const wishlist = [];

document.addEventListener("DOMContentLoaded", function () {
  loadWishlistFromLocalStorage();
  initializeWishlistButtons();
});


// INITIALIZE WISHLIST BUTTONS
// ========================================
function initializeWishlistButtons() {
  console.log("initializing wishlist buttons");
  document.querySelectorAll(".wishlist-btn").forEach(button => {
    const productId = button.getAttribute("data-product-id");
    
    // Check if product is in wishlist and update button state
    if (isInWishlist(productId)) {
      console.log("button", productId, "is already in wishlist");
      button.classList.add("active");
      button.style.color = '#FF1493';
      updateButtonIcon(button, true);
    }

    button.addEventListener("click", function (e) {
      e.preventDefault();
      toggleWishlist(this);
    });
  });
}


// TOGGLE WISHLIST
// ========================================
function toggleWishlist(button) {
  const productId = button.getAttribute("data-product-id");
  const productName = button.getAttribute("data-product-name");
  const productPrice = button.getAttribute("data-product-price");
  const productImage = button.getAttribute("data-product-image");
  console.log("toggleWishlist called for", productId, "current active?", button.classList.contains('active'));

  if (isInWishlist(productId)) {
    console.log("removing", productId);
    removeFromWishlist(productId);
    button.classList.remove("active");
    button.style.color = 'lightpink';
    updateButtonIcon(button, false);
    showWishlistNotification(`"${productName}" removed from wishlist`);
  } else {
    console.log("adding", productId);
    addToWishlist({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage
    });
    button.classList.add("active");
    button.style.color = '#FF1493';
    updateButtonIcon(button, true);
    showWishlistNotification(`"${productName}" added to wishlist`);
  }

  saveWishlistToLocalStorage();
}


// UPDATE BUTTON ICON
// ========================================
function updateButtonIcon(button, isActive) {
  const icon = button.querySelector("i");
  
  if (!icon) return;

  if (isActive) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
  }
}


// ADD TO WISHLIST
// ========================================
function addToWishlist(product) {
  if (!isInWishlist(product.id)) {
    wishlist.push(product);
  }
}


// REMOVE FROM WISHLIST
// ========================================
function removeFromWishlist(productId) {
  const index = wishlist.findIndex(item => item.id === productId);
  if (index > -1) {
    wishlist.splice(index, 1);
  }
}


// CHECK IF PRODUCT IN WISHLIST
// ========================================
function isInWishlist(productId) {
  return wishlist.some(item => item.id === productId);
}


// GET WISHLIST
// ========================================
function getWishlist() {
  return wishlist;
}


// GET WISHLIST COUNT
// ========================================
function getWishlistCount() {
  return wishlist.length;
}


// CLEAR WISHLIST
// ========================================
function clearWishlist() {
  wishlist.length = 0;
  saveWishlistToLocalStorage();
  
  // Update all buttons
  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    btn.classList.remove("active");
    btn.style.color = 'lightpink';
    updateButtonIcon(btn, false);
  });
  
  showWishlistNotification("Wishlist cleared");
}


// SAVE TO LOCALSTORAGE
// ========================================
function saveWishlistToLocalStorage() {
  localStorage.setItem("okKollectionWishlist", JSON.stringify(wishlist));
}


// LOAD FROM LOCALSTORAGE
// ========================================
function loadWishlistFromLocalStorage() {
  const savedWishlist = localStorage.getItem("okKollectionWishlist");
  if (savedWishlist) {
    wishlist.splice(0, wishlist.length, ...JSON.parse(savedWishlist));
  }
}


// WISHLIST NOTIFICATION
// ========================================
function showWishlistNotification(message, duration = 2000) {
  const existing = document.querySelector(".wishlist-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = "wishlist-notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #FF6B9D;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    font-weight: bold;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, duration);
}


// UPDATE WISHLIST COUNTER (optional)
// ========================================
function updateWishlistCounter() {
  const counter = document.querySelector(".wishlist-count");
  if (counter) {
    counter.textContent = getWishlistCount();
  }
}