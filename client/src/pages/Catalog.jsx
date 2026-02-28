import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

const Catalog = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { id: 'all', name: 'Все букеты' },
    { id: 'wedding', name: 'Свадебные' },
    { id: 'birthday', name: 'На день рождения' },
    { id: 'romantic', name: 'Романтические' },
    { id: 'business', name: 'Деловые' },
    { id: 'autumn', name: 'Осенние' },
    { id: 'mono', name: 'Монобукеты' },
    { id: 'mixed', name: 'Сборные' },
    { id: 'luxury', name: 'Премиум' },
    { id: 'new', name: 'Новинки' },
    { id: 'popular', name: 'Хиты продаж' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Популярные' },
    { id: 'price-asc', name: 'По возрастанию цены' },
    { id: 'price-desc', name: 'По убыванию цены' },
    { id: 'rating', name: 'По рейтингу' }
  ];

  // Загрузка данных с сервера
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Загружаем категории
        const categoriesRes = await fetch('http://localhost:5000/api/categories');
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        // Загружаем все продукты
        const productsRes = await fetch('http://localhost:5000/api/products');
        const productsData = await productsRes.json();
        setProducts(productsData);
        
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Не удалось загрузить букеты');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Фильтрация и сортировка продуктов
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Фильтрация по категории
    if (activeFilter !== 'all') {
      if (activeFilter === 'new') {
        filtered = filtered.filter(p => p.is_new === 1);
      } else if (activeFilter === 'popular') {
        filtered = filtered.filter(p => p.is_hit === 1);
      } else {
        const category = categories.find(c => c.slug === activeFilter);
        if (category) {
          filtered = filtered.filter(p => p.category_id === category.id);
        }
      }
    }

    // Сортировка
    switch(sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => (b.is_hit || b.is_new) - (a.is_hit || a.is_new));
    }

    return filtered;
  };

  // Форматирование цены
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка букетов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Повторить</button>
      </div>
    );
  }

  return (
    <>
      {/* Hero секция каталога */}
      <section className="catalog-hero">
        <div className="container">
          <div className="catalog-hero-content">
            <span className="hero-label">Наша коллекция</span>
            <h1 className="hero-title">Каталог букетов</h1>
            <p className="hero-description">
              Свежие цветы, собранные с любовью профессиональными флористами
            </p>
          </div>
        </div>
        <div className="hero-decoration">
          <span className="decoration-circle"></span>
          <span className="decoration-line"></span>
        </div>
      </section>

      {/* Хлебные крошки */}
      <section className="catalog-breadcrumbs">
        <div className="container">
          <ul className="catalog-breadcrumbs-list">
            <li className="catalog-breadcrumbs-item">
              <Link to="/" className="catalog-breadcrumbs-link">Главная</Link>
            </li>
            <li className="catalog-breadcrumbs-item catalog-breadcrumbs-current">Каталог</li>
          </ul>
        </div>
      </section>

      {/* Фильтры */}
      <section className="catalog-filters">
        <div className="container">
          <div className="filters-header">
            <h2 className="filters-title">Категории</h2>
            <div className="filters-sort">
              <span className="sort-label">Сортировать:</span>
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-tabs">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
                {filter.id !== 'all' && filter.id !== 'new' && filter.id !== 'popular' && (
                  <span className="filter-count">
                    {products.filter(p => {
                      const category = categories.find(c => c.slug === filter.id);
                      return category && p.category_id === category.id;
                    }).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Товары */}
      <section className="catalog-products">
        <div className="container">
          <div className="products-header">
            <span className="products-count">Найдено {filteredProducts.length} букетов</span>
          </div>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={{
                id: product.id,
                image: product.main_image || "https://via.placeholder.com/300",
                badge: product.is_hit ? "Хит продаж" : product.is_new ? "Новинка" : null,
                badgeType: product.is_hit ? "hit" : product.is_new ? "new" : null,
                name: product.name,
                description: product.description,
                rating: product.rating,
                reviews: product.reviews_count,
                currentPrice: formatPrice(product.price),
                oldPrice: product.old_price ? formatPrice(product.old_price) : null,
                category: categories.find(c => c.id === product.category_id)?.slug || ''
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="catalog-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Не нашли подходящий букет?</h2>
            <p className="cta-text">Мы соберем индивидуальный букет по вашим пожеланиям</p>
            <Link to="/contacts" className="cta-link">
              <span>Заказать консультацию</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Catalog;