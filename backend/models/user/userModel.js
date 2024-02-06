const mongoose = require('mongoose'),

userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
},
{timestamps:true}
),
userModel = mongoose.model('User',userSchema)
module.exports = userModel;