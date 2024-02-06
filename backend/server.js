const express = require('express');
const path = require('path')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
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

app.use('/api/user',userRoute)

const port = process.env.PORT || 8000;
const server = http.listen(port,()=>{
    console.log(`Server is running on PORT:${port}`);
})