const express = require("express"),
   artistRouter = express.Router(),
   artistController = require("../controllers/artistController")


artistRouter
    .post("/artistRegister",artistController.register)
    .get('/getCategories',artistController.getCategories)
    .post('/artistOtp',artistController.verifyOtp)
    .post('/artistResendOtp',artistController.ResendOtp)
    .post('/artistVerifyLogin',artistController.verifyLogin)

module.exports = artistRouter;
