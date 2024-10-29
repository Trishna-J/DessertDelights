// Define cart and total amount
let cart = [];
let totalAmount = 0;

// Get cart-box and confirm order button elements
const cartBox = document.querySelector('.cart-box');
const cartItemsList = document.getElementById('cart-items');
const totalAmountDisplay = document.getElementById('total-amount');
const confirmOrderBtn = document.getElementById('confirm-order');

// Get all buttons with the class 'cartbtn'
const cartButtons = document.querySelectorAll('.cartbtn');

// Function to add items to the cart or update quantity
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    updateCartDisplay();
    cartBox.style.display = 'block'; // Show the cart box
}

// Function to remove items or decrease quantity in the cart
function removeFromCart(itemName) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity <= 0) {
            cart = cart.filter(item => item.name !== itemName); // Remove item if quantity is zero
        }
    }
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    cartItemsList.innerHTML = ''; // Clear the current list
    cart.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - $${item.price * item.quantity}`;
        cartItemsList.appendChild(listItem);
    });
    totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalAmountDisplay.innerText = totalAmount;
    confirmOrderBtn.style.display = cart.length > 0 ? 'block' : 'none';
}

// Attach event listeners to each button
cartButtons.forEach(function(cartbtn, index) {
    let count = 0;
    let isInCart = false;

    const itemBox = document.querySelectorAll('.container > div')[index];
    const itemName = itemBox.querySelector('h4').innerText;
    const price = parseInt(itemBox.querySelector('.price').innerText);

    cartbtn.addEventListener('click', function() {
        if (!isInCart) {
            isInCart = true;
            cartbtn.innerHTML = `
                <button class="minus" style="margin-right: 5px;">-</button>
                <span class="count">${count}</span>
                <button class="plus" style="margin-left: 5px;">+</button>
            `;
            cartbtn.classList.add('active-btn');

            // Event listener for plus button
            cartbtn.querySelector('.plus').addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent triggering parent click event
                count++;
                cartbtn.querySelector('.count').textContent = count;
                addToCart(itemName, price); // Update cart with new quantity
            });

            // Event listener for minus button
            cartbtn.querySelector('.minus').addEventListener('click', function(event) {
                event.stopPropagation();
                if (count > 0) {
                    count--;
                    cartbtn.querySelector('.count').textContent = count;
                    removeFromCart(itemName); // Update cart with decreased quantity

                    // Reset the button if the counter reaches 0
                    if (count === 0) {
                        resetButton();
                    }
                }
            });
        }
    });

    // Function to reset the button state
    function resetButton() {
        isInCart = false;
        cartbtn.innerHTML = "Add to Cart";
        cartbtn.classList.remove('active-btn');
    }
});

// Confirm Order button functionality
confirmOrderBtn.addEventListener('click', function() {
    alert(`Your order total is $${totalAmount}. Thank you for your purchase!`);
    cart = []; // Clear the cart
    updateCartDisplay(); // Update the cart display after confirming the order
    cartBox.style.display = 'none'; // Hide the cart box

    // Reset all Add to Cart buttons
    cartButtons.forEach((button) => {
        button.innerHTML = "Add to Cart";
        button.classList.remove('active-btn');
    });
});
