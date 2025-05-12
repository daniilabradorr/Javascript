// Clase que representa un Producto
class Product {
    constructor(id, name, price, img, description, category, tags) {
        this.id = id;
        this.name = name; 
        this.price = price; 
        this.img = img;
        this.description = description; 
        this.category = category; 
        this.tags = tags; 
    }

    // Método para crear la representación HTML del producto
    createProductElement() {
        // Aquí genero el código HTML para mostrar cada producto en la página
        return `
            <div class="product" draggable="true" id="product-${this.id}" ondragstart="drag(event)">
                <img src="${this.img}" alt="${this.name}" id="img-${this.id}" />
                <p>${this.name}</p>
                <p class="price">$${this.price}</p>
                <p class="description">${this.description}</p>
                <p class="category">Categoría: ${this.category}</p>
                <div class="tags">
                    ${this.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <button class="btn" onclick="viewMore(${this.id})">Ver más</button>
            </div>
        `;
    }
}

// Aquí defino un array de productos, cada uno con su propio ID, nombre, precio, imagen, descripción, categoría y etiquetas
const products = [
    new Product(1, "Producto 1", 100, "https://placehold.co/100x50@2x.png", "Producto de alta calidad ideal para electrónica.", "Electrónica", ["Nuevo", "Popular"]),
    new Product(2, "Producto 2", 150, "https://placehold.co/100x50@2x.png", "Perfecto para cualquier situación. Ideal para ropa casual.", "Ropa", ["Oferta", "Recomendado"]),
    new Product(3, "Producto 3", 200, "https://placehold.co/100x50@2x.png", "Este producto está diseñado para durar y ser versátil.", "Hogar", ["Durable", "Alta gama"]),
    new Product(4, "Producto 4", 80, "https://placehold.co/100x50@2x.png", "Ideal para niños y actividades al aire libre.", "Juguetes", ["Nuevo", "Divertido"]),
    new Product(5, "Producto 5", 220, "https://placehold.co/100x50@2x.png", "Con tecnología avanzada, perfecto para tu hogar.", "Tecnología", ["Innovador", "Recomendado"])
];

// Aquí inicializo el carrito de compras desde el localStorage, si existe. Si no, inicio un carrito vacío.
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para mostrar los productos en la interfaz
function displayProducts() {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = ''; // Aquí limpio los productos previos de la interfaz

    // Itero sobre los productos y agrego el HTML generado para cada uno en el contenedor de productos
    products.forEach(product => {
        productsContainer.innerHTML += product.createProductElement();
    });
}

// Función para filtrar los productos por búsqueda
function searchProducts() {
    // Aquí obtengo la consulta de búsqueda que el usuario ha ingresado
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();

    // Filtramos los productos para que coincidan con el nombre, la categoría o las etiquetas
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery) || 
        product.category.toLowerCase().includes(searchQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );

    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = ''; // Limpiar los productos previos

    // Aquí muestro los productos filtrados en la interfaz
    filteredProducts.forEach(product => {
        productsContainer.innerHTML += product.createProductElement();
    });
}

// Función para mostrar más detalles de un producto
function viewMore(productId) {
    const product = products.find(p => p.id === productId);
    alert(`Detalles de ${product.name}: ${product.description}`); // Aquí muestro más detalles del producto en un alert
}

// Mostrar el contenido del carrito
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ''; // Limpiar el carrito previo

    let total = 0;

    // Itero sobre los productos en el carrito para mostrar sus detalles
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity} 
            <button onclick="removeItemFromCart(${item.id})">Eliminar</button>
            <button onclick="addMore(${item.id})">Añadir más</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    // Aquí actualizo el total del carrito
    document.getElementById("total").textContent = `Total: $${total}`;
    // También actualizo la cantidad de productos en el carrito
    document.getElementById("cart-count").textContent = cart.length;
}

// Agregar un producto al carrito
function addToCart(product) {
    // Aquí busco si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === product.id);

    // Si el producto ya está, incremento su cantidad en el carrito
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        // Si el producto no está, lo agrego al carrito con cantidad 1
        cart.push({ ...product, quantity: 1 });
    }

    updateCart(); // Aquí actualizo el carrito en la interfaz
    saveCartToLocalStorage(); // Y luego guardo el carrito en localStorage
}

// Eliminar un producto del carrito
function removeItemFromCart(productId) {
    // Aquí filtro el carrito para eliminar el producto
    cart = cart.filter(item => item.id !== productId);
    updateCart(); // Actualizo el carrito después de eliminar un producto
    saveCartToLocalStorage(); // Y guardo los cambios en localStorage
}

// Añadir más cantidad de un producto al carrito
function addMore(productId) {
    const product = cart.find(item => item.id === productId);
    product.quantity += 1; // Incremento la cantidad del producto
    updateCart(); // Actualizo el carrito después de añadir más
    saveCartToLocalStorage(); // Y guardo los cambios en localStorage
}

// Guardar el carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Aquí guardo el carrito como un string JSON en localStorage
}

// Arrastrar y soltar
function allowDrop(event) {
    event.preventDefault(); // Aquí permito que el producto sea soltado en el carrito
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id); // Aquí guardo el ID del producto para arrastrarlo
}

function drop(event) {
    event.preventDefault(); // Prevenimos el comportamiento predeterminado
    const productId = event.dataTransfer.getData("text"); // Obtengo el ID del producto arrastrado
    const product = products.find(p => `product-${p.id}` === productId); // Busco el producto en el array
    if (product) {
        addToCart(product); // Si el producto es válido, lo añado al carrito
    }
}

// Inicialización
displayProducts(); // Muestro los productos cuando la página se carga
updateCart(); // Muestro el carrito cuando la página se carga
