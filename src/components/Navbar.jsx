
import React from 'react'
import { useNavigate } from 'react-router'
import axios from "axios"
import {API} from "../utils/constants"

function Navbar() {
    const navigate=useNavigate()

    const goTo=(str)=>{
        navigate(str)
        console.log("clicked")
    }

    const handleLogout=()=>{    
        localStorage.removeItem("token")
        console.log("logged out")
        navigate("/login")
    }
    const IsUserLoggedIn=localStorage.getItem("token")
    return (
        <>
            <div className="navbar bg-base-200 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl" onClick={()=>goTo("/")} >Dev Tinder</a>
                </div>
                <div className="flex gap-2 mx-5">

                    {
                        IsUserLoggedIn?
                        <button class="btn btn-dash btn-accent mx-5" onClick={()=>handleLogout()}>Logout</button>:
                        <button class="btn btn-dash btn-accent mx-5" onClick={()=>goTo("/login")}>Login</button>

                    }
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <span className="justify-between" onClick={()=>goTo("/profile")}>   
                                    Profile
                                    <span className="badge">New</span>
                                </span>
                            </li>
                            <li><a>Settings</a></li>

                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
