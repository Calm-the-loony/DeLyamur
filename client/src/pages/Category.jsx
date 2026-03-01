import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Category.css';

const Category = () => {
  const { cat } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        
        // Получаем информацию о категории
        const categoryRes = await fetch(`http://localhost:5000/api/categories/${cat}`);
        const categoryData = await categoryRes.json();
        
        if (!categoryData) {
          throw new Error('Категория не найдена');
        }
        
        setCategory(categoryData);
        
        // Получаем товары этой категории
        const productsRes = await fetch(`http://localhost:5000/api/products?category=${cat}`);
        const productsData = await productsRes.json();
        
        setProducts(productsData);
        
      } catch (err) {
        console.error('Ошибка загрузки категории:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (cat) {
      fetchCategoryData();
    }
  }, [cat]);

  // Форматирование цены
  const formatPrice = (price) => {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  if (loading) {
    return (
      <div className="category-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка букетов...</p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="category-error">
        <h2>Категория не найдена</h2>
        <p>{error || 'Запрашиваемая категория отсутствует'}</p>
        <Link to="/catalog" className="category-back-link">
          <span>←</span> Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="category-header">
        <div className="container">
          <div className="category-header-content">
            <h1 className="category-title">{category.name}</h1>
            <p className="category-description">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Товары категории */}
      <section className="category-products">
        <div className="container">
          {products.length > 0 ? (
            <>
              <div className="category-stats">
                <span className="products-count">Найдено {products.length} букетов</span>
              </div>
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard key={product.id} product={{
                    id: product.id,
                    image: product.main_image || "https://via.placeholder.com/300",
                    badge: product.is_hit ? "Хит продаж" : product.is_new ? "Новинка" : null,
                    badgeType: product.is_hit ? "hit" : product.is_new ? "new" : null,
                    name: product.name,
                    description: product.description,
                    rating: product.rating || 0,
                    reviews: product.reviews_count || 0,
                    currentPrice: formatPrice(product.price),
                    oldPrice: product.old_price ? formatPrice(product.old_price) : null,
                    category: category.slug
                  }} />
                ))}
              </div>
            </>
          ) : (
            <div className="category-empty">
              <div className="empty-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#e83e8c" strokeWidth="1">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <p className="empty-text">В этой категории пока нет букетов</p>
              <Link to="/catalog" className="category-link">
                <span>Вернуться в каталог</span>
                <span className="link-arrow">→</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Category;