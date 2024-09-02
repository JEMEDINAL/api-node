const usuario = require("../models/usuario.model")
const clientes = require("../models/clientes.model")

exports.getAllUsers = async (req,res) =>{
    const consulta = await usuario.find({})
    res.status(200).json(consulta)
}

exports.getOneUser = async (req,res) =>{
    const consulta = await usuario.findOne({_id:req.params.id})
    res.status(200).json(consulta)
}

exports.newUserClient = async (req,res) =>{
    let datosUsuario = {
        correo: req.body.correo,
        pass: req.body.pass
    }
    const usu = await usuario.create(datosUsuario)
    let datoscliente = {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        usuario:usu._id
    }
    const cli = await clientes.create(datoscliente)
    if (usu) {
        res.status(200).json({ "mensaje": "registro realizado" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo" })

    }

}

exports.newUser = async (req,res) =>{
    let datosUsuario = {
        correo: req.body.correo,
        pass: req.body.pass
    }
    const nuevoUsu = await usuario.create(datosUsuario)
    if (nuevoUsu) {
        res.status(200).json({ "mensaje": "registro realizado" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo" })

    }
}

exports.updateUser = async (req,res) => {
    let dataUser = {
        correo:req.body.correo,
        pass:req.body.pass
    }

    const actualizado = await usuario.findOneAndUpdate({_id:req.params.id},dataUser)
    if (actualizado) {
        res.status(200).json({ "mensaje": "Actualizado con exito" })
    } else {

        res.status(404).json({ "mensaje": "no se realizo" })

    }
}

exports.deleteUser = async (req,res) =>{
    const usuarioEliminado = await usuario.deleteOne({_id:req.params.id})
    if(usuarioEliminado){
        res.status(200).json({"mensaje":"eliminado con exito"})
    }else{
        res.status(404).json({"mensaje":"No se pudo eliminar"})
    }
}