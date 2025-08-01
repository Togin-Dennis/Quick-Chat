import User from "../models/User.js"
import Message from "../models/Message.js"
import Cloudinary from "../lib/Cloudinary.js"
import { io, userSocketMap } from "../socket.js";


export const getUsersForSidebar = async(req,res)=>
{
try {
    const userId = req.user._id
    const filteredUsers = await User.find({_id:{$ne:userId}}).select("-password")
    
    const unseenMessages = {}

    const promises = filteredUsers.map(async (user)=>{
        const messages = await Message.find({senderId:user._id , recieverId:userId ,seen:false})

        if(messages.length > 0) 
        {
            unseenMessages[user._id] = messages.length
           
        }   

    })

await Promise.all(promises)
res .json({success:true,users:filteredUsers,unseenMessages})

} catch (error) {
    
    console.log(error.message);
    res.json({success:false , message:error.message})
    
    
    
}
}

export const getMessages = async (req,res)=>
{
try {
    
const {id:selectedUserID} = req.params
const myId = req.user._id

const messages = await Message.find({
    $or:[
        {senderId:myId,recieverId:selectedUserID},
        {senderId:selectedUserID,recieverId:myId}
    ]
})
await Message.updateMany({senderId:selectedUserID,recieverId:myId},{seen:true})

res.json({success:true ,messages})

} catch (error) {
        console.log(error.message);
    res.json({success:false , message:error.message})
}
}


export const markMessagesAsSeen = async (req,res)=>
{
try {
    
const {id} = req.params
await Message.findByIdAndUpdate(id,{seen:true})
res.json({success:true})



} catch (error) {
      console.log(error.message);
    res.json({success:false , message:error.message})
}
}



export const sendMessage = async(req,res)=>
{
try {


    const {text , image} =req.body
    const recieverId = req.params.id
    const senderId = req.user._id

    let imageurl 
    if(image)
    {
        const uploadResponse = await Cloudinary.uploader.upload(image)
        imageurl = uploadResponse.secure_url
    }

const newMessage =await Message.create({senderid:senderId,
    recieverId,
    text,
    image:imageurl
})




const recieverSocketId = userSocketMap[recieverId]


if(recieverSocketId)
{
     io.to(recieverSocketId).emit("newMessage",newMessage)
}



res.json({success:true,newMessage})

} catch (error) {
       console.log(error.message);
    res.json({success:false , message:error.message})
}
}