import React, { use, useContext, useEffect, useState } from 'react'
import './SideBar.css'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContect } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
function Sidebar() {



const {logout,onlineUsers} = useContext(AuthContect)
const {getUsers,users,selectedUser,setSelectedUser,unseenMessages,setUnseenMessages} = useContext(ChatContext)


const [input,setInput] =useState(false)

const filteredUsers = input 
  ? users.filter(user => user.fullname.toLowerCase().includes(input.toLowerCase())) 
  : users;



useEffect(()=>
{
getUsers()
},[onlineUsers])



    const navigate=useNavigate()
  return (
    <div className='Sidebarmaindiv'>
     <div className='Sidebardiv'>
        <div className='sidebarheader'>
 <img src={assets.logo} alt='Logo' className='logoimage'></img>
 <div className='MenuDiv'>
 <img src={assets.menu_icon} alt='Menu' className='Menuimage'></img>
 <div className='Menubuttons'>
    <p onClick={()=>{navigate('/profile')}} className='Menubutton'>Edit Profile</p>
    <hr className='horizontalline' />
    <p onClick={()=>{logout()}} className='Menubutton'>Log Out</p>
 </div>
 </div>
        </div>

<div className='Searchdiv'>
    <img src={assets.search_icon} alt="Search" className='Searchimage' />
    <input onChange={(e)=>{setInput(e.target.value)}} type='text' className='Seachinput' placeholder='Search User'/>
</div>


     </div>


<div className='Chatlist'>
    

    {filteredUsers.map((user,index)=>
    {
        return <div 
        onClick={()=>{setSelectedUser(user);setUnseenMessages(prev=>({...prev,[user._id]:0 }))}}
        key={index}
        className={`Chatlistbox ${selectedUser?._id ===  user._id && 'ChatlistboxSlected' }`}>


  <img src={user?.profilepic || assets.avatar_icon} alt="profilePic" className='chatprofiles'/>
<div className='chatlistnameandstatus'>  

<p>{user.fullname}</p>
{
    onlineUsers.includes(user._id) ?
    <span className='onlinestatus'>Online</span>:
     <span className='onlinestatus offlinestatus'>Offline</span>
}
    </div>

{
    unseenMessages[user._id] >0 &&
    <p className='unseenchat'>{unseenMessages[user._id] }</p>
}


        </div>
    })}
</div>


    </div>
  )
}

export default Sidebar
