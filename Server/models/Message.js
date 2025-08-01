import mongoose, { Types } from "mongoose";


const MessageSchema = mongoose.Schema({

senderid:{type:mongoose.Schema.Types.ObjectId, ref:'User' ,required:true},
recieverId:{type:mongoose.Schema.Types.ObjectId, ref:'User' ,required:true},
text:{type:String},
image:{type:String},
seen:{type:Boolean,default:false}


},{timestamps:true})

const Message = mongoose.model('Message',MessageSchema)

export default Message