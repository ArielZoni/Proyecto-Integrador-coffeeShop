//Traemos los elementos del DOM
const registerForm = document.getElementById("register-form");
const nameInput= document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");

//traemos los usuarios del localStorage, o creamos un array vacio si no hay usuarios registrados.

const users = JSON.parse(localStorage.getItem("users")) || [];

// Funcion que va a guardar los usuarios en el localStorage

const saveToLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(users));
};

// Funcion para chequear si el campo input esta vacio

const isEmpty = (input) => {
    return !input.value.trim().length;
}

// Funcion para determinar si el largo del value del input esta entre un min y un max

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
};

// Funcion para validar la direccion email con expresiones regulares.

const isEmailValid = (input) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return regex.test(input.value.trim());
};

// Funcion para chequear si el mail ya existe en el array de usuarios registrados.
const isExistingEmail = (input) => { 
    return users.some((users) => users.emailInput === input.value.trim());
};

// Funcion de ingreso 8 caracteres min, alguna mayus, numeros

const isPassSecure = (input) => {
    const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return regex.test(input.value.trim());
};

// Función para validar un telefono con expresiones regulares.

const isPhoneValid = (input) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(input.value.trim());
};

// Funcion para mostrar error al validar un input

const showError = (input, message) => {
    const formField = input.parentElement;

    formField.classList.remove("success");
    formField.classList.add("error");

    const error = formField.querySelector("small");

    error.style.display = "block";
    error.textContent = message;
};

// Función para mostrar un input como valido
const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove("error");
    formField.classList.add("success");

    const error = formField.querySelector("small");
    error.textContent = "";
};

// Función para validar un input de tipo texto, y validar que solo sea letras
const checkTextInput = (input) => {
    let valid = false;
    const minCharacters = 3;
    const maxCharacters = 25;

    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio");
        return;
    }
    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres.`);
    return;
    }
    showSuccess(input);
    valid = true;
    return valid;    
};

// Funcion para validar un input de tipo email

const checkEmail = (input) => {
    let valid = false;

    if (isEmpty(input)) {
    showError(input, "El email es obligatorio");
    return;
    }

    if (!isEmailValid(input)) {
    showError(input, "El mail no es valido");
    return;
    }

    if (isExistingEmail(input)) {
    showError(input, "El email ya se encuentra registrado");
    return;
    }

    showSuccess(input);
    valid = true;
    return valid;
};


// Función para validar el input de tipo password

const checkPassword = (input) => {
    let valid = false;

    if (isEmpty(input)) {
    showError(input, "La contraseña es obligatoria");
    return;
    }

    if (!isPassSecure(input)) {
    showError(
        input,
        "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo"
    );
    return;
    }
    showSuccess(input);
    valid = true;
    return valid;
};


// Función para validar un input de tipo telefono

const checkPhone = (input) => {
    let valid = false;
    if (isEmpty(input)) {
    showError(input, "El telefono es obligatorio");
    return;
    }

    if (!isPhoneValid(input)) {
    showError(input, "El telefono no es valido");
    return;
    }

    showSuccess(input);
    valid = true;
    return valid;
};

// Funcion para validar el formulario y almacenar datos en el array de users

const validateForm = (e) => {
    e.preventDefault();

    let isNameValid = checkTextInput(nameInput);
    let isLastNameValid = checkTextInput(lastNameInput);
    let isEmailValid = checkEmail(emailInput);
    let isPasswordValid = checkPassword(passInput);
    let isPhoneValid = checkPhone(phoneInput);

    let isValidForm =
    isNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPhoneValid;

    if (isValidForm) {
    users.push({
    name: nameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passInput.value,
    phone: phoneInput.value,
    });
    saveToLocalStorage(users);
    alert("Te has registrado con exito!");
    window.location.href = "login.html";
}
};

const init = () => { 
    registerForm.addEventListener("submit", validateForm);
    nameInput.addEventListener("input", () => checkTextInput(nameInput));
    lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput));
    emailInput.addEventListener("input", () => checkEmail(emailInput));
    passInput.addEventListener("input", () => checkPassword(passInput));
    phoneInput.addEventListener("input", () => checkPhone(phoneInput));
};

init();