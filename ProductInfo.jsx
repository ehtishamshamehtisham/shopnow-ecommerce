import React, {useState, useEffect}from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./ProductInfo.css"
import { useCart } from "../context/CartContext"


const ProductInfo = () => {


const { addToCart } = useCart();
const { id } = useParams();


const [product, setProduct] = useState([]);
const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} color="#f4c430" />);
    }
  
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#f4c430" />);
    }
  
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} color="#f4c430" />);
    }
  
    return stars;
  };
  
    
useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  return (
<div className="product-info">
      <div className='product-info-image' >
      <img src={product.image} alt={product.title} /></div>
      <div className='product-details'>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price} $</p>
      {product.rating && (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
    <div>{renderStars(product.rating.rate)}</div>
    <span>({product.rating.count})</span>
   </div>
   
  )}
 <button 
  className='add-cart' 
  onClick={() => {
    addToCart(product);
  }}
>
  Add to Cart
</button>
  </div>
  
   
   </div>
  )}


export default ProductInfo
