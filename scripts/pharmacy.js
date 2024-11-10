const prescriptionBtn = document.getElementById("prescription")
const prescriptionForm = document.getElementById("prescription-form");
const otcBtn = document.getElementById("otc")
const otcForm = document.getElementById("otc-form");
const buttons = document.querySelectorAll(".button-container button")
const favButtons = document.querySelectorAll(".save-button-container button");
let cart = [];

prescriptionBtn.addEventListener("change", togglePrescription.bind(null, prescriptionForm, otcForm));
otcBtn.addEventListener("change", toggleOTC.bind(null, otcForm, prescriptionForm));

function togglePrescription(displayedForm, disabledForm) {
    const cartTable = document.getElementById('cart');

    displayedForm.disabled = false;
    displayedForm.style.display = "block";
    buttons.forEach(function (btn) {
        btn.style.display = "block";
        }
    )
    favButtons.forEach(function (btn) {
        btn.style.display = "none";
        }
    )
    disabledForm.style.display = "none";
    disabledForm.disabled = true;
    cartTable.style.display = "none"
}

function toggleOTC(displayedForm, disabledForm) {
    const cartTable = document.getElementById('cart');
    
    displayedForm.disabled = false;
    displayedForm.style.display = "flex";
    buttons.forEach(function (btn) {
        btn.style.display = "block";
        }
    )
    favButtons.forEach(function (btn) {
        btn.style.display = "block";
        }
    )
    disabledForm.style.display = "none";
    disabledForm.disabled = true;
    cartTable.style.display = "block"

}

// //

const otcMedicine = document.querySelectorAll(".otc-input");
const cartTableBody = document.querySelector('#cart-table tbody');
const totalPrice = document.querySelector('#total-price');

otcMedicine.forEach(function (input) {
    input.addEventListener("input", function () {
        let name = input.dataset.name;
        let price = parseFloat(input.dataset.price);
        let quantity = parseInt(input.value);
    
        let itemIndex = cart.findIndex(storedItem => storedItem.name === name);
        if (itemIndex != -1) {
            if (quantity > 0) {
                cart[itemIndex].quantity = quantity;
            }
            else{ cart.splice(itemIndex, 1); }
        }
        else if (quantity > 0) {
            item = {
                "name"  :name,
                "price" :price,
                "quantity":quantity
            }
            cart.push(item);
        }
        updateCart();
    });
})

function applyToCart(input) {
    let name = input.dataset.name;
    let price = parseFloat(input.dataset.price);
    let quantity = parseInt(input.value);

    let itemIndex = cart.findIndex(storedItem => storedItem.name === name);
    if (itemIndex != -1) {
        if (quantity > 0) {
            cart[itemIndex].quantity = quantity;
        }
        else{ cart.splice(itemIndex, 1); }
    }
    else if (quantity > 0) {
        item = {
            "name"  :name,
            "price" :price,
            "quantity":quantity
        }
        cart.push(item);
    }
    updateCart();
}

function updateCart() {
    cartTableBody.textContent = '';
    let total = 0;

    cart.forEach(function (item) {
        let row = document.createElement('tr');
        row.innerHTML = `
<td>${item.name}</td> <td>${item.quantity}</td> <td>Rs ${(item.price * item.quantity).toFixed(2)}</td>`;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        }
    );
    totalPrice.textContent = `Rs ${total.toLocaleString('en-US', {minimumFractionDigits:2})}`;
}

// //

buttons[0].addEventListener("click", buyMedicine);
buttons[1].addEventListener("click", clearCart);

function buyMedicine() {
    if (!cart.length > 0) {
        alert("Empty cart, No medicine to buy.")
    } else {
        location.replace("/checkout.html");
    }
}

function clearCart() {
    cart = [];
    otcMedicine.forEach(function (input) {
        input.value = '';
    })
    updateCart();
}