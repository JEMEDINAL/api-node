const express = require("express")
const bodyParser = require('body-parser');
const usuario = require("./backend/models/usuario.model")
const productos = require("./backend/models/productos.model")
const clientes = require("./backend/models/clientes.model")

const logger = require("morgan")
require("dotenv").config()
var app = express()

/*
app.use(bodyParser.json())
*/
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hola")
})

// productos
app.get("/productos", async (req, res) => {
    const consulta = await productos.find({})
    res.status(200).json(consulta)
});



app.get("/productos/:ref", async (req, res) => {
    req.params.ref
    let consulta = await productos.findOne({ referencia: req.params.ref })
    res.status(200).json(consulta)
})

app.post("/productos", async (req, res) => {
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
})

app.put("/productos/:id", async (req, res) => {
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
        res.status(404).json({ "mensaje": "no se realizo" })

    }
})

app.delete("/productos/:id", async (req, res) => {
    const eliminar = await productos.deleteOne({ _id: req.params.id })
    if (eliminar) {
        res.status(200).json({ "mensaje": "eliminado exitoso" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo" })
    }
});

//clientes

app.get("/clientes", async (req, res) => {
    const consulta = await clientes.find({})
    res.status(200).json(consulta)
})

app.get("/clientes/:id", async (req, res) => {
    let consulta = await clientes.findOne({ _id: req.params.id })
    res.status(200).json(consulta)
})

app.post("/clientes", async (req, res) => {
    const nuevoClientes = {
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen: req.body.imagen,
        habilitado: req.body.habilitado
    }

    const insercion = await clientes.create(nuevoClientes)
    if (insercion) {
        res.status(200).json({ "mensaje": "registro realizado" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo" })

    }
})

app.put("/:id", async (req, res) => {
    const productEditar = {
        referencia: req.body.referencia,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        Imagen: req.body.imagen,
        habilitado: req.body.habilitado
    }
    let actualizar = await clientes.findOneAndUpdate({ _id: req.params.id }, productEditar)
    if (actualizar) {
        res.status(200).json({ "mensaje": "actualizado exitoso" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo" })

    }
})

app.delete("/:id", async (req, res) => {
    const eliminar = await clientes.deleteOne({ _id: req.params.id })
    if (eliminar) {
        res.status(200).json({ "mensaje": "eliminado exitoso" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo" })
    }
});
const emailS = require("./backend/utils/email.services")

app.get('/enviarCorreo', async (req, res) => {
    console.log('h')
    await emailS.sendEmail(
        "edwardstev372@gmail.com",
         "Mastubino",
        "TERRIBLE PAJERO",
    );
})

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
})