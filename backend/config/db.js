const mongoose = require("mongoose")
require('dotenv').config()

let mongoConnect = () => mongoose.connect(process.env.MONGO_URL,console.log('Database Connected'))


module.exports = {
    mongoConnect
}