import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/Footer'
import SpinWheel from './components/spinWheel'

import { useNavigate } from 'react-router'
import Feed from './pages/Feed'
function Body() {

  const navigate=useNavigate()

  const token=localStorage.getItem("token")
  if(token===null){
      navigate("/login")
  }
  const goTo=(str)=>{
      navigate(str)
      console.log("clicked")
  }
  return (
    <div>
      <Navbar/>
      <Outlet/>
      {/* <Feed/> */}
      <SpinWheel/>
      <Footer/>
    </div>
  )
}

export default Body
