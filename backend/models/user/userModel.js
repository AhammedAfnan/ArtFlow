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
    otp:{
        code:{
            type:String,
        },
        generatedAt:{
            type:Date,
            default:Date.now()
        },
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    }
},
{timestamps:true}
),
userModel = mongoose.model('User',userSchema)
module.exports = userModel;