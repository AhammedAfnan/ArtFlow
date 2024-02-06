require('dotenv').config()
const User = require('../models/user/userModel'),
    bcrypt = require('bcrypt'),
    catchAsync = require('../util/catchAsync')

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
    
        const user = new User({
            name,
            mobile,
            password:hashedPassword,
            email
        })
        const newUser = await user.save()
    })

