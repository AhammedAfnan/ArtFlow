require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = async (req,res,next)=>{
    try {
        const tokenWithoutQuotes = req.headers["authorization"]?.split(" ")[1];
        const adminToken = tokenWithoutQuotes.replace(/"/g,"");
        if (!adminToken){
            return res.json({
                error:"No token provided",
            });
        }
        jwt.verify(
            adminToken,
            process.env.JWT_SECRET,
            { ignoreExpiration: true},
            (err,decoded) =>{
                if (err) {
                    console.log(err.message);
                    return res.json({
                        error:"Authentication failed"
                    });
                }
                req.adminId = decoded?.id;
                next()
            }
        )
    } catch (error) {
        console.log(error);
        return res.json({error:"Internal server error"})
    }
}