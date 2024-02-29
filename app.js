//Shopping cart
function addToCart() {
    const addToCartButtons = document.querySelectorAll('.btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement; // Get the parent element of the button (product container)
            const productName = product.querySelector('.name').innerText;
            const productPrice = parseFloat(product.querySelector('.price').innerText);
            const productImage = product.querySelector('img').src;

            // Create an object to represent the product
            const item = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            // Retrieve existing cart items from localStorage or initialize an empty array
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Check if the item is already in the cart
            const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
            if (!existingItem) {
                // Add the new item to the cart array only if it doesn't exist already
                cartItems.push(item);

                // Store updated cart items in localStorage
                console.log("Adding item to cart:", item);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                // Update the cart display
                updateCartDisplay();
            } else {
                console.log("Item already exists in the cart.");
            }
        });
    });
}




// Function to update cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');

    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Update the cart display
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} - $${item.price}</p>
        `;
        cartContainer.appendChild(cartItemElement);
        console.log(cartContainer)
    });
}

// Check if the current page is cart.html and call the appropriate function
if (document.querySelector('body').id === 'cart-page') {
    updateCartDisplay();
} else {
    addToCart();
}



//Footer year
// const year = document.getElementById('year');
// let today = new Date()
// year.innerText = today.getFullYear() + " MyShop";