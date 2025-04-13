import React, {useState, useEffect}from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';


import image4 from "../assets/image4.jpg";




const menswear = () => {
   
  
  


  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then(data => {
        const menProducts = data.filter(item => item.category === "men's clothing");
        setProducts(menProducts)});
    
  }, []);


  return (
    <>
   
    <div className='hero-outer'>
      <div className='hero-section'>
      <div>
      <img src={image4} alt="" />
      </div>
    </div>
    </div>
    <div className='hero-image-outer'>
      <div className='image-heading'>
         <h1>Men's Wear</h1>
      </div>
      <div className='product-row'>
      {products.slice(0,19).map((product) => (
       <div className='image-section' key={product.id}>
          <div className='product-image'key={product.id} >
            <div className='product-title'>
            <h1>{product.title.slice(0,50)}</h1>
            </div>
            <div className='product-api-image'>
            <img src={product.image} alt={product.title}/>
           </div>
           <div className='prdouct-price'>
            <h3>{product.price} $</h3>
           </div>
           <div className='product-discription'>
            <p>{product.description.slice(0,100)}...</p>
           </div>
           <div className='rating'>
            <div className='star'>
            {Array.from({ length: 5 }, (_, i) => {
      const ratingValue = i + 1;
      const rate = product.rating?.rate || 0;

      if (ratingValue <= Math.floor(rate)) {
        return <FaStar key={i} color="#ffc107" />;
      } else if (ratingValue - 0.5 <= rate) {
        return <FaStarHalfAlt key={i} color="#ffc107" />;
      } else {
        return <FaRegStar key={i} color="#e4e5e9" />;
      }
    })}
            </div>
            <div className='count'>
              <p>({product.rating.count})</p>
            </div>
           </div>
           <Link to ={`/product/${product.id}`}><button className='load-more'>Read More</button></Link>
            </div>
         </div>
       
        ))}

        </div>


       
    

      
      
     
</div>


        
  
    </>
    
  )
}

export default menswear


