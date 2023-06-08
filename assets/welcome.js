//Traemos los elementos del DOM
const logoutBtn = document.getElementById("logout-message");
const userName = document.getElementById("user-name");

//traemos el usuario activo del sessionStorage

console.log(sessionStorage.getItem("activeUser"));
const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

// Función para mostrar el nomvre y apellido del usuario activo.

const showUserName = () => { 
    userName.textContent = `${activeUser.name} ${activeUser.lastName}`;
};

// Función para cerrar sesion y regresar al index.html

const logout = () => {
    if (window.confirm("¿Estas seguro que deseas cerrar sesión?")) {
    sessionStorage.removeItem("activeUser");
    window.location.href = "../index.html";
    }
};

const init = () => {
    showUserName();
    logoutBtn.addEventListener("click", logout);
};

init();