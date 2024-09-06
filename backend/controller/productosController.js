const productos = require("../models/productos.model")


exports.getHome = async (req,res) => {
    const consulta = await productos.find({})
    res.render("index", {consulta:consulta})
}

exports.admin = async (req,res) => {
    let allProducts = await productos.find({})
    res.render('listarProductos',{consulta:allProducts})
}

exports.getProducto = async (req,res) =>{
    let consulta = await productos.findOne({ _id: req.params.id })
    if (consulta) {
        res.status(200).json(consulta)
    } else {
        res.status(404).json({ "mensaje": "no existe" })

    }
    
}

exports.nuevoProducto = async (req,res) =>{
    const nuevoProducto = {
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen: req.body.imagen,
        habilitado: req.body.habilitado
    }

    const insercion = await productos.create(nuevoProducto)
    
    if (insercion) {
        res.status(200).json({ "mensaje": "registro realizado" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo" })

    }
}

exports.editarProducto = async (req,res) =>{
    const productEditar = {
        referencia: req.body.referencia,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        Imagen: req.body.imagen,
        habilitado: req.body.habilitado
    }
    let actualizar = await productos.findOneAndUpdate({ _id: req.params.id }, productEditar)
    if (actualizar) {
        res.status(200).json({ "mensaje": "actualizado exitoso" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo mal" })

    }
}

exports.eliminarProducto = async (req,res) => {
    const eliminar = await productos.deleteOne({ _id: req.params.id })
    if (eliminar) {
        res.status(200).json({ "mensaje": "eliminado exitoso" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo" })
    }
}