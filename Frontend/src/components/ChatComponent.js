import React, { useContext, useEffect, useRef, useState } from 'react'
import './ChatComponent.css'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/Utils'
import { ChatContext } from '../Context/ChatContext'
import { AuthContect } from '../Context/AuthContext'
import toast from 'react-hot-toast'
function ChatComponent() {


const {messages,selectedUser,setSelectedUser,sendMessage,getMessages} =useContext(ChatContext)
const {authUser,onlineUsers } =useContext(AuthContect)

const [input,setInput] =useState('')


const scrollend = useRef()




useEffect(
  ()=>
  {
    if(selectedUser)
    {
      getMessages(selectedUser._id)
    }
  },[selectedUser]
)



useEffect(
  ()=>
  {
 if(scrollend.current && messages)
  scrollend.current.scrollIntoView({behavior : 'smooth'})
  },[messages]
)


const handleSendMessage =async (e)=>
{
e.preventDefault()
if(input.trim() === '') return null
await sendMessage({text:input.trim()})
setInput('')
}



const handleSendImage =async(e)=>
{
  const file = e.target.files[0]
  if(!file, !file.type.startsWith('image/'))
  {
    toast.error('Slect an image file')
  }
  const reader = new FileReader()
  reader.onloadend = async ()=>
  {
    await sendMessage({image:reader.result})
    e.target.value = ''
  }

  reader.readAsDataURL(file)
}









  return selectedUser ? (
    <div className='chatcomponentmaindiv'>
<div className='chatprofilediv'>
<img src={selectedUser.profilepic || assets.avatar_icon} alt='' className='chatprofilepic'/>
<p className='chatname'>
  {selectedUser.fullname}
    {onlineUsers.includes(selectedUser._id) && <span className='chatonlinestatus'></span>}  
</p>


<img onClick={()=>{
  setSelectedUser(false)
}} src={assets.arrow_icon} alt='' className='chatinfopic'/>

<img src={assets.help_icon} className='chathelpic'/>
</div>


<div className='messageshow'>
{messages.map((msg,index)=>(
<div key={index} className={`msgboxdiv ${msg.senderid !== authUser._id ? 'msgboxdivextra' : ''}`}>

{msg.image ? (
  <img src={msg.image} className='msgtext'/>
):(
  <p className={`msgtext ${msg.senderid !== authUser._id ? 'msgtxttrue' : 'msgtxtfalse'}`}>
    {msg.text}
  </p>
)

}




<div className='sendingdiv'>

<img src={msg.senderid === authUser._id ? authUser?.profilepic ||  assets.avatar_icon : selectedUser?.profilePic ||  assets.avatar_icon  } style={{width:'1.75rem' , borderRadius:'100%'}}/>
<p style={{color: '#6b7280',
backgroundcolor: '#6b7280',
bordercolor: '#6b7280'}}>{formatMessageTime (msg.createdAt)}</p>
</div>

  </div>
))}

</div>
{/* <div ref={scrollend}></div> */}

{/* bottom Area */}
<div className='botttomareamaindiv'>

<div className='sendinputwrapper'>
     <input onChange={(e)=>{setInput(e.target.value)}} value={input} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)} type='text' placeholder='send a message' className='sendinputfield'/>
     <input onChange={handleSendImage}  type='file' id='image' accept='image/png,image/jpeg' hidden/>
     <label htmlFor='image'>
      <img src={assets.gallery_icon} style={{width:'1.25rem' ,marginRight:'0.5rem',cursor:'pointer'}}></img>
     </label>
</div>

<img onClick={handleSendMessage} src={assets.send_button} style={{width:'1.75rem' , cursor:'pointer'}}></img>
</div>

    </div>

  ):(

    <div className='noselectmaindiv'>
      
      <img src= {assets.logo_icon} className='Noselectedlogo'/>
      <p className='Noselectedltext'>Chat anywhere , anytime</p>
    </div>
  )
}

export default ChatComponent
