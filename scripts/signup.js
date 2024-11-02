let accounts = JSON.parse(localStorage.getItem("Accounts"));

const submitBtn = document.getElementById("signup");

submitBtn.addEventListener("click", registerAccount);

function registerAccount() 
{
    event.preventDefault();
    let username = document.getElementById("username")
    let password = document.getElementById("password")
    let name = document.getElementById("name")
    let email = document.getElementById("email")
    let telNumber = document.getElementById("contact")
    let dob = document.getElementById("dob")
    let gender = document.getElementById("gender")
    let address = document.getElementById("address");

    if ( !isValidInput(username, password, name, email, telNumber, address))  {
        alert("Invalid Input. Make sure you entered the information correctly.");
        return;
    }

    let accountID = String(CryptoJS.MD5(`${email.value.trim() + password.value.trim()}`));
    let accountInfo = {
        "username"  : username.value.trim(),
        "password"  : String(CryptoJS.MD5(`${password.value.trim() + "salt"}`)),
        "name"      : name.value.trim(),
        "email"     : email.value.trim(),
        "contact"   : telNumber.value.trim(),
        "birthDate" : dob.value,
        "gender"    : gender.value,
        "address"   : address.value.trim()         
    }
    // const accountDuration = 1000 * 60 * 60 * 2; // 2 hours
    const accountDuration = 1000 * 60; //1 minute
    const currentTime = new Date().getTime();
    let currentLogin = {
        "accountID"     : accountID, 
        "accountInfo"   : accountInfo,
        "expirationDate": currentTime + accountDuration
    }

    if ( accounts === null ) {
        accounts = [
            {"accountID" : accountID, "accountInfo" : accountInfo}
        ]
        localStorage.setItem("Accounts", JSON.stringify(accounts));
        localStorage.setItem("CurrentLogin", JSON.stringify(currentLogin));
        alert("Account Created!");
        location.replace("/");

    } else if ( !doesAccountExist(accountInfo.contact, accountInfo.email) ) {
        accounts.push(
            {"accountID" : accountID, "accountInfo" : accountInfo}
        )
        localStorage.setItem("Accounts", JSON.stringify(accounts));
        localStorage.setItem("CurrentLogin", JSON.stringify(currentLogin));
        alert("Account Created!");
        location.replace("/");

    } else {alert("ERROR: Account Already Exists!")}
}

function isValidInput(...formFields) {
    for (let formInput of formFields){
        console.log(formInput);
        if ( !formInput.checkValidity() ) {return false;}
    }
    return true;
}

function doesAccountExist(contactNubmer, email) {
    for (let i=0; i < accounts.length; i++){
        let account = accounts[i].accountInfo;
        if ( account.contact == contactNubmer || account.email == email ) {return true;}    
    }
    return false;
}