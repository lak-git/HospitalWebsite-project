const prescriptionBtn = document.getElementById("prescription")
const prescriptionForm = document.getElementById("prescription-form");
const otcBtn = document.getElementById("otc")
const otcForm = document.getElementById("otc-form");
const buttons = document.querySelectorAll(".button-container button")
const favButtons = document.querySelectorAll(".save-button-container button");
const favBtnContainer = document.querySelector(".save-button-container");
const cartTable = document.getElementById('cart');

let isPrescription = false;
let cart = [];

prescriptionBtn.addEventListener("change", toggleForm.bind(null, prescriptionForm, otcForm));
otcBtn.addEventListener("change", toggleForm.bind(null, otcForm, prescriptionForm));

function toggleForm(displayedForm, disabledForm) {
    if (displayedForm == prescriptionForm) {
        displayedForm.style.display = "block"; 
        cartTable.style.display = "none";
        favBtnContainer.style.display = "none"
        favButtons.forEach(function (btn) {
            btn.style.display = "none";
            }
        )
        isPrescription = true;
    } else {
        displayedForm.style.display = "flex";
        cartTable.style.display = "block";
        favBtnContainer.style.display = "flex"
        favButtons.forEach(function (btn) {
            btn.style.display = "block";
            }
        )
        isPrescription = false;
    }

    displayedForm.disabled = false;
    buttons.forEach(function (btn) {
        btn.style.display = "block";
        }
    )
    disabledForm.style.display = "none";
    disabledForm.disabled = true;
}


// Medicine cart functionality //


const otcMedicine = document.querySelectorAll(".otc-category input");
const cartTableBody = document.querySelector('#cart-table tbody');
const totalPrice = document.querySelector('#total-price');

otcMedicine.forEach(function (input) 
{
    input.addEventListener("input", applyToCart.bind(null, input));
});

function applyToCart(input) {
    let name = input.dataset.name;
    let price = parseFloat(input.dataset.price);
    let quantity = parseInt(input.value);

    let itemIndex = cart.findIndex(storedItem => storedItem.name === name);
    let itemExistsAtIndex = itemIndex != -1; 
    if (itemExistsAtIndex) {
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
    )
    totalPrice.textContent = `Rs ${total.toLocaleString('en-US', {minimumFractionDigits:2})}`;
}


// Buying medicine functionality  //


let buyBtn = buttons[0];
let clearBtn = buttons[1];

buyBtn.addEventListener("click", buyMedicine);
clearBtn.addEventListener("click", clearCart);

function buyMedicine() {
    if (isPrescription) {
        buyPrescriptionMedicine();
    } else if (cart.length == 0) {
        alert("Empty cart, No medicine to buy.");
    } else {
        buyOTCMedicine();
    }

    function saveOrderToSession(OrderType, order) {
        sessionStorage.setItem(OrderType, JSON.stringify(order));
        location.replace("./checkout.html");
    }
    function buyPrescriptionMedicine() {
        let prescription = document.getElementById('prescription');
        let prescriptionDate = document.getElementById('prescription-date');
        let prescriptionDoctor = document.getElementById('doctor');
        if (!isValidInput(prescription, prescriptionDate, prescriptionDoctor)) {
            alert("Make sure your prescription details are correct.");
            return;
        }
        saveOrderToSession("PrescriptionOrder", isPrescription);
    }
    function buyOTCMedicine() {
        isPrescription = false;
        saveOrderToSession("PendingOrder", cart);
        saveOrderToSession("PrescriptionOrder", isPrescription);
    }
}

function clearCart() {
    cart = [];
    otcMedicine.forEach(function (input) {
        input.value = '';
    })
    updateCart();
}

// Saving and loading order functionality // 

let saveOrderBtn = favButtons[0];
let loadOrderBtn = favButtons[1];

saveOrderBtn.addEventListener("click", saveOrderToAccount);
loadOrderBtn.addEventListener("click", loadOrderFromAccount);

function saveOrderToAccount() {
    if ( isLoggedIn() ) {
        let emptyCart = cart.length == 0;

        if (emptyCart) {
            alert("Cannot save an empty cart. Please select some medicine.");
            return;
        }
        CURRENT_LOGIN.accountInfo.savedOrder = cart;
        localStorage.setItem("CurrentLogin", JSON.stringify(CURRENT_LOGIN));
        alert("Order saved to account!");
    }
}

function loadOrderFromAccount() {
    if ( isLoggedIn() ) {
        clearCart();
        if ( !validateSavedOrder() ) { return; }
        cart = CURRENT_LOGIN.accountInfo.savedOrder;
        updateCart();
        alert("Order has been loaded successfully.");
    }

    function validateSavedOrder() {
        let emptySavedOrder = CURRENT_LOGIN.accountInfo.savedOrder == undefined;
        if (emptySavedOrder) {
            alert("There is no saved order to load.");
            return false;
        }
        return true;
    }
}

function isLoggedIn() {
    if ( USER_HAS_LOGGED_IN ) { return true; }
    alert("You need to be logged into an account in order to use this feature.");
    return false;
}