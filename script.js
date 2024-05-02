document.addEventListener('DOMContentLoaded', function() {
  let cartCount = 0;

  function updateCartCount() {
      document.querySelector('.cart-count').textContent = cartCount;
  }

  function addItemToCart(itemName, itemPrice) {
      cartCount++;
      updateCartCount();

      const cartItemHTML = `
          <div class="cart-item">
              <p>${itemName} - ${itemPrice}</p>
          </div>
      `;

      document.querySelector('.cart-items').insertAdjacentHTML('beforeend', cartItemHTML);
  }

  const addToCartButtons = document.querySelectorAll('.add-to-cart a');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function(event) {
          event.preventDefault();

          const product = button.parentElement.parentElement;
          const itemName = product.querySelector('.item-name').textContent.trim();
          const itemPrice = product.querySelector('.item-price').textContent.trim();
          

          addItemToCart(itemName, itemPrice);
      });
  });
});


// Retrieve cart items from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to update cart count
function updateCartCount() {
  document.querySelector('.cart-count').textContent = cartItems.length;
}

// Update cart count initially
updateCartCount();

// Function to create cart item HTML
function createCartItemHTML(item, id) {
  return `
    <div class="cart-item" data-id="${id}">
      <input type="checkbox" class="item-checkbox">
      <p>${item.name} - ${item.price}</p>
    </div>
  `;
}

// Function to update cart items HTML
function updateCartItemsHTML() {
  const cartItemsHTML = cartItems.map((item, index) => createCartItemHTML(item, index)).join('');
  document.querySelector('.cart-items').innerHTML = cartItemsHTML;
}

// Update cart items HTML initially
updateCartItemsHTML();

// Toggle cart items dropdown
document.getElementById('cart-img').addEventListener('click', function() {
  const dropdown = document.querySelector('.cart-items');
  dropdown.classList.toggle('show');
});

// Add event listener to the remove button
document.getElementById('remove-selected').addEventListener('click', function() {
  const checkboxes = document.querySelectorAll('.item-checkbox');
  const updatedCartItems = [];
  cartItems.forEach((item, index) => {
    if (!checkboxes[index].checked) {
      updatedCartItems.push(item); // Keep the item if checkbox is not checked
    }
  });
  cartItems = updatedCartItems; // Update cartItems array
  localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
  updateCartItemsHTML(); // Update cart items display
  updateCartCount(); // Update cart count
});