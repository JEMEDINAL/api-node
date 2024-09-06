
let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"))

var carrito = []

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
}

function addCarrito(idProducto) {
    let url = `${location.origin}/productos/${idProducto}`
    axios.get(url)
        .then(response => {
            let found = false
            for (let i = 0; i < carrito.length; i++) {
                if (response.data._id === carrito[i]._id) {
                    carrito[i].cantidad += 1;
                    found = true;
                    break
                }
            }


            if (!found) {
                console.log("nuevo producto no esta en el carrito");
                let nuevoProducto = response.data
                nuevoProducto.cantidad = 1;
                carrito.push(nuevoProducto)
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))


        })



}


function eliminarProductoCarrito(idProducto) {
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"))
    carrito = carritoLocalStorage.filter(producto => producto._id !== idProducto)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarCarrito()
}


function mostrarCarrito() {
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito")) || []
   
    
    let bodyOffCanva = document.querySelector(".offcanvas-body")
    let tituloCarrito = document.querySelector(".textos")

    tituloCarrito.textContent = "Lista productos"
    let carritoHtml = ''
    carritoLocalStorage.forEach(producto => {
        carritoHtml += ` <div class="carritoP">
            <img src="${producto.imagen}" class="imgProducto">
            <input type="number" style="width: 50px;" value="${producto.cantidad}">
            <p><strong>$</strong>${producto.precio}</p>
            <button type="button" class="btn btn-danger" onclick="eliminarProductoCarrito('${producto._id}')">X</button>
        </div>`
    })
    bodyOffCanva.innerHTML = carritoHtml
}

function reiniciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function click(){
    console.log("si le doy click");
    
}






