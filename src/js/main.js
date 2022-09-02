// Grab classes from HTML
const formInputs = document.querySelectorAll(".form__input");
const formErrors = document.querySelectorAll(".form__error");
const formSuccess = document.querySelectorAll(".form__success");

// Variables for repeated values
const errorIconShow = "url('./images/icon-error.svg')";
const errorIconHide = "url('')";
const displayBlock = "block";
const displayNone = "none"


// Add event listeners to the input fields and tie the updateInput function to them
function listenInputs() {
    for (let i = 0; i < 4; i++) {
        formInputs[i].addEventListener("input", updateInput);
    }
}

listenInputs();

// Regular expression to make sure email address is valid
const emailRegExp = /^(?![@.]).*(?<!@.*)(?<![.@])@{1}(?![@.])(?!.*[@*'(),!? _#/$%&;:<>+="\\]).*(?<![.@])\.{1}[a-zA-Z]+$/gu;
let emailVerification = emailRegExp.exec(formInputs[2].value);

// Checks if the input has text in it - Display error message if everything is erased and remove when something is typed
function updateInput(e) {
    if (e.target.value != "") {
        e.target.nextElementSibling.style.display = displayNone;
        e.target.style.backgroundImage = errorIconHide;
    } else {
        e.target.nextElementSibling.style.display = displayBlock;
        e.target.style.backgroundImage = errorIconShow;
    }

    // Check if the email entered matches the regular expression
    emailVerification = emailRegExp.exec(formInputs[2].value);

    // If the email input is empty, update error message
    if (Boolean(formInputs[2].value) == false) {
        formErrors[2].innerHTML = "Email Address cannot be empty";
    }
}

// Converts the strings into boolean to check if there is a value in the input
function verifyForm() {
    // Variable to check if all inputs are valid on submission
    let inputValid = [
        false,
        false,
        false,
        false
    ];

    for (let i = 0; i < 4; i++) {
        let inputNotEmpty = (Boolean(formInputs[i].value));

        // If the input is empty, display error elements and the background image in inputs
        // If it has content, remove/do not display those elements
        if (inputNotEmpty != true) {
            formErrors[i].style.display = displayBlock;
            formInputs[i].style.backgroundImage = errorIconShow;

            inputValid[i] = false;
        } else {
            formErrors[i].style.display = displayNone;
            formInputs[i].style.backgroundImage = errorIconHide;

            inputValid[i] = true;
        }
    }

    // Check if email is valid with regular expression on submit, display appropriate error message
    if (Boolean(formInputs[2].value) == true && emailVerification == null) {
        formErrors[2].style.display = displayBlock;
        formInputs[2].style.backgroundImage = errorIconShow;
        formErrors[2].innerHTML = "Looks like this is not a valid Email Address";
    } else if (Boolean(formInputs[2].value) == false && emailVerification == null) {
        formErrors[2].style.display = displayBlock;
        formInputs[2].style.backgroundImage = errorIconShow;
        formErrors[2].innerHTML = "Email Address cannot be empty";
    }

    // Show success message if all inputs are valid
    if (inputValid.every(Boolean) && emailVerification != null) {
        formSuccess[0].style.display = displayBlock;
    } else {
        formSuccess[0].style.display = displayNone;
    }
}