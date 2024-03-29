const productsContainer = document.querySelector(".products-container");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const showMoreBtn = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-label");
const menuBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart-items-conteiner");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");


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


// filtros

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

// Menu 

//función para mostra u ocultar el menu hamburguesa y el overlay segun corresponda
const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
      cartMenu.classList.remove("open-cart");
      return;
    }
    overlay.classList.toggle("show-overlay");
  };
  
  //función para mostrar u ocultar el carrito y el overlay segun corresponda
  const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains("open-menu")) {
      barsMenu.classList.remove("open-menu");
      return;
    }
    overlay.classList.toggle("show-overlay");
  };
  
  //Función para cerrar el menu hamburguesa y el overlay cuando se hace click en un link del menu
  const closeOnClick = (e) => {
    if (!e.target.classList.contains("navbar-link")) return;
  
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
  };
  
  // Función para cerrar el menu hamburguesa o el carrito y ocultar el overlay cuando se hace scroll
  const closeOnScroll = () => {
    if (
      !barsMenu.classList.contains("open-menu") &&
      !cartMenu.classList.contains("open-cart")
    )
      return;
  
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
  };
  
  // Función para cerrar el menu hamburguesa o el carrito y ocultar el overlay cuando se hace click en el overlay
  const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
  };
  
  // Funciones del carrito
  
  const createCartProductTemplate = (cartProduct) => {
    const { id, name, bid, img, quantity } = cartProduct;
  
    return `
    <div class="cart-item">
        <img src=${img} alt="Nft del carrito" />
        <div class="item-info">
          <h3 class="item-title">${name}</h3>          
          <span class="item-price"> Precio: $${bid}</span>
        </div>
        <div class="item-handler">
          <span class="quantity-handler down" data-id=${id}>-</span>
          <span class="item-quantity">${quantity}</span>
          <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
      </div>
    `;
  };
  
  // Función para rendezar los productos del carrito o el mensaje "No hay productos en el carrito"
  
  const renderCart = () => {
    if (!cartConteiner.length) {
      productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
      return;
    }
    productsCart.innerHTML = cartConteiner.map(createCartProductTemplate).join("");
  };
  
  // Función para obtener el total de la compra
  const getCartTotal = () => {
    return cartConteiner.reduce((acc, cur) => acc + Number(cur.bid) * cur.quantity, 0);
  };
  
  // Función para mostrar el total de la compra
  const showCartTotal = () => {
    total.innerHTML = `$${getCartTotal().toFixed(2)}`;
  };
  
  // Función para actualizar la burbuja de cantidad con el numero de productos en el carrito
  const renderCartBubble = () => {
    cartBubble.textContent = cartConteiner.reduce((acc, cur) => acc + cur.quantity, 0);
  };
  
  // Función para habilitar o deshabilitar un boton segun corresponda
  
  const disableBtn = (btn) => {
    if (!cartConteiner.length) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
    }
  };
  
  // Función para actualizar el estado del carrito
  
  const updateCartState = () => {
    saveCartConteiner();
    renderCart();
    showCartTotal();
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble();
  };
  
  // Funcion para crear un objeto del producto que se quiere agregar al corrito o agregar una unidad de un producto existente.
  
  const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) return;
  
    const product = createProductData(e.target.dataset);
  
    if (isExistingCartProduct(product.id)) {
      addUnitToProduct(product);
      showSuccessModal("Se agregó una unidad del producto al carrito");
    } else {
      createCartProduct(product);
      showSuccessModal("El producto se ha agregado al carrito");
    }
  
    updateCartState();
  };
  
  // Funcion para agregar una unidad a un producto que ya existe en el carrito
  const addUnitToProduct = (product) => {
    cartConteiner = cartConteiner.map((cartProduct) =>
      cartProduct.id === product.id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct
    );
  };
  
  // Función para crear un objeto con la información del producto que se quiere agregar al carrito
  const createCartProduct = (product) => {
    cartConteiner = [...cartConteiner, { ...product, quantity: 1 }];
  };
  
  // Función para saber si un producto ya existe en el carrito
  const isExistingCartProduct = (id) => {
    return cartConteiner.find((item) => item.id === id);
  };
  
  // Función para crear un objeto con la información del producto que se quiere obtener
  // Adaptador
  const createProductData = (product) => {
    const { id, name, bid, img } = product;
    return { id, name, bid, img };
  };
  
  // Función para mostrar el modal de exito al agregar o añadir un producto
  
  const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
      successModal.classList.remove("active-modal");
    }, 1500);
  };
  
  //Función para manejar el evento click del boton más en cada producto del carrito
  const handlePlusBtnEvent = (id) => {
    const existingCartProduct = isExistingCartProduct(id);
    addUnitToProduct(existingCartProduct);
  };
  
  // Función para manejar ele vento click del boton menos 
  const handleMinusBtnEvent = (id) => {
    const existingCartProduct = isExistingCartProduct(id);
    if (existingCartProduct.quantity === 1) {
      if (window.confirm("¿Desea eliminar el producto del carrito?")) {
        removeProductFromCart(existingCartProduct);
      }
      return;
    }
    substractProductUnit(existingCartProduct);
  };
  
  // Función para quitar una unidad del producto
  const substractProductUnit = (existingProduct) => {
    cartConteiner = cartConteiner.map((product) => {
      return product.id === existingProduct.id
        ? { ...product, quantity: Number(product.quantity) - 1 }
        : product;
    });
  };
  
  //Función para eliminar un producto del carrito
  
  const removeProductFromCart = (existingProduct) => {
    cartConteiner = cartConteiner.filter((product) => product.id !== existingProduct.id);
    updateCartState();
  };
  
  // Función para manejar los eventos de apretar el boton mas o de menus segun corresponda
  const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
      handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
      handlePlusBtnEvent(e.target.dataset.id);
    }
  
    updateCartState();
  };
  
  // Función para vaciar el carrito
  
  const resetCartItems = () => {
    cartConteiner = [];
    updateCartState();
  };
  
  // Función para completa la compra o vaciar el carrito
  
  const completeCartAction = (confirmMsg, successMsg) => {
    if (!cartConteiner.length) return;
    if (window.confirm(confirmMsg)) {
      resetCartItems();
      alert(successMsg);
    }
  };
  
  // Función para disparar el mensaje de compra exitosa y la confirmación
  
  const completeBuy = () => {
    completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
  };
  
  // Función para disparar el mensaje de vaciado de carrito y su postior mensaje de exito en caso de darse la confirmación
  const deleteCart = () => {
    completeCartAction(
      "¿Desea vaciar su carrito?",
      "No hay productos en el carrito"
    );
  };



const init = () => {
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeOnScroll);
    barsMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    productsContainer.addEventListener("click", addProduct);
    productsCart.addEventListener("click", handleQuantity);
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble();
};

init()