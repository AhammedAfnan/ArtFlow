const express = require("express"),
   artistRouter = express.Router(),
   artistController = require("../controllers/artistController"),
   artistAuthMiddleware = require("../middlewares/Auth/artistAuth"),
   upload = require("../middlewares/imageUpload/cropImage")


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
        "/editArtistProfile",
        artistAuthMiddleware,
        upload.uploadArtistProfile,
        upload.resizeArtistProfile,
        artistController.editArtistProfile
      )

  // notifications 

  .get(
    "/getMySubscriptions",
    artistAuthMiddleware,
    artistController.getMySubscriptions
  )

module.exports = artistRouter;
