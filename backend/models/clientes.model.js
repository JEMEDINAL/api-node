
const conexion = require("../config/connection")
const clientSchema = new conexion.Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre completo es obligatorio'],
        trim: true,
        maxLength:[100, 'El nombre es muy extenso'],
        minLength: [8,"El nombre es muy corto"],

    },
    telefono: {
        type: String,
        required: true  
    },
    direccion: {
        type: String,
        required: true,
        trim: true,
        minLength:[8,"La direccion es muy corta"],
    },
    habilitado: {
        type: Boolean,
        default: true
    },
    usuario:{
        type:conexion.SchemaTypes.ObjectId,
        ref:"User"
    }
},{versionKey:false});

const clientModel = conexion.model("clientes", clientSchema)
module.exports = clientModel;