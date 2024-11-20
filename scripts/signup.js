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

    let accountID = Hash(`${email.value.trim() + password.value.trim()}`);
    let accountInfo = {
        "username"  : username.value.trim(),
        "password"  : Hash(`${password.value.trim()}`),
        "name"      : name.value.trim(),
        "email"     : email.value.trim(),
        "contact"   : telNumber.value.trim(),
        "birthDate" : dob.value,
        "gender"    : gender.value,
        "address"   : address.value.trim()
    }
    // const accountDuration = 1000 * 60 * 60 * 2; // 2 hours
    const accountDuration = 1000 * 60 * 2; //2 minutes
    let CURRENT_LOGIN = {
        "accountID"     : accountID, 
        "accountInfo"   : accountInfo,
        "expirationDate": TIME_NOW + accountDuration
    }

    if ( accounts === null ) {
        accounts = [
            {"accountID" : accountID, "accountInfo" : accountInfo}
        ]
        createAccountAndLogin(accounts, CURRENT_LOGIN);

    } else if ( !doesAccountExist(accountInfo.contact, accountInfo.email) ) {
        accounts.push(
            {"accountID" : accountID, "accountInfo" : accountInfo}
        )
        createAccountAndLogin(accounts, CURRENT_LOGIN);

    } else {alert("ERROR: Account Already Exists!")}
}

function doesAccountExist(contactNubmer, email) {
    for (let i=0; i < accounts.length; i++){
        let account = accounts[i].accountInfo;
        if ( account.contact == contactNubmer || account.email == email ) {return true;}    
    }
    return false;
}
function createAccountAndLogin(existing_accounts, current_login) {
    localStorage.setItem("Accounts", JSON.stringify(existing_accounts));
    localStorage.setItem("CurrentLogin", JSON.stringify(current_login));
    alert("Account Created!");
    location.replace(".");
}