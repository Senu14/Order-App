import React, { useRef } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs'
import "./Header.css";
import { Link } from 'react-router-dom';


function Header() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

  return (
    <header>
      <button className='nav-btn' onClick={showNavbar}>
        <FaBars />
      </button>
      <nav ref={navRef}>
        <a href="/AddMenuPage">Add menu item</a>
        <a href="/CreateOrderPage">Create order</a>
        <a href="/ShoppingListPage">Shopping list</a>
        <a href="/MenuPage">Menu</a>
        <a href="/ContactPages">Contact us</a>
        <button className='nav-btn nav-close-btn' onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className='nav-btn-profile'>
       <Link className="custom-link" to="/ProfilePage" >
       <BsPersonCircle />
       </Link>
        
      </button>
    </header>

  )
}

export default Header