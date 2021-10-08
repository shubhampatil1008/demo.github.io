
// SignUP form elements :

const form = document.querySelector('#signup');

const usernameEl = document.querySelector('#username');
const emailEl    = document.querySelector('#email');
const mobileEl   = document.querySelector('#mobile');
 
const jio        = document.querySelector('#jio');
const idea       = document.querySelector('#idea');
const vodafone   = document.querySelector('#vodafone');

const state      = document.querySelector('#state')


// OTP Validation form elements :

const validForm    = document.querySelector('#validform')

const fisrtName    = document.querySelector('#firstName')
const mobileNumber = document.querySelector('#MobileNumber')

const generatedOTP = document.querySelector('#generatedOTP')

const typedotp     = document.querySelector('#typedotp')


const states = {
    101: "MH",
    102: "GU"
};


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


var OTP = Math.floor(1000 + Math.random() * 9000);


const checkUsername = () => {

    let valid = false;

    // trim removes whitespace from both sides of string
    const username = usernameEl.value.trim();


    // checks if username kept blank
    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
        return false;
    } else {
        showSuccess(usernameEl);
        valid = true;
    }

    // Check if numbers are present in username
    if (!/^[a-z][a-z\s]*$/.test(usernameEl.value)) {
        showError(usernameEl, 'Invalid characters.');
        return false;
    // Atlease 2 words are required
    }else if(!/\b\w+\b(?:.*?\b\w+\b){1}/.test(usernameEl.value)) {
        showError(usernameEl, 'minimum Two words Required.');
        return false;
    }

    // Splitting the complete username by space
    const test = username.split(" ");
  
    // checks minimum 4 letters required in each word
    if(test[0].length < 4 || test[1].length < 4){
        showError(usernameEl, 'Minimum 4 characters requird in each word.');
        return false;
    }else{
        showSuccess(usernameEl);
        valid = true;
    }

    return [valid,test[0]];
};


const checkEmail = () => {
    let valid = false;

    // trim removes whitespace from both sides of string
    const email = emailEl.value.trim();

    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
        return false;
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.');
        return false;
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};



const checkMobile = () => {

    let valid = false;

    const mobile = mobileEl.value.trim();

    if (!mobile.length) {
        jio.style.display = "none";
        idea.style.display = "none";
        vodafone.style.display = "none";
        showError(mobileEl, 'Mobile cannot be blank.');
        return false;
    } else{
        showSuccess(mobileEl);
        valid = true;
    }
    return [valid,mobile];
};




// Error Function
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

// Success Function
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


// SignUP form Event Listener
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isMobileValid = checkMobile();

    let UV = isUsernameValid[0]
    console.log("UV==>",isUsernameValid)

    let isFormValid = isUsernameValid[0] &&
        isEmailValid && isMobileValid[0];

        form.style.display = "none";

        validForm.style.display = "block"
        fisrtName.innerHTML = isUsernameValid[1]
        mobileNumber.innerHTML = isMobileValid[1] 
        generatedOTP.innerHTML = OTP


    console.log("form valid==>",isUsernameValid[0],isEmailValid,isMobileValid[0],isFormValid)
    // submit to the server if the form is valid
    if (isFormValid) {
        return true
    }else{
        return false
    }
});


// Validation Form Event Listener
validForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if(OTP == typedotp.value){
        window.location.replace("http://stackoverflow.com");
    }
}) 



// Fuction call on every click in mobileNumber input box
function myFunction() {

   let valid = false;

   const mobile = mobileEl.value.trim();

   if(mobile.length >= 3 && mobile.length <= 3){

       if(isBetween(test[0], 621, 799)){
            jio.style.display = "block";
       }else if(isBetween(test[0],801,920)){
            idea.style.display = "block";
       }else if(isBetween(test[0],921,999)){
            vodafone.style.display = "block";
       }else{
            console.log("invalid")
       }

       document.getElementById('mobile').value = '(' +mobile.toString()+') - ';
       return false;
   }
   else if(mobile.length == 11){
        const state_id  = mobile.slice(8,12)
        state.innerHTML = states[state_id]
        document.getElementById('mobile').value = mobile.toString()+' - ';
   }
   else if(mobile.length > 17){
        document.getElementById('mobile').value = mobile.substring(0, mobile.length - 1);
        return false;
   }
  }




const debounce = (fn, delay = 100) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'mobile':
            checkMobile();
            break;
    }
}));
