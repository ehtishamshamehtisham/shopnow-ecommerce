import React, { useState } from 'react';
import './Navbar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navbar = ({ onLogout }) => {
  const { cartItems } = useCart();
  const [showMenu, setShowMenu] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleButtonToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Shop<span className="highlight">Now.</span></div>
      <input className="nav-search" type="text" placeholder="Search..." />

      <div className={showMenu ? "menu-mobile" : "nav-links"}>
        <Link to="/home" onClick={() => setShowMenu(false)}>Home</Link>

        <div style={{ position: 'relative', display: 'inline-block' }}>
         
          <Link to="/cart" onClick={() => setShowMenu(false)}>
            <FaShoppingCart size={28} color="white" />
            {totalQuantity > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px'
              }}>
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>

        
        <button className="logout-btn" onClick={() => { onLogout(); setShowMenu(false); }}>Log out</button>
      </div>

      <div className='menu-icon' onClick={handleButtonToggle}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
