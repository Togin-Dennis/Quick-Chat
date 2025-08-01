import React, { useContext } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from 'react-hot-toast'
import { AuthContect } from './Context/AuthContext'
function App() {

const {authUser} = useContext(AuthContect)

  return (
    <div className="AppMainDiv">
      <Toaster/>
<Routes>

<Route   path='/' element={authUser ? <HomePage/>:<Navigate to={'/login'} />}/>
<Route   path='/login' element={!authUser ? <LoginPage/> :<Navigate to={'/'} />}/>
<Route   path='/profile' element={authUser ? <ProfilePage /> :<Navigate to={'/login'} />}/>


</Routes>



    </div>
  )
}

export default App
