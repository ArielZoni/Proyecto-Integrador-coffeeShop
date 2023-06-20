const productsData = [
    {
        id: 1,
        name: "Late Caramel",
        bid: 670,
        previous: 700,
        category: "lates",
        cardImg: "./assets/products/Late-Caramel.jpg",
    },
    {
        id: 2,
        name: "Late Irlandes",
        bid: 689,
        previous: 710,
        category: "lates",
        cardImg: "./assets/products/Late-Irlandes.jfif",
    },
    {
        id: 3,
        name: "Late Macchiato",
        bid: 690,
        previous: 715,
        category: "lates",
        cardImg: "./assets/products/Late-Macchiato.jfif",
    },
    {
        id: 4,
        name: "Cafe Expreso",
        bid: 430,
        previous: 500,
        category: "cortado",
        cardImg: "./assets/products/cortados-1.jpg",
    },
    {
        id: 5,
        name: "Cafe Americano",
        bid: 450,
        previous: 520,
        category: "cortado",
        cardImg: "./assets/products/cortados-2.jpg",
    },
    {
        id: 6,
        name: "Cappuccino",
        bid: 470,
        previous: 510,
        category: "cortado",
        cardImg: "./assets/products/cortados-3.jpg",
    },
    {
        id: 7,
        name: "Cafe Irish",
        bid: 455,
        previous: 500,
        category: "negros",
        cardImg: "./assets/products/negros-1.jpg",
    },
    {
        id: 8,
        name: "Cafe Au Lait",
        bid: 500,
        previous: 550,
        category: "negros",
        cardImg: "./assets/products/negros-2.jpg",
    },
    {
        id: 9,
        name: "Cafe I`m Black",
        bid: 550,
        previous: 600,
        category: "negros",
        cardImg: "./assets/products/negros-3.jpg",
    },
    {
        id: 10,
        name: "Cafe de Nicaragua",
        bid: 640,
        previous: 689,
        category: "molidos",
        cardImg: "./assets/products/nicaragua.png",
    },
    {
        id: 11,
        name: "Cafe de Colombia",
        bid: 690,
        previous: 729,
        category: "molidos",
        cardImg: "./assets/products/colombia.png",
    },
    {
        id: 12,
        name: "Cafe de Peru",
        bid: 680,
        previous: 730,
        category: "molidos",
        cardImg: "./assets/products/peru.png",
    },
    {
        id: 13,
        name: "Cafe en Grano Natural",
        bid: 600,
        previous: 650,
        category: "granos",
        cardImg: "./assets/products/grano-natural.png",
    },
    {
        id: 14,
        name: "Cafe en Grano Tostado",
        bid: 620,
        previous: 660,
        category: "granos",
        cardImg: "./assets/products/grano-tostado.png",
    },
    {
        id: 15,
        name: "Cafe en Grano Negro",
        bid: 679,
        previous: 719,
        category: "granos",
        cardImg: "./assets/products/grano-negro.png",
    },
];

// Función para dividr los productos en arrays de "x cantidad" de productos
const divideProductsInParts = (size) => {
    let productsList = [];
    //           6              15
    for (let i = 0; i < productsData.length; i += size) {
        productsList.push(productsData.slice(i, i + size));
        console.log(productsList); // [[1,2,3,4,5,],[6,7,8,9,10],[11,12,13,14,15]]
    }
    return productsList;
};

// Objeto para dividir los productos en arrays de 6 productos y manejar la paginación

const appState = {
    products: divideProductsInParts(6), // [[1,2,3,4,5,6],[6,7,8,9,10,1],[11,12,13]]
    currentProductsIndex: 0,
    productsLimit: divideProductsInParts(6).length, // [[1,2,3,4,5,6],[6,7,8,9,10,1],[11,12,13]].length // 3 -1 = 2
    activeFilter: null,
};

