import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Пробуем загрузить по id (число)
        const postRes = await fetch(`http://localhost:5000/api/blog/${id}`);
        
        if (!postRes.ok) {
          throw new Error('Пост не найден');
        }
        
        const postData = await postRes.json();
        setPost(postData);

        // Загружаем похожие посты (из той же категории)
        if (postData.category) {
          const relatedRes = await fetch(`http://localhost:5000/api/blog?category=${encodeURIComponent(postData.category)}`);
          const relatedData = await relatedRes.json();
          
          // Исключаем текущий пост и берем первые 2
          const filtered = relatedData
            .filter(p => p.id !== parseInt(id))
            .slice(0, 2);
          
          setRelatedPosts(filtered);
        }

      } catch (err) {
        console.error('Ошибка загрузки поста:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Расчет времени чтения
  const getReadingTime = (content) => {
    if (!content) return '1 мин чтения';
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} мин чтения`;
  };

  if (loading) {
    return (
      <div className="blogPost-loading">
        <div className="blogPost-spinner"></div>
        <p>Загружаем статью...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blogPost-error">
        <h2>Упс!</h2>
        <p>{error || 'Статья не найдена'}</p>
        <Link to="/blog" className="blogPost-backLink">
          <span>←</span> Вернуться к блогу
        </Link>
      </div>
    );
  }

  // Разбиваем контент на абзацы
  const paragraphs = post.content ? post.content.split('\n').filter(p => p.trim()) : [];

  return (
    <>
      {/* Hero секция поста */}
      <section className="blogPost-hero">
        <div className="blogPost-heroImage" style={{ backgroundImage: `url(${post.image || 'https://via.placeholder.com/1200x400'})` }}>
          <div className="blogPost-heroOverlay"></div>
          <div className="blogPost-container">
            <div className="blogPost-heroContent">
              <div className="blogPost-meta">
                <span className="blogPost-category">{post.category || 'Статья'}</span>
                <span className="blogPost-date">{formatDate(post.published_at)}</span>
                <span className="blogPost-reading">{getReadingTime(post.content)}</span>
              </div>
              <h1 className="blogPost-title">{post.title}</h1>
              <div className="blogPost-stats">
                <span className="blogPost-views">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="2"/>
                    <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z"/>
                  </svg>
                  {post.views_count || 0} просмотров
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Хлебные крошки */}
      <section className="blogPost-breadcrumbs">
        <div className="blogPost-container">
          <ul className="blogPost-breadcrumbsList">
            <li className="blogPost-breadcrumbsItem">
              <Link to="/" className="blogPost-breadcrumbsLink">Главная</Link>
            </li>
            <li className="blogPost-breadcrumbsItem">
              <Link to="/blog" className="blogPost-breadcrumbsLink">Блог</Link>
            </li>
            <li className="blogPost-breadcrumbsItem blogPost-breadcrumbsCurrent">
              {post.title}
            </li>
          </ul>
        </div>
      </section>

      {/* Содержание поста */}
      <section className="blogPost-content">
        <div className="blogPost-container">
          <div className="blogPost-layout">
            <article className="blogPost-article">
              <div className="blogPost-body">
                {paragraphs.length > 0 ? (
                  paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{post.content || 'Содержание статьи отсутствует'}</p>
                )}
              </div>
              
              <div className="blogPost-tags">
                <span className="blogPost-tagsTitle">Теги:</span>
                <span className="blogPost-tag">{post.category || 'цветы'}</span>
                <span className="blogPost-tag">флористика</span>
                <span className="blogPost-tag">букеты</span>
              </div>

              <div className="blogPost-share">
                <span className="blogPost-shareTitle">Поделиться:</span>
                <div className="blogPost-shareButtons">
                  <a href="#" className="blogPost-shareButton">VK</a>
                  <a href="#" className="blogPost-shareButton">TG</a>
                  <a href="#" className="blogPost-shareButton">WA</a>
                </div>
              </div>
            </article>

            {/* Сайдбар */}
            <aside className="blogPost-sidebar">
              {/* Информация об авторе */}
              <div className="blogPost-author">
                <h3 className="blogPost-authorTitle">Об авторе</h3>
                <div className="blogPost-authorInfo">
                  <div className="blogPost-authorAvatar">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Автор" />
                  </div>
                  <div>
                    <h4 className="blogPost-authorName">Анна Иванова</h4>
                    <p className="blogPost-authorRole">Главный флорист</p>
                  </div>
                </div>
                <p className="blogPost-authorBio">
                  Анна — главный флорист нашей мастерской с 10-летним опытом. 
                  Она делится секретами ухода за цветами и трендами флористики.
                </p>
              </div>

              {/* Похожие статьи */}
              {relatedPosts.length > 0 && (
                <div className="blogPost-related">
                  <h3 className="blogPost-relatedTitle">Похожие статьи</h3>
                  <div className="blogPost-relatedList">
                    {relatedPosts.map(related => (
                      <Link 
                        key={related.id} 
                        to={`/blog/${related.id}`}
                        className="blogPost-relatedItem"
                      >
                        <div className="blogPost-relatedImage">
                          <img src={related.image || 'https://via.placeholder.com/80'} alt={related.title} />
                        </div>
                        <div className="blogPost-relatedContent">
                          <h4 className="blogPost-relatedName">{related.title}</h4>
                          <span className="blogPost-relatedDate">
                            {formatDate(related.published_at)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;