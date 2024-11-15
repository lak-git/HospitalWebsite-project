let accounts = JSON.parse(localStorage.getItem("Accounts"));

const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", loginToAccount);

function loginToAccount() 
{
    event.preventDefault();
    let password = document.getElementById("password")
    let email = document.getElementById("email");

    if ( !isValidInput(password, email))  {
        alert("Invalid Input. Make sure you entered the information correctly.");
        return;
    }

    let noAccountsExist = accounts === null; 
    if (noAccountsExist) {
        alert("No accounts exist. Cannot Login.");
        return;
    }

    let submittedID = Hash(`${email.value.trim() + password.value.trim()}`);
    let submittedPassword = Hash(`${password.value.trim()}`);
    let validationValues = authenticateCredentials(submittedID, submittedPassword); 
    if ( validationValues[0] ) {
        // const accountDuration = 1000 * 60 * 60 * 2; // 2 hours
        const accountDuration = 1000 * 60 * 2 // 2 minutes
        // const TIME_NOW = new Date().getTime();

        let CURRENT_LOGIN = {
            "accountID"     : validationValues[1], 
            "accountInfo"   : validationValues[2],
            "expirationDate": TIME_NOW + accountDuration
        }
        localStorage.setItem("CurrentLogin", JSON.stringify(CURRENT_LOGIN));
        location.replace("/");
    } else {alert("Cannot Login. Make sure the account exists and check if Email or Password is correct.");}
}

// Validates the submitted data in the form fields

function authenticateCredentials(id, pwd) {
    for (let i=0; i < accounts.length; i++){
        let account = accounts[i];
        let idVerified = (id == account.accountID);
        let passwordVerified = (pwd == account.accountInfo.password)
        
        if (idVerified && passwordVerified) {
            return [true, id, account.accountInfo];
        }
    }
    return [false, null, null];
}