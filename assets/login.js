//Traemos los elementos del DOM
const loginForm = document.getElementById("login--form");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const errorMessage = document.getElementById("form__error");

// Nos traemos los usuarios del localStorage, o creamos un array vacio si no hay usuarios registrados.
const users = JSON.parse(localStorage.getItem("users")) || [];

// Funcion que va a guardar el usuario activo en el sessionStorage
const saveToSessionStorage = (user) => {
    sessionStorage.setItem("activeUser", JSON.stringify(user));
};


// Funcion que se va a encargar de mostrar el mensaje de error al validar el formulario de login.
const showError = (message) => {
    errorMessage.textContent = message;
};

// Funcion para chequear si el campo input esta vacio
const isEmpty = (input) => {
    return !input.value.trim().length;
};

// Funcion para chequear si el mail ya existe en el array de usuarios registrados.
const isExistingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim());
};

// Funcion para validar si la password ingresada coincide con la registrada para ese mail.
const isMatchingPass = (input) => {
    const user = users.find((user) => user.email === emailInput.value.trim());
    return user.password === input.value.trim();
};

// Función para mopstrar el error al validar el formulario.

const isValidAccount = () => {
    let valid = false;

    if (isEmpty(emailInput)) {
    showError("Por favor, complete los campos.");
    return;
    }
    if (!isExistingEmail(emailInput)) {
    showError("El email ingresado es invalido.");
    return;
    }
    if (isEmpty(passInput)) {
    showError("Por favor, complete los campos.");
    return;
    }
    if (!isMatchingPass(passInput)) {
    showError("Los datos ingresados son incorrectos.");
    loginForm.reset();
    return;
    }

    alert("Ya estas en linea!");
    valid = true;
    errorMessage.textContent = "";
  //   loginForm.reset();
    return valid;
};


// Función para loguear al usuario

const login = (e) => {
    e.preventDefault();
    if (isValidAccount()) {
    const user = users.find((user) => user.email === emailInput.value.trim());
    saveToSessionStorage(user);
    window.location.href = "./welcome.html";
    }
};

const init = () => {
    loginForm.addEventListener("submit", login);
};

init();