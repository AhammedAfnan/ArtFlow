const express = require("express")
const adminRouter = express.Router()
const adminController = require("../controllers/adminController")


adminRouter
    .post('/postAdminLogin',adminController.verifyAdmin)
    .get('/Users',adminController.getUsers)
    .post("/blockUser",adminController.blockUser)

     //   category
  .get("/showCategories", adminController.showCategories)
  .post("/addCategory", adminController.addCategory)
  .post("/deleteCategory", adminController.deleteCategory)
  .post("/updateCategory", adminController.updateCategory)

    //plans
    .get("/showPlans",adminController.showPlans)
    .post("/postAddPlan",adminController.addPlan)
    .post("/deletePlan",adminController.deletePlan)
    .post("/updatePlan",adminController.updatePlan)
  

  //arists
  .get("/showArtists", adminController.showArtists)
  .post("/approveArtist", adminController.approveArtist)
  .post("/blockArtist", adminController.blockArtist)

  //banners
  .get("/showBanners",adminController.showBanners)
  .post("/deleteBanner",adminController.deleteBanner)

module.exports = adminRouter;