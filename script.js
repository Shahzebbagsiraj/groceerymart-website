
let cart = [];
let totalAmount = 0;

function updateQuantity(product, change) {
    const quantityInput = document.getElementById(`${product}-quantity`);
    let quantity = parseInt(quantityInput.value);
    quantity += change;
    if (quantity < 0) quantity = 0;
    quantityInput.value = quantity;
}

function addToCart(product, price) {
    const quantity = parseInt(document.getElementById(`${product.toLowerCase()}-quantity`).value);
    if (quantity > 0) {
        cart.push({ product, price, quantity });
        totalAmount += price * quantity;
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<p>${item.product} x ${item.quantity}</p><p>$${item.price * item.quantity}</p>`;
        cartItemsDiv.appendChild(div);
    });
    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
}

function completeOrder() {
    const paymentMethod = document.getElementById('payment-method').value;
    showLoading();
    setTimeout(() => {
        hideLoading();
        let message;
        switch (paymentMethod) {
            case 'credit-card':
                message = 'Amount debited from account';
                break;
            case 'paypal':
                message = 'Payment successful';
                break;
            case 'cash':
                message = 'Thank you sir';
                break;
            default:
                message = 'Order completed';
        }
        showModal(message);
    }, 2000); // Simulate a delay for loading
}

function showLoading() {
    document.getElementById('loading-overlay').classList.add('active');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.remove('active');
}

function showModal(message) {
    const modal = document.getElementById('order-modal');
    document.getElementById('modal-message').textContent = message;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('order-modal');
    modal.classList.remove('active');
    resetOrder();
}

function resetOrder() {
    cart = [];
    totalAmount = 0;
    updateCartDisplay();
    document.getElementById('payment-method').value = 'credit-card';
}
