import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar/navbar';
import Login from './componets/Login';
import Herosection from './componets/Herosection';
import ProductInfo from './componets/ProductInfo';
import Cart from './componets/Cart';
import { CartProvider } from './context/CartContext';
import Navbars from './Navbars/Navbars';
import Menswear from "./Menswear/menswear";
import Jewelery from "./Jewelery/jewelery";
import Electronic from "./Electronics/electronic";
import Womenswear from "./Womenswear/womenswear";
import Pagenotfound from './componets/Pagenotfound';



const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const location = useLocation(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

 
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/"); 
  };

  
  const hideNavOnPaths = ["/", "/pagenotfound"];
  const shouldShowNav = token && !hideNavOnPaths.includes(location.pathname);

  return (
    <CartProvider>
      {shouldShowNav && <Navbar onLogout={handleLogout} />}
      {shouldShowNav && <Navbars />}

      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />

        {token ? (
          <>
            <Route path="/home" element={<Herosection />} />
            <Route path="/menswear" element={<Menswear />} />
            <Route path="/jewelery" element={<Jewelery />} />
            <Route path="/electronic" element={<Electronic />} />
            <Route path="/womenswear" element={<Womenswear />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
            {/* 404 for logged-in */}
            <Route path="*" element={<Pagenotfound />} />
          </>
        ) : (
      
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      
    </CartProvider>
  );
};

export default App;
