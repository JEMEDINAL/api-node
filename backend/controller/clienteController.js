const clientes = require("../models/clientes.model")

exports.getClientes = async (req,res) =>{
    const consulta = await clientes.find({})
    res.status(200).json(consulta)
   
}

exports.unCliente = async (req,res) => {
    const consulta = await clientes.findOne({_id:req.paramas.id})
    res.status(200).json(consulta)
}

exports.actualizarCliente = async (req,res) => {
    const clienteEditar = {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion
    }
    let actualizar = await clientes.findOneAndUpdate({ _id: req.params.id }, clienteEditar)
    if (actualizar) {
        res.status(200).json({ "mensaje": "actualizado exitoso" })
    } else {
        res.status(404).json({ "mensaje": "no se realizo" })

    }
}

exports.eliminarCliente = async (req,res) => {
     let cliente = await clientes.deleteOne({_id:req.paramas.id})
     if (cliente){
        res.status(200).json({"mensaje":"Eliminado exitoso"})
     }else{
        res.status(404).json({"mensaje":"No se encontro el cliente"})
     }
}

