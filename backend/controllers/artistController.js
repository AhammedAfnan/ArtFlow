require("dotenv").config();
const catchAsync = require("../util/catchAsync"),
    bcrypt = require("bcrypt"),
    Artist = require("../models/artist/artistModel"),
    otpTemplate = require("../util/otpTemplate"),
    randomString = require("randomstring"),
    Mail = require("../util/otpMailer"),
    jwt = require("jsonwebtoken"),
    Category = require("../models/admin/categoryModel")

exports.getCategories = catchAsync(async(req,res)=>{
    const categories = await Category.find({})
    if (categories){
        return res.status(200).json({success:"ok",categories})
    }
})

exports.register = catchAsync(async(req,res)=>{
    const {
        name,
        mobile,
        email,
        password,
        experience,
        worksDone,
        interest,
        qualification,
        language,
        category
    } = req.body;
    const artistExists = await ArtistRegister.findOne({email});
    if(artistExists) {
        return res.json({error:"Artist already exists"})
    }
    // hash password
    const hashPassword = await bcrypt.hash(password,10)
    const newOtp = randomString.generate({
        length:4,
        charset:"numeric",
    });
    // const field = await
    const artist = new Artist({
        name,
        mobile,
        password:hashPassword,
        email,
        YearsOfExperience:experience,
        worksDone,
        interest,
        educationalQualifications:qualification,
        commmunicationLanguage:language,
        // category,
        field:field.name,
        otp:{
            code:newOtp,
            generatedAt: Date.now(),
        },
    })
    const newArtist = await artist.save();
    if (newArtist){
        const options = {
            from:process.env.Email,
            to:email,
            subject:"Arthub register verification OTP",
            html:otpTemplate(newOtp),
        };
        await Mail.sendMail(options);
        return res.json({ success : "otp sented to your mail",email})
    }
})

exports.verifyOtp = catchAsync(async(req,res)=>{
    const { otp, email } = req.body;
    if (!otp) {
        return res.json({error:"please enter otp"})
    }
    const artist = await Artist.findOne({email})
    const generatedAt = new Date(artist.otp.generatedAt).getTime();
    if (Date.now()-generatedAt <= 60*1000) {
        if (otp === artist.otp.code){
            artist.isVerified = true;
            artist.otp.code = '';
            artist.otp.generatedAt = null;
            await artist.save()
            return res
                .status(200)
                .json({success:"Otp verified successfully",email})
        }else{
            return res.json({error:"otp is invalid"})
        }
    }else{
        return res.json({error:"otp expired"})
    }
})

exports.ResendOtp = catchAsync(async (req, res) => {
    if (!req.body.email) {
      return res.json({ error: "email not found" });
    }
    const artist = await Artist.findOne({ email: req.body.email });
    const newOtp = randomString.generate({
      length: 4,
      charset: "numeric",
    });
    const options = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "ArtHub verification otp",
      html: otpTemplate(newOtp),
    };
    await Mail.sendMail(options)
      .then((res) => console.log("otp sended"))
      .catch((err) => console.log(err.message));
  
    artist.otp.code = newOtp;
    artist.otp.generatedAt = Date.now();
    await artist.save();
    return res
      .status(200)
      .json({ success: "Otp Resended", email: req.body.email });
  });

  exports.verifyLogin = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const artist = await Artist.findOne({ email: email });
    if (!artist) {
      return res.json({ error: "Artist not found" });
    }
    const samePass = await bcrypt.compare(password, artist.password);
    if (!samePass) {
      return res.json({ error: "invalid password" });
    }
    if (artist.isBlocked) {
      return res.json({ error: "sorry,you are blocked by the Admin!" });
    }
    if (!artist.isApproved) {
      return res.json({ error: "wait for the Approval by the Admin!" });
    }
    if (!artist.isVerified) {
      await Artist.findOneAndDelete({ email: email });
      return res.json({ error: "sorry,you are not verified!, sign up again" });
    }
    const token = jwt.sign({ id: artist._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({ success: "Login Successfull", token, artist });
  });
  