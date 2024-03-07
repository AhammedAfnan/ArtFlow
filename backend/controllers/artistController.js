require("dotenv").config();
const catchAsync = require("../util/catchAsync"),
    bcrypt = require("bcrypt"),
    Artist = require("../models/artist/artistModel"),
    PlansHistory = require("../models/admin/subscriptionHistoryModel"),
    Plan = require("../models/admin/planModel"),
    otpTemplate = require("../util/otpTemplate"),
    randomString = require("randomstring"),
    Mail = require("../util/otpMailer"),
    jwt = require("jsonwebtoken"),
    paypal = require('paypal-rest-sdk')
    Category = require("../models/admin/categoryModel"),
    Post = require("../models/artist/postModel")

    paypal.configure({
      mode:"sandbox",
      client_id:process.env.PAYPAL_CLIENT_ID,
      client_secret:process.env.PAYPAL_SECRET_ID,
    })

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
        category,
    } = req.body;
    const artistExists = await Artist.findOne({email});
    if(artistExists) {
        return res.json({error:"Artist already exists"})
    }
    // hash password
    const hashPassword = await bcrypt.hash(password,10)
    const newOtp = randomString.generate({
        length:4,
        charset:"numeric",
    });
    console.log(newOtp)
    const field = await Category.findById(category)
    const artist = new Artist({
        name,
        mobile,
        password:hashPassword,
        email,
        YearsOfExperience:experience,
        worksDone,
        interest,
        educationalQualifications:qualification,
        communicationLanguage:language,
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
  

  exports.editArtistProfile = catchAsync (async(req,res)=>{
    const {
      name,
      mobile,
      experience,
      worksDone,
      interest,
      qualification,
      language,
      category
    } = req.body;
    if(req.body.artistProfile){
      const updatedArtist = await Artist.findByIdAndUpdate(
        {_id:req.artistId },
        {
          $set: {
            name,
            mobile,
            interest,
            worksDone,
            educationalQualifications:qualification,
            YearOfExperience:experience,
            communicationLanguage:language,
            category,
            profile:req.body.artistProfile,
          },
        },
        {new:true}
      )
      return res
        .status(200)
        .json({success:"profile updated successfully",updatedArtist})
    }
    if (!req.body.artistProfile){
      const updatedArtist = await Artist.findByIdAndUpdate(
        { _id: req.artistId },
        { 
          $set:{
            name, 
            mobile,
            interest,
            worksDone,
            educationalQualifications:qualification,
            YearOfExperience:experience,
            communicationLanguage:language,
            category,
          },
        },
        { new : true }
      )
      return res
          .status(200)
          .json({ success: "Profile updated successfully ", updatedArtist})
    }
    return res.status(200).json({error:"profile updating failed"})
  })

  exports.getMySubscriptions = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 3;
    const SubscriptionHistory = await PlansHistory.find({
      artist: req.artistId,
    }).countDocuments();
    const totalPages = Math.ceil(SubscriptionHistory / pageSize);
  
    const histories = await PlansHistory.find({ artist: req.artistId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("plan artist");
  
    return res.status(200).json({
      success: "ok",
      payments: histories,
      currentPage: page,
      totalPages,
    });
  });

  exports.getPlansAvailable = catchAsync(async (req, res) => {
    const plans = await Plan.find({ isDeleted: false });
    const artist = await Artist.findById(req?.artistId);
    let currentPlan = null;
    currentPlan = await Plan.findById(artist.subscription.currentPlan);
    if (currentPlan) {
      currentPlan = currentPlan.toObject();
      currentPlan.expiresOn = artist?.subscription?.expiresAt.toDateString();
    }
    return res.status(200).json({ success: "ok", plans, currentPlan });
  });

  exports.subscriptionPayment = catchAsync(async(req,res)=>{
    const { planId } = req.body;
    const plan = await Plan.findById(planId)

    const create_payment_json = {
      intent:"sale",
      payer:{
        payment_method:"paypal",
      },
      redirect_urls:{
        return_url:`http://localhost:5173/api/artist/successPayment?planId=${planId}&artistId=${req.artistId}`,
        cancel_url:`http://localhost:5173/api/artist/errorPayment`
      },
      transactions:[
        {
          item_list:{
            items:[
              {
                name:plan.name,
                sku:plan._id,
                price:plan.amount.toFixed(2),
                currency:"USD",
                quantity:1,
              },
            ],
          },
          amount:{
            currency:"USD",
            total:plan.amount.toFixed(2)
          },
          description:plan.description,
        },
      ],
    };
    paypal.payment.create(create_payment_json,(error,payment)=>{
      if(error){
        console.log(error);
        return res.status(500).json({error:"Error creating PayPal payment"})
      }else{
        const approvalUrl = payment.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        res.json({success:"approvalUrl sented",approvalUrl})
      }
    })
  })

  exports.uploadPost = catchAsync(async (req, res) => {
    console.log(req.body)
    const { title, description, artistPost } = req.body;
    const artistId = req.artistId;
    const newPost = await Post.create({
      title,
      description,
      postedBy: artistId,
      image: artistPost,
    });
  
    const updatedArtist = await Artist.findByIdAndUpdate(
      { _id: artistId },
      { $push: { posts: newPost._id } },
      { new: true }
    );
  
    if (updatedArtist) {
      return res.status(200).json({ success: "New post added successfully" });
    }
    return res.status(200).json({ error: "post adding failed" });
  });
  
  exports.getMyPosts = catchAsync(async (req, res) => {
    const posts = await Post.find({ postedBy: req.artistId })
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
          select: "name profile", // Replace 'User' with the actual model name for the user
        },
      })
      .populate("postedBy");
    if (posts) {
      return res.status(200).json({ success: "ok", posts });
    }
    return res.status(200).json({ error: "No posts available" });
  });

  exports.checkCurrentArtistBlocked = catchAsync(async (req, res) => {
    const currentArtist = await Artist.findById(req.artistId);
    if (currentArtist.isBlocked) {
      return res.json({ error: "You are blocked by admin", currentArtist });
    }
    return res.status(200).json({ success: "ok" });
  });