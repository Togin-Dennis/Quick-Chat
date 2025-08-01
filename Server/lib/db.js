import mongoose from "mongoose";

export const connectdb = async()=>{
    try {
        mongoose.connection.on('connection',()=>{console.log('database connected successfully');
        })
        await mongoose.connect(`${process.env.MONGODB_URL}/chat-app`)
    } catch (error) {
        console.log(error)
    }
}