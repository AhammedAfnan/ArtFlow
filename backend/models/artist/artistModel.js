const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const artistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    worksDone: {
        type: Number,
    },
    YearOfExperience: {
        type: String,  
    },
    otp:{
        code:{
            type:String,
        },
        generatedAt:{
            type:Date,
        },
    },
    category:{
        type:ObjectId,
        ref:"category"
    },
    field:{
        type:String,
        required:true,
    },
    interest:{
        type:String,
    },
    educationalQualifications:{
        type:String,
    },
    communicationLanguage:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    isApproved:{
        type:Boolean,
        default:false,
    },
},
{timestamps:true}
)

const artistModel = mongoose.model("artist",artistSchema)

module.exports = artistModel;
