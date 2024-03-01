//Add item to the cart
let cartItems = [];
function addToCart() {
    const addToCartButtons = document.querySelectorAll('.btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement; // Get the parent element of the button (product container)
            const productName = product.querySelector('.name').innerText;
            const productPrice = parseFloat(product.querySelector('.price').innerText);
            const productQtyElement = product.querySelector('.qty');
            const productQty = productQtyElement ? parseInt(productQtyElement.value) : 1;
            const productImage = product.querySelector('img').src;

            // Create a product object
            const item = {
                image: productImage,
                name: productName,
                quantity: productQty,
                price: productPrice                
            };

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Check if the item is already in the cart
            const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
            if (!existingItem) {
                cartItems.push(item);
                alert('Item added to cart!');
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                // Update the cart display
                updateCartDisplay();
            } else {
                alert("Item already exists in the cart.");
            }
        });
    });
}

// Update item in cart and display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    let totalPrice = 0; // Initialize total price

    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Update the cart display
    cartContainer.innerHTML = ''; // Clear cart container before updating

    cartItems.forEach((item, index) => { // Ensure index is defined here
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        const subtotal = item.price * item.quantity; // Calculate subtotal for the item
        totalPrice += subtotal; // Add subtotal to total price

        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-img">
            <span class="cart-para">${item.name}</span>
            <input type="number" class="qty" value="${item.quantity}" min="1" name="quantity">
            <span class="cart-para">USh. ${item.price}</span>
            <span class="cart-para subtotal">USh. ${subtotal}</span>
            <button class="delete-btn" data-index="${index}">X</button>
        `;

        // Event listener for quantity change
        const quantityInput = cartItemElement.querySelector('.qty');
        quantityInput.addEventListener('change', function() {
            item.quantity = parseInt(this.value); // Update item quantity
            updateCartDisplay(); // Update cart display
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
        });

        // Event listener for delete button
        const deleteButton = cartItemElement.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            cartItems.splice(index, 1); // Remove item from cartItems array
            updateCartDisplay(); // Update cart display
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
        });

        cartContainer.appendChild(cartItemElement);
    });

    // Update total price display
    const totalPriceDisplay = document.getElementById('total-price');
    totalPriceDisplay.textContent = `Total Price: USh. ${totalPrice}`;
}


const orderButton = document.getElementById('order-btn');
if (orderButton) {
    orderButton.addEventListener('click', function() {
        alert('Thank you for your order!');
        updateCartDisplay(); // Update cart display after clearing
        clearCart();
    });
  
} else {
    console.error("Order button not found.");
}

// // Clear the cart
function clearCart() {
    localStorage.removeItem('cartItems'); // Remove 'cartItems' from localStorage
}

// Check if the current page is cart.html and call the appropriate function
if (document.querySelector('body').id === 'cart-page') {
    updateCartDisplay();
} else {
    addToCart();
}

//Footer year
const year = document.getElementById('year');
let today = new Date()
year.innerText = today.getFullYear() + " MyShop";
