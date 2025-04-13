import React from 'react';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import {useState, useEffect}from 'react'

import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  ).toFixed(2);


  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
  };
 
  


  return (
    <div className='hero-image-outer'>
      <div className='cart-row'>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((item) => (
            <div className='cart-image' key={item.id}>
              <div className='cart-info'>
                <div className='cart-api-image'>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className='cart-right'>
                  <div className='cart-discription'>
                    <p>{item.description.slice(0, 350)}</p>
                  </div>
                  <div className='cart-price'>
                    <h3>{item.price} $</h3>
                  </div>

                  <div className='rating'>
                    <div className='star'>
                      {Array.from({ length: 5 }, (_, i) => {
                        const ratingValue = i + 1;
                        const rate = item.rating?.rate || 0;

                        if (ratingValue <= Math.floor(rate)) {
                          return <FaStar key={i} color="#ffc107" />;
                        } else if (ratingValue - 0.5 <= rate) {
                          return <FaStarHalfAlt key={i} color="#ffc107" />;
                        } else {
                          return <FaRegStar key={i} color="#e4e5e9" />;
                        }
                      })}
                    </div>price
                    <div className='count'>
                      <p>({item.rating?.count})</p>
                    </div>
                  </div>
                  <div className="quantity-controls">
        <button onClick={() => decreaseQuantity(item.id)}><FiMinus /></button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)}><FiPlus /></button>
      </div>
      <div className='cart-last'>
      <div className='cart-amount'>
      <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
                 <div className='cart-button'>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <FiTrash2 />
                  </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
  <div className="cart-summary">
    <h2>Total Amount: ${totalAmount}</h2>
    <button className="checkout-btn" onClick={handleCheckout}>
      Checkout
    </button>
  </div>
)}

    {/* Popup */}
    {showPopup && (
      <div className="popup">
        Order placed successfully!
      </div>
    )}
    </div>
  );
};

export default Cart;
