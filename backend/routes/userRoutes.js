const express = require('express'),
    userRouter = express.Router(),
    userController = require('../controllers/userController')

userRouter
    .post('/register',userController.register)
    .post("/verifyOtp", userController.verifyOtp)
    .post("/verifyLogin", userController.verifyLogin)
    .post("/resendOtp", userController.ResendOtp)
    .post("/verifyEmail", userController.forgetVerifyEmail)
    .post("/updatePassword", userController.updatePassword)

module.exports = userRouter;