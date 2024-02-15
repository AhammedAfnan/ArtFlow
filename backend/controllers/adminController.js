require('dotenv').config()
const catchAsync = require("../util/catchAsync"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    Admin = require("../models/admin/adminModel"),
    User = require("../models/user/userModel")


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
    .json({success:"Admin Login Successfull",token,admin});
});

exports.getUsers = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 2;
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);
  
    const users = await User.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });
  
    return res.status(200).json({
      success: "ok",
      users,
      currentPage: page,
      totalPages,
    });
  });

  exports.blockUser = catchAsync(async(req,res)=>{
    const user = await User.findById(req.body.id);
    const updateUser = await User.findOneAndUpdate(
        {_id:req.body.id},
        {$set:{isBlocked:!user.isBlocked}},
        { new: true}
    );
    if (updateUser.isBlocked){
        return res
            .status(200)
            .json({success:`${user.name} has blocked`,updateUser})
    }
    if(!updateUser.isBlocked){
        return res
            .status(200)
            .json({success:`${user.name} has unblocked,updateUser`})
    }
    return res.json({error:"error in updating"})
  })