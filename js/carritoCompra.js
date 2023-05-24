const estructuraDelCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito de compra</h1>
    `
    modalContainer.append(modalHeader);

    const modal_boton = document.createElement("h1");
    modal_boton.innerText = "X";
    modal_boton.className = "modal-header-button"

    modal_boton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    
    modalHeader.append(modal_boton);

    carritoCompras.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombreProducto}</h3>
            <p>$${product.precio}</p>
            <span class="restar">-</span>
            <p class="cantidad_producto">Cantidad:${product.cantidad}</p>
            <span class="sumar">+</span>
            <p>Total:$${product.cantidad * product.precio}</p>
        `
        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1){
                product.cantidad--;
            }
            saveLocal();
            estructuraDelCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            estructuraDelCarrito();
        });

        let eliminar_del_carrito = document.createElement("span");
        eliminar_del_carrito.innerText = "❌";
        eliminar_del_carrito.className = "eliminar-producto";
        carritoContent.append(eliminar_del_carrito);

        eliminar_del_carrito.addEventListener("click", deleteProduct);
    });

    const totalFinal = carritoCompras.reduce((acumulador, el)=> acumulador + el.precio * el.cantidad, 0);

    const totalDeCompra = document.createElement("div");
    totalDeCompra.className = "total-final-content";
    totalDeCompra.innerHTML = `Valor a pagar: $${totalFinal}`;
    modalContainer.append(totalDeCompra);
};

verCarrito.addEventListener("click", estructuraDelCarrito);

const deleteProduct = () => {
    const found_id = carritoCompras.find((elemento) => elemento.id);

    carritoCompras = carritoCompras.filter((carrito_id) => {
        return carrito_id !== found_id;
    });

    
    carritoCounter();
    saveLocal();
    estructuraDelCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carritoCompras.length;

    localStorage.setItem(("carritoLength"), JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

};

carritoCounter();






