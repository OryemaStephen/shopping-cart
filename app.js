//Shopping cart
function addToCart() {
    const addToCartButtons = document.querySelectorAll('button');
    const cartContainer = document.getElementById('cart');
    const cart = []; // Initialize an empty cart array to store items

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement; 
            const productImg = product.querySelector('img').src;
            const productName = product.querySelector('.name').innerText;
            const productPrice = parseFloat(product.querySelector('.price').innerText);

            // Create an object to represent the product
            const item = {
                image: productImg,
                name: productName,
                price: productPrice
            };

            // Add the item to the cart array
            cart.push(item);

            // Update the cart display
            updateCartDisplay();
        });
    });

    // Updating cart item
    function updateCartDisplay() {
        cartContainer.innerHTML = ''; 
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} - $${item.price}</p>
            `;
            cartContainer.appendChild(cartItemElement);
        });
    }
};

addToCart();