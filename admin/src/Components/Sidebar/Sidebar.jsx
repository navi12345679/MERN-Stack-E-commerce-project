import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct from '../assets/addproduct.png'
import productlist from '../assets/productlist.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={"/addproduct"} style={{textDecoration:"none"}}>
      <div className='sidebar-item'>
        <img src={addproduct} alt=''/>
        <p>ADD PRODUCT</p>
      </div>
      </Link>
      <Link to={"/listproduct"} style={{textDecoration:"none"}}>
      <div className='sidebar-item'>
        <img src={productlist} alt=''/>
        <p>PRODUCT LIST</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
