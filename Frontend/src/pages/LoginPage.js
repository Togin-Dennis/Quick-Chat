import React, { useContext, useState } from 'react'
import './LoginPage.css'
import assets from '../assets/assets'
import { AuthContect } from '../Context/AuthContext'
function LoginPage() {
const [currState,setCurrState]=useState("Signup")
const [fullname,setfullname]=useState("")
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const [bio,setbio]=useState("")
const [isdatasubmited,setisdatasubmited]=useState(false)




const {login} = useContext(AuthContect)



const onSububmitHundler = (e)=>
{
  e.preventDefault()
  if(currState === 'Signup' && !isdatasubmited)
  {
    setisdatasubmited(true)
    return;
  }

  login(currState ==='Signup' ? 'signup': 'login',{fullname,email,password,bio})
}



  return (
    <div className='Loginmaindiv'>
   




<img src={assets.logo_big}/>



<form className='Loginform' onSubmit={onSububmitHundler}>

<h2 className='logintitle'>{currState}
  {isdatasubmited && <img onClick={()=>{setisdatasubmited(false)}} src={assets.arrow_icon} style={{width:'1.25rem',cursor:'pointer'}}/> }
</h2>





{currState === 'Signup' && !isdatasubmited && (<input  onChange={(e)=>{setfullname(e.target.value)}}value={fullname} type='text' className='logininputbox' placeholder='Full Name' required></input>) }

{
  !isdatasubmited && (
  <>
  
  <input onChange={(e)=>{setemail(e.target.value)}}value={email} type='email' className='logininputbox loginemailinput' placeholder='Email' required></input>
  <input onChange={(e)=>{setpassword(e.target.value)}}value={password} type='password' className='logininputbox loginemailinput' placeholder='Password' required></input>
  </>)
}


{
  currState === 'Signup' && isdatasubmited && (<textarea
  onChange={(e)=>{setbio(e.target.value)}}value={bio}
  rows={4} className='logininputbox loginemailinput'
  placeholder='Provide a short bio...' required
  >
    
  </textarea>)
}



<button type='submit' className='submitbutton'>
  {currState==='Signup' ? 'Create Account' : 'Login now'}
</button>

<div className='Termsdiv'>
  <input type='checkbox' />
<p>Agree to terms of use & privacy policy</p>

</div>


<div style={{display:'flex' , flexDirection:'column', gap:'0.5rem'}}>


{
  currState ==='Signup' ? (
    <p onClick={()=>{setCurrState("Login");setisdatasubmited(false)}}
     className='options'>Already have an account..? <span className='optionsspan'>Login</span> </p>
  ) : (
    <p onClick={()=>{setCurrState("Signup")}}
     className='options'>Create an account <span className='optionsspan'>Click here</span></p>
  )
}


</div>



</form>


    </div>
  )
}

export default LoginPage
