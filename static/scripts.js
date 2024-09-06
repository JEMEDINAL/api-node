var carrito = []

if(localStorage.getItem("carrito")){
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
            
        
            if(!found){
                console.log("nuevo producto no esta en el carrito");
                let nuevoProducto = response.data
                nuevoProducto.cantidad = 1;
                carrito.push(nuevoProducto)
            }
            localStorage.setItem("carrito",JSON.stringify(carrito))
          
        })




}



function mostrarCarrito() {
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"))
    let bodyOffCanva = document.querySelector(".offcanvas-body")
    console.log(carritoLocalStorage.length)
    
    let tituloCarrito = document.querySelector(".textos")
    

    if(carritoLocalStorage.length >= 1){
        tituloCarrito.textContent = "Lista productos"
        let carritoHtml = ''
        carritoLocalStorage.forEach(producto=> {
           carritoHtml += ` <div class="carritoP">
            <img src="${producto.imagen}" class="imgProducto">
            <input type="number" style="width: 50px;">
            <p><strong>$</strong>${producto.precio}</p>
        </div>`
        }) 
        bodyOffCanva.textContent = carritoHtml
    }

}