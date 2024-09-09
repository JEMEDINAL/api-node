const express = require("express")
const router = express.Router()
const productosController = require("../controller/productosController")
const usuariosController = require("../controller/usuariosController")
const clienteController = require("../controller/clienteController")

module.exports = function(){
    router.get("/index", productosController.getHome)

    // Productos

    router.get("/productos/:id",productosController.getProducto)
    router.get("/admin",productosController.admin)
    router.post("/productos",productosController.nuevoProducto)
    router.put("productos/:id",productosController.editarProducto)
    router.delete("productos/:id",productosController.eliminarProducto)

    // Usuarios
    router.get("/usurios",usuariosController.getAllUsers)
    router.get("/usuarios/:id",usuariosController.getOneUser)
    router.post("/registroCompleto",usuariosController.newUserClient)
    router.post("/usuario" ,usuariosController.newUser)
    router.put("/usuario/:id",usuariosController.updateUser)
    router.delete("/usuario/:id",usuariosController.deleteUser)


    //clientes
    router.get("/cliente",clienteController.getClientes)
    router.get("/cliente/:id",clienteController.unCliente)
    router.put("/cliente/:id",clienteController.actualizarCliente)
    router.delete("/cliente/:id",clienteController.eliminarCliente)

    router.get("/checkout", productosController.checkoutCarrito)
    router.post("/create-payment-intent",productosController.create_payment_intent)

    return router
}
 