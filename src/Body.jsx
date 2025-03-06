import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/Footer'
import SpinWheel from './components/spinWheel'

import { useNavigate } from 'react-router'
function Body() {

  const navigate=useNavigate()

  const goTo=(str)=>{
      navigate(str)
      console.log("clicked")
  }
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <button class="btn btn-dash btn-accent mx-5" onClick={()=>goTo("/profile")}>Profile</button>:

      <SpinWheel/>
      <Footer/>
    </div>
  )
}

export default Body
