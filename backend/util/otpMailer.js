const nodemailer = require('nodemailer')
require("dotenv").config()

exports.sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    transporter.sendMail(options,(error,info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(info.response);
        }
    })
}