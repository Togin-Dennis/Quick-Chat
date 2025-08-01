import mongoose from "mongoose"
import { generatetokken } from "../lib/Utils.js"
import User from "../models/User.js"
import Cloudinary from "../lib/Cloudinary.js"
import bcrypt from "bcryptjs";
export const Signup = async(req,res)=>{
    const {fullname,email,password,bio} =req.body
    try {
         
        if(!fullname || !email || !password || !bio)
         {
            return res.json({success:false,message:'Missing details'})
         }
     const user = await User.findOne({email})

     if(user)
  
        {
         res.json({success:false, message:'Email already exists'})
        }


  
const salt  =  await bcrypt.genSalt(10)
const hashedpassword = await bcrypt.hash(password,salt)

 const newUser = await User.create(
    {
        fullname,
        email,
        password:hashedpassword,
        bio
    }
 )
const token = generatetokken(userData._id);

res.json({success:true, userData:newUser,token ,message:'Account created successfully'})



}catch (error)
    {
    console.log(error.message);
    
res.json({success:false,message:error.message})
    
    }
}





export const login =async (req, res)=>
{
try {
      const {email,password} =req.body

   const userData = await User.findOne({email})

   const isPasswordCorrect = await bcrypt.compare(password,userData.password)


if(!isPasswordCorrect)
{
    return res.json({success:false,message:'invalid credentials'})
}


const token = generatetokken(userData._id);

return  res.json({success:true, userData, token ,message:'login successfull'})



} catch (error) {
     console.log(error.message);
    
res.json({success:false,message:error.message})
}
}


export const updateProfile = async(req,res)=>
{
    try {

        
const {profilePic,bio,fullname}= req.body
const userId=req.user._id

let updatedUser

if(!profilePic)
{
 updatedUser =  await User.findByIdAndUpdate(userId,{bio,fullname},{new:true})
}else
{
    const upload =await Cloudinary.uploader.upload(profilePic)

     updatedUser =  await User.findByIdAndUpdate(userId,{profilepic:upload.secure_url, bio,fullname},{new:true})
}

res.json({success:true , user:updatedUser})



    } catch (error) {
        console.log(error.message);
        
        res.json({success:false , message:error.message})
    }
}