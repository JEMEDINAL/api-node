const mongoose = require("mongoose")
require("dotenv").config()

//const URI = `mongodb+srv://${process.env.USERBD}:${process.env.PASSWORDBD}@adso2669736.unkkdqc.mongodb.net/${process.env.DB}`
const URI= `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORDDB}@adso2669736.unkkdqc.mongodb.net/${process.env.DB}`
mongoose.connect(URI)

module.exports = mongoose 