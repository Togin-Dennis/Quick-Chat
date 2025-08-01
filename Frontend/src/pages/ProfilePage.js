import React, { useContext, useState } from 'react'
import './ProfilePage.css'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContect } from '../Context/AuthContext'
function ProfilePage() {


  const {authUser,updateProfile} = useContext(AuthContect)

const [selectedImage,setselectedImage]=useState(null)
const navigate =useNavigate()
const [name,setName] =useState(authUser.fullname)
const [bio,setbio]=useState(authUser.bio)


const handlesubmit=async(e)=>
{
  e.preventDefault()
  if(!selectedImage)
  {
    await updateProfile({fullname : name , bio})
     navigate('/')
     return
  }
 const reader =  new FileReader()
 reader.readAsDataURL(selectedImage)
 reader.onload = async ()=>{
  const base64Image = reader.result
  await updateProfile({profilePic: base64Image})
 }
}


  return (
    <div className='ProfilePagemaindiv'>


      <div className='formimgwrapper'>


        <form className='profileform' onSubmit={handlesubmit}>

 <h3 style={{  fontSize: '1.125rem', lineHeight:' 1.75rem'}}> Profile Details</h3>
<label htmlFor='avatar'  className='avatarlabel'>
<input onChange={(e)=>{setselectedImage(e.target.files[0])}} type='file' id='avatar' accept='.png, .jpg, .jpeg' hidden></input>
        
        <img src={selectedImage ? URL.createObjectURL(selectedImage):assets.avatar_icon} className={`Selectedimagepreview ${selectedImage && 'Selectedimagepreviewtrue'}`}/>
Upload Profile Picture
</label>

<input
onChange={(e)=>{setName(e.target.value)}} value={name}

type='text' required placeholder='Your Name' className='YourName'/>
<textarea  onChange={(e)=>{setbio(e.target.value)}} value={bio} placeholder='Write Profile Bio..' required className='YourName' rows={4}></textarea>
<button type='submit' className='submitbutton'>Save</button>
</form>
<img className={`LogoshowProfile ${selectedImage && 'Selectedimagepreviewtrue'}`} src={authUser?.profilepic || assets.logo_icon}/>
      </div>
    </div>
  )
}

export default ProfilePage
