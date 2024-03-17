const express = require('express'),
    userRouter = express.Router(),
    userController = require('../controllers/userController'),
    chatController = require("../controllers/chatController"),
    userAuth = require("../middlewares/Auth/userAuth")
    upload = require("../middlewares/imageUpload/cropImage");

userRouter
    .post('/register',userController.register)
    .post("/verifyOtp", userController.verifyOtp)
    .post("/verifyLogin", userController.verifyLogin)
    .post("/resendOtp", userController.ResendOtp)
    .post("/verifyEmail", userController.forgetVerifyEmail)
    .post("/updatePassword", userController.updatePassword)
    .post(
        "/updateUserProfile",
        userAuth,
        upload.uploadUserProfile,
        upload.resizeUserProfile,
        userController.updateUserProfile
      )
    .get("/getCurrentUser", userAuth, userController.getCurrentUser)
    .get("/getAllBanners", userAuth, userController.getAllBanners)
    .get("/getAllArtists", userAuth, userController.getAllArtists)
    .post("/followArtist", userAuth, userController.followArtist)
    .post("/unFollowArtist", userAuth, userController.unFollowArtist)
    .get(
        "/userNotificationsCount",
        userAuth,
        userController.getNotificationCount
      )

      // chat
    .get("/getArtistsFollowed", userAuth, chatController.getArtistsUserFollow)

module.exports = userRouter;