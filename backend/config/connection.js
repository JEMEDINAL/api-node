const mongoose = require("mongoose")
require("dotenv").config()


const URI= `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORDDB}@adso2669736.unkkdqc.mongodb.net/${process.env.DB}`
mongoose.connect(URI)

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, 
})
.then(() => console.log("Conexión exitosa a MongoDB"))
.catch(err => console.error("Error al conectar con MongoDB", err));

module.exports = mongoose 