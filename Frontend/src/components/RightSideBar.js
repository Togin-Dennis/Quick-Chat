import React, { useContext, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import './RightSideBar.css'
import { ChatContext } from '../Context/ChatContext'
import { AuthContect } from '../Context/AuthContext'


function RightSideBar() {


const {selectedUser,messages} = useContext(ChatContext)
const {logout,onlineUsers} = useContext(AuthContect)

const [msgImages,setMsgImages] =useState([])

useState(
  
()=>
{
  setMsgImages(
    messages.filter(msg=>msg.image.map((msg)=>msg.image))
  )


},[messages]
)

  return selectedUser && (
    <div className={ `RightMaindiv ${selectedUser ? 'hide-on-mobile':''}`}>
      <div className='profilediv'>
        <img src={selectedUser?.profilepic || assets.avatar_icon}
        className='rightprofilepic'
        />
        <h1 className='rightfullname'>
        {onlineUsers.includes(selectedUser._id)&&    <p className='rightonlinestatus'></p> }
          {selectedUser.fullname}

          
        </h1>

        
        <p className='rightbio'>{selectedUser.bio}</p>
      </div>

<hr className='horiline'/>

<div className='mediadiv'>

<p>Media</p>

<div className='Medialayoutdiv'>
{msgImages.map(
  (url,index)=>(
    <div key={index} onClick={()=>{window.open(url)}} className='mediashowdiv'>
<img src={url} className='mediaImg'/>
    </div>
  )
)}
</div>


</div>



<button onClick={logout} className='Logoutbutton'>
  LOGOUT
</button>


    </div>
  )
}

export default RightSideBar
