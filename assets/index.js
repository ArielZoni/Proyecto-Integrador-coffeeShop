const productsContainer = document.querySelector(".products-container");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const showMoreBtn = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-label");
const menuBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart-items-conteiner");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".add-modal");


//Setear valor incial del carrito

let cartConteiner = JSON.parse(localStorage.getItem("cart-items-conteiner")) || [];

// Función para guardar el carrito en el localStorage

const saveCartConteiner = () => {
    localStorage.setItem("cart-items-conteiner", JSON.stringify(cartConteiner));
};

// Funciónes con la lógica de los productos

// Función para crear el html del producto card

const createProductTemplate = (product) => {
    const { id, name, bid, cardImg, previous } = product;
    return `
    <div class="box">
        <div class="iconos">
        <a href="#" class="fas fa-heart"></a>
        <a href="#" class="fas fa-eye"></a>
        </div>

        <div class="imagen">
        <img src=${cardImg} alt=${name}/>
        </div>

        <div class="content">
        <h3>${name}</h3>
        <div class="estrellas">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
        </div>
        <div class="precio">$${bid} <span>$${previous}</span></div>

        <button class="btn-add"
            data-id='${id}'
            data-name='${name}'
            data-bid='${bid}'
            data-img='${cardImg}'>Añadir al Carrito</button>
        </div>
    </div>    
    `;
};

//Función para renderizar una lista de productos
const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
        .map(createProductTemplate)
        .join("");
};

// Función de boton "Ver más"

// Función para saber si el indice actual es el limite de productos a renderizar
const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
};

//Función para renderizar más productos cuando se apreta el botón de ver más

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    console.log(appState);
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
};

// Función para mostrar u ocultar el botón de ver más segun corresponda

const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden");
        return;
    }
    showMoreBtn.classList.add("hidden");
};


// Lógica de filtros

// Función para cambiar el estado de los botones de categorías

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    });
}

// Función para cambiar el estado del filtro activo al appState.

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisibility(appState.activeFilter);
};

// Función para saber si el elemento que se apredo es un boton de categoria y no esta activo

const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") &&
        !element.classList.contains("active")
    );
};

// Función para filtar los productos por categoría y renderizarlos.
const applyFilter = ({ target }) => {
    if (!isInactiveFilterBtn(target)) return;

    changeFilterState(target);
    productsContainer.innerHTML = "";
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};

// Función para aplicar el filtro cuando se apreta un boton de categoria
const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
};



const init = () => {
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);
    // cartBtn.addEventListener("click", toggleCart);
    // menuBtn.addEventListener("click", toggleMenu);
    // window.addEventListener("scroll", closeOnScroll);
    // barsMenu.addEventListener("click", closeOnClick);
    // overlay.addEventListener("click", closeOnOverlayClick);
    // document.addEventListener("DOMContentLoaded", renderCart);
    // document.addEventListener("DOMContentLoaded", showCartTotal);
    // productsContainer.addEventListener("click", addProduct);
    // productsCart.addEventListener("click", handleQuantity);
    // buyBtn.addEventListener("click", completeBuy);
    // deleteBtn.addEventListener("click", deleteCart);
    // disableBtn(buyBtn);
    // disableBtn(deleteBtn);
    // renderCartBubble(cart);
};

init()