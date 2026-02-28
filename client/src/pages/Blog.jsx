import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/blog');
        
        if (!res.ok) {
          throw new Error('Не удалось загрузить статьи');
        }
        
        const data = await res.json();
        setPosts(data);
        setFilteredPosts(data);
        
        // Получаем уникальные категории
        const uniqueCategories = [...new Set(data.map(post => post.category))];
        setCategories(uniqueCategories);
        
      } catch (err) {
        console.error('Ошибка загрузки статей:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Фильтрация по категории
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === activeCategory));
    }
  }, [activeCategory, posts]);

  // Форматирование даты
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="blog-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-error">
        <h2>Упс!</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Повторить</button>
      </div>
    );
  }

  return (
    <>
      {/* Hero секция */}
      <section className="blog-hero">
        <div className="blog-container">
          <div className="blog-heroContent">
            <span className="blog-heroLabel">Блог</span>
            <h1 className="blog-heroTitle">
              Полезные статьи о цветах
            </h1>
            <p className="blog-heroDescription">
              Советы флористов, тренды, мастер-классы и вдохновение
            </p>
          </div>
        </div>
        <div className="blog-heroDecoration">
          <span className="blog-decorationCircle"></span>
          <span className="blog-decorationLine"></span>
        </div>
      </section>

      {/* Фильтры по категориям */}
      <section className="blog-filters">
        <div className="blog-container">
          <div className="blog-filtersHeader">
            <h2 className="blog-filtersTitle">Категории</h2>
          </div>
          <div className="blog-filtersTabs">
            <button
              className={`blog-filterTab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Все статьи
              <span className="blog-filterCount">{posts.length}</span>
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`blog-filterTab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <span className="blog-filterCount">
                  {posts.filter(post => post.category === category).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Сетка статей */}
      <section className="blog-posts">
        <div className="blog-container">
          <div className="blog-postsHeader">
            <h2 className="blog-postsTitle">
              {activeCategory === 'all' 
                ? 'Все статьи' 
                : activeCategory}
            </h2>
            <p className="blog-postsCount">
              Найдено {filteredPosts.length} статей
            </p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="blog-postsGrid">
              {filteredPosts.map(post => (
                <article key={post.id} className="blog-postCard">
                  <Link to={`/blog/${post.id}`} className="blog-postLink">
                    <div className="blog-postImageWrapper">
                      <img src={post.image} alt={post.title} className="blog-postImage" />
                      <span className="blog-postCategory">{post.category}</span>
                    </div>
                    <div className="blog-postContent">
                      <h3 className="blog-postTitle">{post.title}</h3>
                      <p className="blog-postExcerpt">{post.excerpt}</p>
                      <div className="blog-postMeta">
                        <span className="blog-postDate">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          {formatDate(post.published_at)}
                        </span>
                        <span className="blog-postViews">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="2"/>
                            <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z"/>
                          </svg>
                          {post.views_count || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <p>В этой категории пока нет статей</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;