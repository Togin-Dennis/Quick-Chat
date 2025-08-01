import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import {io} from 'socket.io-client'
import { Navigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL


axios.defaults.baseURL = backendUrl

export const AuthContect = createContext()

export const AuthProvider = ({children})=>
{


    const [token,setToken] = useState (localStorage.getItem('token'))
    const [authUser,setAuthUser] =useState(null)

    const [onlineUsers,setonlineUsers] =useState([])
    const [socket,setSocket] =useState(null)


const checkAuth =async ()=>
{
    try {
      const {data} =  await axios.get("/api/auth/check")
    
       if(data.sucess)
       {
        setAuthUser(data.user)
        connectSocket(data.user)
       }
    
    } catch (error) {
        toast.error(error.message)
    }
}




const login = async (state,credentials)=>
{
    try {
        
const  {data} = await axios.post(`/api/auth/${state}`,credentials)

if(data.success)
{
    setAuthUser(data.userData)
    connectSocket(data.userData)
    axios.defaults.headers.common["token"] = data.token
    setToken(data.token)
    localStorage.setItem("token",data.token)
    toast.success(data.message)
}
else{
        toast.error(data.message)

}
    } catch (error) {
        toast.error(error.message)
    }
}


const logout = async ()=>
{
    localStorage.removeItem("token")
    setToken(null)
    setAuthUser(null)
    setonlineUsers([])
    axios.defaults.headers.common["token"] = null
    toast.success("logout successfully")
    socket.disconnect()
}



const updateProfile = async (body)=>
{
    try {

        console.log("🔥 HIT UPDATE PROFILE ENDPOINT") 
        const {data} =await axios.put("/api/auth/update-profile", body)
        if(data.success)
        {
setAuthUser(data.user)
toast.success('profile updated successfully')
        }
    } catch (error) {
        toast.error(error.message)
    }
}







const connectSocket = ( userData)=>
{


    if(!userData || socket?.connected) return ;

   const newSocket = io(backendUrl, {
    query: { userId: userData._id }
})

        newSocket.connect()
        setSocket(newSocket)
        newSocket.on("getOnlineUsers",(userIds)=>{

            setonlineUsers(userIds)
        })
}



useEffect(()=>
{
if(token)
{
axios.defaults.headers.common["token"] = token
}
checkAuth()
},[])




const value = {


axios,
authUser,
onlineUsers,
socket,
login,
logout,
updateProfile
}
return (
    <AuthContect.Provider value={value}>
{children}
    </AuthContect.Provider>
)
}
