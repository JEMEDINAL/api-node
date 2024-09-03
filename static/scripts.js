
let botonProducto = document.querySelector(".addCarrito")
var carrito = []

botonProducto.addEventListener("click", e => {
    if (e.target.classList.contains('addCarrito')) {

        const idProducto = document.querySelector("#idProducto").value
        const url = `${location.origin}/productos/${idProducto}`

        axios.get(url)
            .then(response => {
                agregarCarrito(response.data)

                console.log(carrito);
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });

    }

})

function agregarCarrito(producto) {
    if(carrito.length == 0){
        console.log("Agregamos un producto .");
        carrito.push(producto)
    }else if (carrito.length > 1){
        for (let i = 0; i < carrito.length; i++) {
            if (response.data._id === carrito[i]._id) {
                console.log("ya lo tienes en el carrito una unidad mas para el mismo producto")
                break
            }else{
                carrito.push(response.data)
                break
            }
        }
    }
    
   
}





