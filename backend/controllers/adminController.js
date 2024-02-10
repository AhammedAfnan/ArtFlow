require('dotenv').config()
const catchAsync = require("../util/catchAsync"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    Admin = require("../models/admin/adminModel")


exports.verifyAdmin = catchAsync(async(req,res)=>{
    const { email, password} = req.body;

    const admin = await Admin.findOne({email:email})

if (!admin) {
    return res.json({error:"Admin not found"})
}

const samePassword = await bcrypt.compare(password,admin.password);
if (!samePassword){
    return res.json({error:'incorrect password'})
}
const token = jwt.sign({id:admin._id},process.env.jWT_SECRET,{
    expiresIn:"7d",
})

return res
    .status(200)
    .json({success:"Admin Login Successfull",token,admin})
})