require('dotenv').config()
const catchAsync = require("../util/catchAsync"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    Admin = require("../models/admin/adminModel"),
    User = require("../models/user/userModel"),
    Category = require('../models/admin/categoryModel'),
    Artist = require('../models/artist/artistModel')


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

  exports.showCategories = catchAsync(async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const pageSize = 2;
    const totalCategories = await Category.countDocuments();
    const totalPages = Math.ceil(totalCategories/pageSize)

    const categories = await Category.find({})
        .skip((page-1)*pageSize)
        .limit(pageSize)
        .sort({createdAt:-1});

        if (categories) {
            return res.status(200).json({
                success:"ok",
                categories,
                currentPage:page,
                totalPages,
            })
        }
  })

  exports.addCategory = catchAsync(async(req,res)=>{
    const { name, description } = req.body;
    const newCategory = await Category.create({
        name,
        description
    });
    if(newCategory){
        return res
            .status(200)
            .json({success:`${name} field added successfully`})
    }else{
        return res.json({error:"failed to add new field"})
    }
  })

  exports.deleteCategory = catchAsync(async(req,res)=>{
    const category = await Category.findById(req.body.id);
    const updatedCategory = await Category.findOneAndUpdate(
        { _id:req.body.id },
        { $set:{isDeleted:!category.isDeleted }},
        { new: true }
    )
    if (updatedCategory) {
        return res.status(200).json({success:`${category.name} has updated`})
    }else{
        return res.json({error:"error in updatig "})
    }
  })

  exports.updateCategory = catchAsync(async(req,res)=>{  
    const { name, description, id } = req.body;
    const category = await Category.findById(id)
    const duplicateCategories = await Category.find({
        name:{ $ne:category.name,$regex:new RegExp("^" + name + "$", "i")},          
    })
    if (duplicateCategories.length){
      return res.json({error:"category name already exists"})
    }
    const updateCategory = await Category.findByIdAndUpdate(
      {_id:id},
      {$set:{name:name, description:description}}
    )
  
    if (updateCategory){c
      return res
          .status(200)
          .json({success:`${name} field updated successfully `})
    }else{
      return res.json({error:"updating failed"})
    }
  })

  
  // Artists

  exports.showArtists = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 2;
    const totalArtists = await Artist.countDocuments();
    const totalPages = Math.ceil(totalArtists / pageSize);
  
    const artists = await Artist.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });
  
    return res.status(200).json({
      success: "ok",
      artists,
      currentPage: page,
      totalPages,
    });
  });

  exports.approveArtist = catchAsync(async (req, res) => {
    const { id } = req.body;
    const artist = await Artist.findOne({ _id: id });
    if (artist) {
      artist.isApproved = true;
      await artist.save();
      return res.status(200).json({ success: `${artist.name} has approved` });
    }
    return res.json({ error: "Approval failed" });
  });

  exports.blockArtist = catchAsync(async (req, res) => {
    const artist = await Artist.findById(req.body.id);
    const updatedArtist = await Artist.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { isBlocked: !artist.isBlocked } },
      { new: true }
    );
    if (updatedArtist.isBlocked) {
      return res
        .status(200)
        .json({ success: `${artist.name} has blocked`, updatedArtist });
    }
    if (!updatedArtist.isBlocked) {
      return res
        .status(200)
        .json({ success: `${artist.name} has unblocked`, updatedArtist });
    }
    return res.json({ error: "error in updating" });
  });
  