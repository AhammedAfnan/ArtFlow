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

module.exports = adminRouter;