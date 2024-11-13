if (USER_HAS_LOGGED_IN) 
{
    function fillName(){
        let fullName = document.getElementById('name');
        fullName.value = CURRENT_LOGIN.accountInfo.name;
    }
    function fillEmail() {
        let email = document.getElementById('email');
        email.value = CURRENT_LOGIN.accountInfo.email;
    }
    function fillContactNumber() {
        let contactNumber = document.getElementById('contact');
        contactNumber.value = CURRENT_LOGIN.accountInfo.contact;
    }
    function fillDateOfBirth() {
        let dob = document.getElementById('dob');
        dob.value = CURRENT_LOGIN.accountInfo.birthDate;
    }
    function fillAddress() {
        let address = document.getElementById('address');       
        address.value = CURRENT_LOGIN.accountInfo.address;
    }
    function fillGender() {
        let gender = document.getElementById('gender');
        gender.value = CURRENT_LOGIN.accountInfo.gender;
    }

    let autoFillList = [
        fillName, fillEmail, fillContactNumber,
        fillDateOfBirth, fillAddress, fillGender
    ];

    autoFillList.forEach((autoFill) => {
        try {
            autoFill();
        } catch (TypeError) {
            
        }
    })
}