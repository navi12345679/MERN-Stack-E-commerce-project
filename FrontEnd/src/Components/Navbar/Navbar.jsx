import { useContext, useRef, useState }  from 'react';
import './Navbar.css';
import logo from "../assets/logo.png";
import cart_icon from "../assets/Cartimg.png";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext.jsx';
import dropdown from "../assets/dropdown.png";

const Navbar = () =>{
    const [menu,setMenu] = useState("shop");
    const {getTotalCartitems} = useContext(ShopContext);
     const menuRef = useRef();
 
     const dropdown_toggle = (e) =>{
            menuRef.current.classList.toggle('nav_menu_visible');
            e.target.classList.toggle('open');
     }


    return(
<div className='navbar'>
<div className='nav-logo'>
    <img src={logo} alt='' /> 
    <p>SHOPPER</p>
    </div>
    <img className='navbar_dropdown' onClick={dropdown_toggle} src={dropdown} alt=""/>
    <ul  ref={menuRef} className='nav-menu'>
        <li onClick={() => {setMenu("shop")}}><Link style={ { textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("mens")}}><Link style={ { textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("womens")}}><Link  style={ { textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("kids")}}><Link style={ { textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>   
    </ul>
    <div className='login-cart'>
        {localStorage.getItem('auth-token') ? <button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button> :
    <Link to='/login'><button>Login</button></Link> }
    <Link to='/cart'><img src={cart_icon} alt=''/></Link> 
    <div className="nav-cart-count">{getTotalCartitems()}</div>
    </div>
</div>
    );
}
export default Navbar 