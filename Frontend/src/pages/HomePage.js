import React, { useContext, useState } from 'react'
import './HomePage.css'
import Sidebar from '../components/Sidebar'
import ChatComponent from '../components/ChatComponent'
import RightSideBar from '../components/RightSideBar'
import { ChatContext } from '../Context/ChatContext'
function HomePage() {

  
const {selectedUser} = useContext(ChatContext)


  return (
    <div className='HomeMainDiv'>
<div className={!selectedUser ?'HomepageComponentdiv':'HomepageComponentdiv HomePageNotSelected'}>
    <Sidebar />
    <ChatComponent/>
    <RightSideBar  />
</div>
    </div>
  )
}

export default HomePage
