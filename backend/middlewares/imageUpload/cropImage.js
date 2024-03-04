const multer = require("multer")
const sharp = require("sharp")
const Admin = require("../../models/admin/adminModel")

const multerStorage = multer.memoryStorage()

const multerFilter = (res, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null,true)
    }else{
        cb(new AppError("Not an image !, Please upload only Images,400"),false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
})

exports.uploadBannerImage = upload.single("banner")

exports.resizeBannerImage = async (req,res,next) => {
    const adminId = req.adminId;
    const admin = await Admin.findById({_id:adminId})

    try {
        if(!req.file) return next();
        req.file.filename = `admin-${admin.email}-${Date.now()}.jpeg`;
        req.body.bannerImage = req.file.filename;
        await sharp(req.file.buffer)
            .resize(1080,1080)
            .toFormat("jpeg")
            .toFile(`public/userProfile/${req.file.filename}`)
        next()
    } catch (error) {
        res.json({error:"error in resizing image"})
        console.log(error.message)
    }
}

exports.uploadUserProfile = upload.single("profile");

exports.resizeUserProfile = async (req, res, next) => {
    const userId = req.userId;
    const user = await User.findById({ _id: userId });
  
    try {
      if (!req.file) return next();
      req.file.filename = `user-${user.email}-${Date.now()}.jpeg`;
      req.body.userProfile = req.file.filename;
      await sharp(req.file.buffer)
        .resize(1080, 1080)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/userProfile/${req.file.filename}`);
      next();
    } catch (error) {
      res.json({ error: "error in resizing image" });
      console.log(error.message);
    }
  };