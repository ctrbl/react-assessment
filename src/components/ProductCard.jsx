import React from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';

const ProductCard = ({ image, name, price, description }) => {
  if (!image || !name || !price) {
    return <div>Error: Required props not provided</div>;
  }

  // If anything wrong with description, use empty string as default
  if (!description || typeof description !== 'string') {
    description = ""; 
  }

  // Cast type for price 
  if (typeof price !== 'number') {
    price = parseFloat(price); 
  }

  if (typeof name !== 'string' || typeof image !== 'string') {
    return <div>Error: Incorrect data types for props</div>;
  }

  const handleBuyNow = () => {
    console.log(`Product: ${name}, Price: ${price}`);
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150"; // Default placeholder image
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={image} alt={name} className="product-image" onError={handleImageError} />
      </div>
      <h2 className="product-name">{name}</h2>
      <p className="product-price">${price.toFixed(2)}</p>
      <p className="product-description">{description}</p>
      <button className="buy-now-button" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductCard;