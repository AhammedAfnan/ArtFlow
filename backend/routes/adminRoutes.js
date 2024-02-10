const express = require("express")
const adminRouter = express.Router()
const adminController = require("../controllers/adminController")


adminRouter
    .post('/postAdminLogin',adminController.verifyAdmin)

module.exports = adminRouter;