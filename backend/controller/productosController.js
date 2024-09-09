require("dotenv").config()
const productos = require("../models/productos.model")
const stripe = require("stripe")(process.env.STRIPEKEY)

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


exports.checkoutCarrito = (req,res) =>{
    res.render("checkout")
}


const calculateOrderAmount = (items) => {
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    let total = 0;
    items.forEach((item) => {
      total += (item.precio * item.cantidad);
    });
    return total;
  };
  
  exports.create_payment_intent = async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
      // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  };
  