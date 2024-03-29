const mongoose = require('mongoose'),
{ ObjectId } = mongoose.Schema.Types,

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
    },
    profile:{
        type:String,
        default:"avatar.png"
    },
    followings: [{ type: ObjectId, ref: "artist" }],
},
{timestamps:true}
)

module.exports = mongoose.model('user',userSchema);