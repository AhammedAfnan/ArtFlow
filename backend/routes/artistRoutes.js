const express = require("express"),
   artistRouter = express.Router(),
   artistController = require("../controllers/artistController"),
   artistAuthMiddleware = require("../middlewares/Auth/artistAuth"),
   upload = require("../middlewares/imageUpload/cropImage"),
   PlanExpired = require("../middlewares/artistPlanExpiryCheck");


artistRouter
    .post("/artistRegister",artistController.register)
    .get('/getCategories',artistController.getCategories)
    .post('/artistOtp',artistController.verifyOtp)
    .post('/artistResendOtp',artistController.ResendOtp)
    .post('/artistVerifyLogin',artistController.verifyLogin)
    .get(
      "/getPlansAvailable",
      artistAuthMiddleware,
      artistController.getPlansAvailable
    )
    .post(
      "/subscribePlan",
      artistAuthMiddleware,
      artistController.subscriptionPayment
    )
    .post(
        "/editArtistProfile",
        artistAuthMiddleware,
        upload.uploadArtistProfile,
        upload.resizeArtistProfile,
        artistController.editArtistProfile
      )
      .post(
        "/uploadPost",
        artistAuthMiddleware,
        PlanExpired.isPlanExpired,
        upload.uploadArtistPost,
        upload.resizeArtistPost,
        artistController.uploadPost
      )
      .get("/getMyPosts", artistAuthMiddleware, artistController.getMyPosts)
      .get(
        "/checkArtistBlocked",
        artistAuthMiddleware,
        artistController.checkCurrentArtistBlocked
      )

  // notifications 

  .get(
    "/getMySubscriptions",
    artistAuthMiddleware,
    artistController.getMySubscriptions
  )

module.exports = artistRouter;
