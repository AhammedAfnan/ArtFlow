const express = require('express'),
    userRouter = express.Router(),
    userController = require('../controllers/userController')

userRouter
    .post('/register',userController.register)

module.exports = userRouter;