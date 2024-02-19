require('dotenv').config()
const User = require('../models/user/userModel'),
    jwt = require('jsonwebtoken');
const catchAsync = require('../util/catchAsync');
    bcrypt = require('bcrypt'),
    otpTemplate = require('../util/otpTemplate'),
    Mail = require('../util/otpMailer'),
    randomString = require('randomstring')

    exports.register = catchAsync(async(req,res)=>{
        const {name,mobile,email,password}= req.body;
        const userExists = await User.findOne({email:email})
        if (userExists){
            return res.json({error:'User already exists'})
        }
        const mobileExists  = await User.findOne({mobile:mobile})
        if (mobileExists){
            return res.json({error:'mobile number already exists'})
        }
    
        const hashedPassword = await bcrypt.hash(password,10)

        const newOtp = randomString.generate({
            length: 4,
            charset: "numeric",
          });
        
        const user = new User({
            name,
            mobile,
            password:hashedPassword,
            email,
            otp:{
                code:newOtp,
                generatedAt:Date.now(),
            },
        })
        const newUser = await user.save()

        if (newUser){
            const options = {
                from:process.env.Email,
                to:email,
                subject:"ArtFlow register verification OTP",
                html:otpTemplate(newOtp)
            }
            await Mail.sendMail(options)
            return res.json({success:"otp sented to mail",email})
        }
    })

    exports.verifyOtp = catchAsync(async(req,res)=>{
        if(!req.body.otp){
            return res.json({error:"please enter otp"})
        }
        const user = await User.findOne({email:req.body.email})
        const generatedAt = new Date(user.otp.generatedAt).getTime()
        if (Date.now()-generatedAt<= 60 * 1000){
            if (req.body.otp===user.otp.code){
                user.isVerified = true;
                user.otp.code='',
                user.otp.generatedAt=null;
                await user.save();
                return res
                    .status(200)
                    .json({success:"Otp verified successfully",email:req.body.email})
            }else{
                return res.json({error:"otp is invalid"})
            }
        }
        else{
            return res.json({error:"otp expired"})
        }
    })

    exports.verifyLogin = catchAsync(async(req,res)=>{
        const { email, password } = req.body;
        const user = await User.findOne({email:email})
        if (!user){
            return res.json({error:"User not found"})
        }
        const samePass = await bcrypt.compare(password,user.password)
        if (!samePass){
            return res.json({error:'invalid password'})
        }
        if (user.isBlocked){
            return res.json({error:'sorry, you are blocked by the Admin!'})
        }
        if (!user.isVerified){
            await User.findOneAndDelete({email:email})
            return res.json({error:'sorry, you are not verified!, sign up again'})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1d',
        })
        return res.status(200).json({success:"Login Successfull",token,user})
    })

    exports.ResendOtp = catchAsync(async(req,res)=>{
        if(!req.body.email){
            return res.json({error:"email not found!"})
        }
        const user = await User.findOne({email:req.body.email})

        const newOtp = randomString.generate({
            length:4,
            charset:"numeric",
        })
        
        const options = {
            from:process.env.Email,
            to:req.body.email,
            subject:"Arthub verification otp",
            html:otpTemplate(newOtp)
        };
        await Mail.sendMail(options)
            .then((res)=>console.log('otp sended'))
            .catch((err)=>console.log(err.message))

            user.otp.code = newOtp;
            user.otp.generatedAt = Date.now()
            await user.save()
            return res
                .status(200)
                .json({success:"Otp Resended",email:req.body.email})
    })