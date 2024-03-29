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
    .get("/getAllFollowingPosts", userAuth, userController.getAllFollowingsPosts)
    .get("/getAllPosts", userAuth, userController.getAllPosts)
    .post(
        "/updateUserProfile",
        userAuth,
        upload.uploadUserProfile,
        upload.resizeUserProfile,
        userController.updateUserProfile
      )
    .post("/likePost", userAuth, userController.likePost)
    .post("/unLikePost", userAuth, userController.unLikePost)
    .get("/getCurrentUser", userAuth, userController.getCurrentUser)
    .post("/getArtistFollowers", userAuth, userController.getArtistFollowers)
    .get("/getAllBanners", userAuth, userController.getAllBanners)
    .post("/getComments", userAuth, userController.getComments)
    .get("/getAllArtists", userAuth, userController.getAllArtists)
    .post("/getArtistAllposts", userAuth, userController.getArtistAllposts)
    .post("/followArtist", userAuth, userController.followArtist)
    .post("/unFollowArtist", userAuth, userController.unFollowArtist)
    .get(
        "/userNotificationsCount",
        userAuth,
        userController.getNotificationCount
      )
      .get("/getUserFollowings", userAuth, userController.getUserFollowings)
      .post("/comment", userAuth, userController.comment)
      //notifications
  .get(
    "/getUserAllNotifications",
    userAuth,
    userController.getUserNotifications
  )

  .delete(
    "/clearUserAllNotifications",
    userAuth,
    userController.clearAllNotification
  )

  .delete(
    "/deleteUserNotification",
    userAuth,
    userController.deleteNotification
  )

      // chat
    .get("/getArtistsFollowed", userAuth, chatController.getArtistUserFollow)
    .post("/getChatMessages", userAuth, chatController.getChatMessages)
    .post("/sendNewMessage", userAuth, chatController.sendNewMessage)

module.exports = userRouter;