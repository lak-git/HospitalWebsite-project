const cashBtn = document.getElementById('cash');
const cardBtn = document.getElementById('card');
const cardForm = document.getElementById('card-form');
const formBtns = document.querySelectorAll(".button-container button");
let cardNumber = document.getElementById('card-number');
let zipCode = document.getElementById('zipcode');
let pinNumber = document.getElementById('pin');

cardBtn.addEventListener("click", showCardForm.bind(null, true));
cashBtn.addEventListener("click", showCardForm.bind(null, false));
displayCart();

function showCardForm(condition) {
    if (condition) {
        cardNumber.disabled = false;
        zipCode.disabled = false;
        pinNumber.disabled = false;
        cardForm.style.display = "flex";
    } else {
        cardNumber.disabled = true;
        zipCode.disabled = true;
        pinNumber.disabled = true;
        cardForm.style.display = "none";
    }
    formBtns.forEach((button) => {
        button.style.display = "block";
    })
}

//  //  

let orderBtn = formBtns[0]; 
let clearBtn = formBtns[1];

orderBtn.addEventListener("click", orderMedicine);

function orderMedicine() {
    event.preventDefault();

    if ( !isValidInput(fullName, email, contactNumber, dob, deliveryAddress) ) {
        alert("Please make sure your personal details are correct.");
        return;
    }

    if ( !isValidInput(cardNumber, zipCode, pinNumber)) {
        alert("Please make sure your payment details are correct.");
        return;
    }

    let orderDate = new Date();
    const FIVE_DAYS = 1000*60*60*24*5;
    orderDate.setTime(TIME_NOW + FIVE_DAYS);
    alert(
`Thank you for your purchase. Your order should arrive within 5 days (${orderDate.toLocaleDateString("en-GB")})`
    )
    sessionStorage.removeItem("PendingOrder");
}


if ( USER_HAS_LOGGED_IN ) 
{
    fullName.value = CURRENT_LOGIN.accountInfo.name;
    email.value = CURRENT_LOGIN.accountInfo.email;
    contactNumber.value = CURRENT_LOGIN.accountInfo.contact;
    dob.value = CURRENT_LOGIN.accountInfo.birthDate;
    deliveryAddress.value = CURRENT_LOGIN.accountInfo.address;
}


function displayCart() {
    let cart = JSON.parse(sessionStorage.getItem("PendingOrder"));
    if (cart === null) {
        alert("Invalid cart. No order found for checkout");
        return;
    }

    const cartTableBody = document.getElementById('cart-table');
    const totalPrice = document.getElementById('total-price');
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