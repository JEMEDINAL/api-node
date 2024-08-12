const express = require("express")
const bodyParser = require('body-parser');
const usuario = require("./backend/models/usuario.model")

const logger = require("morgan")
require("dotenv").config()
var app = express()
app.set('view engine','ejs')
/*
app.use(bodyParser.json())
*/
app.set('view engine', 'ejs')
app.set('views','./views')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get("/",async (req,res)=>{
    const consulta = await usuario.find({})
    res.status(200).json(consulta)
})

app.get('/mostrar',(req,res) =>{
    res.render('pages/index')
})

app.get("/:ref",async (req,res)=>{
    req.params.ref
    let consulta = await usuario.findOne({referencia:req.params.ref})
    res.status(200).json(consulta)
})
/*
app.post("/",async (req,res)=>{
    const {correo , pass} = req.body
    
    const insercion = await usuario.create({correo:correo,pass:pass})
    if(insercion){
        res.status(200).json({"mensaje":"registro realizado"})
    }else{
        res.status(404).json({"mensaje":"no se realizo"})

    }
}) 
    */

app.post("/",async (req,res)=>{
    const nuevoUsuario = {
        referencia: req.body.referenciaProducto,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcionProducto,
        precio:  req.body.precioProducto,
        stock: req.body.stockProducto,
        Imagen: req.body.imagenProducto,
        habilitado:req.body.habilitadoProducto
    } 
    
    const insercion = await usuario.create(nuevoUsuario)
    if(insercion){
        res.status(200).json({"mensaje":"registro realizado"})
    }else{
        res.status(404).json({"mensaje":"no se realizo"})

    }
}) 

app.put("/:id", async (req,res)=>{
    const usuarioEditar = {
        referencia: req.body.referenciaProducto,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcionProducto,
        precio:  req.body.precioProducto,
        stock: req.body.stockProducto,
        Imagen: req.body.imagenProducto,
        habilitado:req.body.habilitadoProducto
    }
    let actualizar = await usuario.findOneAndUpdate({_id:req.params.id},usuarioEditar)
    if(actualizar){
        res.status(200).json({"mensaje":"actualizado exitoso"})
    }else{
        res.status(404).json({"mensaje":"no se realizo"})

    }
})

app.delete("/:id", async (req,res)=>{
    const eliminar = await usuario.deleteOne({_id:req.params.id})
    if(eliminar){
        res.status(200).json({"mensaje":"eliminado exitoso"})
    }else{
        res.status(404).json({"mensaje":"no se realizo"})
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT)
})