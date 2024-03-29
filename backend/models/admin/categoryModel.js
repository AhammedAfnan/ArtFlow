const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
      },
},
 {timestamps:true}
)

const categoryModel = mongoose.model("category",categorySchema)

module.exports = categoryModel;