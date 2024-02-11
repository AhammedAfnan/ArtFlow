const express = require('express');
const path = require('path')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const adminRoutes = require("./routes/adminRoutes");
const artistRoutes = require("./routes/artistRoutes");


const {mongoConnect} = require('./config/db')
require('dotenv').config()
const app = express()
const http = require('http').createServer(app)
mongoConnect()

app.use(
    cors({
        origin:"*",
    })
)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));

// user
app.use('/api/user',userRoute)


// admin
app.use("/api/admin", adminRoutes);


// //artist
app.use("/api/artist", artistRoutes);


const port = process.env.PORT || 8000;
const server = http.listen(port,()=>{
    console.log(`Server is running on PORT:${port}`);
})