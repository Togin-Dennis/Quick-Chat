import express from 'express'

import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import { env } from 'process'
import { connectdb } from './lib/db.js'
import userRouter from './routes/UserRoutes.js'
import messageRouter from './routes/MessageRoutes.js';
import { Server } from 'socket.io'
import { initSocket } from './socket.js'; 


const app =  express()
const server = http.createServer(app)





initSocket(server)












app.use(express.json({limit:'4mb'}))
app.use(cors())
app.use('/api/status',(req,res)=>res.send("server is live"))
app.use('/api/auth', userRouter)
app.use('/api/messages',messageRouter)



await connectdb()

const PORT =process.env.PORT || 5000
server.listen(PORT,()=>console.log(`Server is running on port:${PORT}`))