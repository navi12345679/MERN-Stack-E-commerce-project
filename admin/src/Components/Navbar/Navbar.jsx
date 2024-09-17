import React from 'react'
import './Navbar.css'
import logo from '../assets/Adminpanel.png'
import profile from '../assets/profile.png'
const Navbar = () => {
  return (
    <div className='navbar'>
         <img src={logo} className="nav-logo" alt=''/>
         <img src={profile} className="nav-profile" alt=''/>
    </div>
  )
}

export default Navbar


