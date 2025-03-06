import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import Body from './Body'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path='/profile' element={<Profile/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
