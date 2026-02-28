import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isWishlist, setIsWishlist] = useState(false);

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <div className="product-card">
      <div className="product-img">
        <img src={product.image} alt={product.name} />
        {product.badge && (
          <span className={`product-badge ${product.badgeType}`}>
            {product.badge}
          </span>
        )}
        <button 
          className={`wishlist-btn ${isWishlist ? 'active' : ''}`}
          onClick={toggleWishlist}
          aria-label="Добавить в избранное"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill={i < Math.floor(product.rating) ? "#FFB800" : i < product.rating ? "#FFB800" : "none"} 
              stroke="#FFB800" 
              strokeWidth="1.5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          ))}
          <span>({product.reviews})</span>
        </div>
        <div className="product-price">
          <span className="current-price">{product.currentPrice} ₽</span>
          {product.oldPrice && (
            <span className="old-price">{product.oldPrice} ₽</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;