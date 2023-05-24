const contentTechnology = document.getElementById("technologyContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("contenedor-modal");
const cantidadCarrito = document.getElementById("cantCarrito");

let carritoCompras = JSON.parse(localStorage.getItem("carrito")) || [];

products.forEach((product) => {
    let contenido = document.createElement("div");
    contenido.className = "cards"
    contenido.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombreProducto}</h3>
        <p class="prices">$${product.precio}</p>
    `;
    contentTechnology.append(contenido);

    let buy = document.createElement("button");
    buy.className = "shopping";
    buy.innerText = "Comprar";

    contenido.append(buy);

    buy.addEventListener("click", () => {

        const repetir = carritoCompras.some((repetirProducto) => repetirProducto.id === product.id);

        if(repetir){
            carritoCompras.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++
                }
                });
            }else{
            carritoCompras.push({
                id: product.id,
                img: product.img,
                nombreProducto: product.nombreProducto,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }    
        console.log(carritoCompras);
        carritoCounter();
        saveLocal();
    });
});

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carritoCompras));
};





