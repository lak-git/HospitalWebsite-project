function isValidInput(...formFields) {
    for (let formInput of formFields){
        if ( !formInput.checkValidity() ) {return false;}
    }
    return true;
}


const inputLength = 16;

function Hash(input, count=3) {
    let inputString = String(input);
    if (inputString.length < inputLength) { return Hash(btoa(inputString)); }

    let runCount = count - 1;
    if (runCount <= 0) {
        return btoa(input);
    } else {
        return Hash(btoa(inputString + runCount), runCount);
    }
}