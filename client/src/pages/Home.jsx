import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import './Home.css';

const Home = () => {
  const [isWishlist, setIsWishlist] = useState({});
  const [activeCategory, setActiveCategory] = useState(0);
  
  // Состояния для данных из БД
  const [popularProducts, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных с сервера
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Параллельная загрузка всех данных
        const [productsRes, categoriesRes, testimonialsRes, blogRes] = await Promise.all([
          fetch('http://localhost:5000/api/popular-products'),
          fetch('http://localhost:5000/api/categories'),
          fetch('http://localhost:5000/api/testimonials'),
          fetch('http://localhost:5000/api/blog')
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        const testimonialsData = await testimonialsRes.json();
        const blogData = await blogRes.json();

        // Оставляем только первые 4 категории для главной страницы
        const mainCategories = categoriesData.slice(0, 4);
        
        // Добавляем счетчики букетов для отобранных категорий
        const categoriesWithCount = await Promise.all(
          mainCategories.map(async (category) => {
            const countRes = await fetch(`http://localhost:5000/api/products?category=${category.slug}`);
            const products = await countRes.json();
            return {
              ...category,
              count: `${products.length} букетов`
            };
          })
        );

        setPopularProducts(productsData);
        setCategories(categoriesWithCount);
        setTestimonials(testimonialsData);
        
        // Ограничиваем количество статей до 3
        setBlogPosts(blogData.slice(0, 3));
        
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleWishlist = (productId) => {
    setIsWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Форматирование цены
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
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
      <HeroSection />

      {/* Популярные букеты */}
      <section className="popular">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Наши хиты</span>
            <h2 className="section-title">Популярные букеты</h2>
          </div>
          
          <div className="product-grid">
            {popularProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={{
                  id: product.id,
                  image: product.main_image || "https://via.placeholder.com/300",
                  badge: product.is_hit ? "Хит сезона" : product.is_new ? "Новинка" : null,
                  badgeType: product.is_hit ? "hit" : product.is_new ? "new" : null,
                  name: product.name,
                  description: product.description,
                  rating: product.rating,
                  reviews: product.reviews_count,
                  currentPrice: formatPrice(product.price),
                  oldPrice: product.old_price ? formatPrice(product.old_price) : null
                }}
                isWishlist={isWishlist[product.id]}
                onToggleWishlist={() => toggleWishlist(product.id)}
              />
            ))}
          </div>
          
          <div className="section-footer">
            <Link to="/catalog" className="section-link">
              <span>Посмотреть все букеты</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Категории с акцентом — только 4 категории */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Для любого повода</span>
            <h2 className="section-title">Категории букетов</h2>
          </div>
          
          {categories.length > 0 && (
            <div className="category-showcase">
              <div className="category-tabs">
                {categories.map((cat, index) => (
                  <button
                    key={cat.id}
                    className={`category-tab ${activeCategory === index ? 'active' : ''}`}
                    onMouseEnter={() => setActiveCategory(index)}
                  >
                    <span className="tab-name">{cat.name}</span>
                    <span className="tab-accent">{cat.accent || cat.description}</span>
                  </button>
                ))}
              </div>
              
              <div className="category-preview">
                {categories.map((cat, index) => (
                  <Link 
                    to={`/category/${cat.slug}`} 
                    key={cat.id}
                    className={`category-preview-card ${activeCategory === index ? 'active' : ''}`}
                  >
                    <div className="preview-image">
                      <img src={cat.image} alt={cat.name} />
                      <div className="preview-overlay"></div>
                    </div>
                    <div className="preview-content">
                      <h3 className="preview-title">{cat.name}</h3>
                      <p className="preview-accent">{cat.accent || cat.description}</p>
                      <span className="preview-count">{cat.count}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Преимущества (как было) */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Почему выбирают нас</span>
            <h2 className="section-title">Наши преимущества</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="10" r="3"/>
                  <path d="M19 10c0 7-7 11-7 11s-7-4-7-11 3.13-9 7-9 7 4 7 9z"/>
                </svg>
              </div>
              <h3 className="feature-title">Свежие цветы</h3>
              <p className="feature-description">Только свежие цветы от проверенных поставщиков. Гарантия свежести 7 дней.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3 className="feature-title">Быстрая доставка</h3>
              <p className="feature-description">Доставка в день заказа. Курьер позвонит за 30 минут до приезда.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 12.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7.5"/>
                  <polyline points="16 2 22 8 16 8"/>
                  <line x1="10" y1="14" x2="21" y2="14"/>
                  <line x1="10" y1="18" x2="18" y2="18"/>
                </svg>
              </div>
              <h3 className="feature-title">Авторская упаковка</h3>
              <p className="feature-description">Красивая упаковка и открытка в подарок. Возможность добавить мягкую игрушку или конфеты.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 className="feature-title">Безопасная оплата</h3>
              <p className="feature-description">Оплата онлайн или наличными при получении. Все платежи защищены.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Отзывы с акцентом */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">О нас говорят</span>
            <h2 className="section-title">Отзывы клиентов</h2>
          </div>
          
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Блог с ограничением 3 карточки */}
      <section className="blog-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Полезное</span>
            <h2 className="section-title">Блог о цветах</h2>
          </div>
          
          <div className="blog-grid">
            {blogPosts.slice(0, 3).map(post => (
              <BlogCard key={post.id} post={{
                id: post.id,
                image: post.image || "https://via.placeholder.com/300",
                category: post.category,
                date: formatDate(post.published_at),
                title: post.title,
                description: post.excerpt || post.description
              }} />
            ))}
          </div>
          
          <div className="section-footer">
            <Link to="/blog" className="section-link">
              <span>Все статьи</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

// Компонент карточки товара (исправленный)
const ProductCard = ({ product, isWishlist, onToggleWishlist }) => {
  return (
    <article className="product-card">
      <div className="product-img">
        <img src={product.image} alt={product.name} />
        {product.badge && (
          <span className={`product-badge ${product.badgeType}`}>
            {product.badge}
          </span>
        )}
        <button 
          className={`wishlist-btn ${isWishlist ? 'active' : ''}`}
          onClick={onToggleWishlist}
          aria-label="Добавить в избранное"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
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
          <span className="rating-count">({product.reviews})</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">{product.currentPrice} ₽</span>
          {product.oldPrice && (
            <span className="old-price">{product.oldPrice} ₽</span>
          )}
        </div>
      </div>
    </article>
  );
};

// Компонент слайдера отзывов
const TestimonialSlider = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) {
    return <div className="no-data">Нет отзывов</div>;
  }

  return (
    <div className="testimonial-showcase">
      <div className="testimonial-quote-mark">"</div>
      
      <div className="testimonial-main">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id}
            className={`testimonial-showcase-card ${index === current ? 'active' : ''}`}
          >
            <div className="testimonial-showcase-rating">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill={i < Math.floor(testimonial.rating) ? "#FFB800" : i < testimonial.rating ? "#FFB800" : "none"} 
                  stroke="#FFB800" 
                  strokeWidth="1.5"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p className="testimonial-showcase-text">"{testimonial.text}"</p>
            <div className="testimonial-showcase-author">
              <div className="author-avatar">
                <img src={testimonial.photo} alt={testimonial.name} />
              </div>
              <div className="author-info">
                <h4 className="author-name">{testimonial.name}</h4>
                <span className="author-meta">{testimonial.city} · {testimonial.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="testimonial-showcase-controls">
        <button className="testimonial-control prev" onClick={prev}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="testimonial-showcase-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
        <button className="testimonial-control next" onClick={next}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Компонент карточки блога
const BlogCard = ({ post }) => {
  return (
    <article className="blog-card">
      <div className="blog-image-wrapper">
        <img src={post.image} alt={post.title} className="blog-image" />
        <span className="blog-category">{post.category}</span>
        <span className="blog-date-badge">{post.date}</span>
      </div>
      <div className="blog-content">
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-description">{post.description}</p>
        <div className="blog-footer">
          <Link to={`/blog/${post.id}`} className="blog-link">
            <span>Читать</span>
            <span className="link-arrow">→</span>
          </Link>
          <span className="blog-share">Поделиться</span>
        </div>
      </div>
    </article>
  );
};

export default Home;