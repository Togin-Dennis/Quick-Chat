import User from "../models/User.js";
import jwt from 'jsonwebtoken'



export const protectRoute = async(req,res,next)=>
{
    try {
        const token =req.headers.token
        const decodded = jwt.verify(token,process.env.JWT_SECRET)
        const user =await User.findById(decodded.userid).select("-password")
 if(!user)
 {
    return res.json({success:false , message:'user not found'})
 }

 req.user = user
next()



    } catch (error) {

        console.log(error.message);
        
        res.json({success:false , message:error.message})
    }
}

export const checkAuth = (req,res)=>
{
res.json({success:true , user:req.user})
}