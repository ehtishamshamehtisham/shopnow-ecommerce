import React from 'react';
import { Link } from 'react-router-dom';
import './Navbars.css';



const Navbars = () => {

  
  return (
    <nav className= "navbars">
      <div className="navs-links"> {/*{`nav-links ${showMenu ? "menu-mobile" : ""}`} */}
       <Link to="/menswear">Men's Clothing</Link>
       <Link to="/jewelery">Jewelery</Link>
       <Link to="/electronic">Electronics</Link>
       <Link to="/womenswear">Women's Clothing</Link>
      </div>
    </nav>
  );
};

export default Navbars;

