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
            alert('Item added to cart!');

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
            <img src="${item.image}" alt="${item.name}" class="cart-img">
            <span>${item.name}</span>
            <span>${item.price}</span>
            `;
            cartContainer.appendChild(cartItemElement);
            
        });
    }
};

addToCart();

//Footer year
const year = document.getElementById('year');
let today = new Date()
year.innerText = today.getFullYear() + " MyShop";