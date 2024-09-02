const express = require("express")
const router = express.Router()
const productosController = require("../controller/productosController")
const usuariosController = require("../controller/usuariosController")

module.exports = function(){
    router.get("/index", productosController.getHome)

    // Productos
    router.get("/productos",productosController.getProductos)
    router.get("/productos/:id",productosController.getProducto)
    router.post("/productos",productosController.nuevoProducto)
    router.put("productos/:id",productosController.editarProducto)
    router.delete("productos/:id",productosController.eliminarProducto)

    // Usuarios
    router.get("/usurios",usuariosController.getAllUsers)
    router.get("/usuarios/:id",usuariosController.getOneUser)
    router.post("/registroCompleto",usuariosController.newUserClient)
    router.post("/usuario" ,usuariosController.newUser)

    return router
}
 