const prescriptionBtn = document.getElementById("prescription")
const prescriptionForm = document.getElementById("prescription-form");
const otcBtn = document.getElementById("otc")
const otcForm = document.getElementById("otc-form");
const buttons = document.querySelectorAll(".button-container button")
const favButtons = document.querySelectorAll(".save-button-container button");
const cartTable = document.getElementById('cart');
let cart = [];
let isPrescription = false;

prescriptionBtn.addEventListener("change", toggleForm.bind(null, prescriptionForm, otcForm));
otcBtn.addEventListener("change", toggleForm.bind(null, otcForm, prescriptionForm));


function toggleForm(displayedForm, disabledForm) {
    if (displayedForm == prescriptionForm) {
        displayedForm.style.display = "block"; 
        cartTable.style.display = "none"; 
        favButtons.forEach(function (btn) {
            btn.style.display = "none";
            }
        )
        isPrescription = true;
    } else {
        displayedForm.style.display = "flex";
        cartTable.style.display = "block";
        favButtons.forEach(function (btn) {
            btn.style.display = "block";
            }
        )
    }

    displayedForm.disabled = false;
    buttons.forEach(function (btn) {
        btn.style.display = "block";
        }
    )
    disabledForm.style.display = "none";
    disabledForm.disabled = true;
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
    if (isPrescription) {
        sessionStorage.setItem("PrescriptionOrder", JSON.stringify(isPrescription));
        location.replace("/checkout.html");
    } else if (!cart.length > 0) {
        alert("Empty cart, No medicine to buy.");
    } else {
        sessionStorage.setItem("PendingOrder", JSON.stringify(cart));
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