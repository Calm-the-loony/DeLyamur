import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || 'all';
  
  const [results, setResults] = useState({ products: [], categories: [], pages: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(typeFilter);

  useEffect(() => {
    setActiveTab(typeFilter);
  }, [typeFilter]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log('Данные поиска:', data);
        setResults(data);
      } catch (error) {
        console.error('Ошибка загрузки результатов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // Форматирование для отображения
  const formatCount = (count) => {
    if (count === 0) return 'нет';
    if (count === 1) return '1 результат';
    if (count >= 2 && count <= 4) return `${count} результата`;
    return `${count} результатов`;
  };

  if (loading) {
    return (
      <div className="search-loading-container">
        <div className="search-spinner"></div>
        <p>Ищем букеты...</p>
      </div>
    );
  }

  const totalResults = results.products.length + results.categories.length + results.pages.length;

  const getFilteredResults = () => {
    switch(activeTab) {
      case 'products':
        return { products: results.products, categories: [], pages: [] };
      case 'categories':
        return { products: [], categories: results.categories, pages: [] };
      case 'pages':
        return { products: [], categories: [], pages: results.pages };
      default:
        return results;
    }
  };

  const filtered = getFilteredResults();

  return (
    <>
      {/* Hero секция */}
      <section className="search-hero">
        <div className="search-container">
          <div className="search-heroContent">
            <span className="search-heroLabel">Поиск</span>
            <h1 className="search-heroTitle">
              Результаты поиска
            </h1>
            <p className="search-heroQuery">«{query}»</p>
            <p className="search-heroCount">
              Найдено {formatCount(totalResults)}
            </p>
          </div>
        </div>
        <div className="search-heroDecoration">
          <span className="search-decorationCircle"></span>
          <span className="search-decorationLine"></span>
        </div>
      </section>

      {/* Хлебные крошки */}
      <section className="search-breadcrumbs">
        <div className="search-container">
          <ul className="search-breadcrumbsList">
            <li className="search-breadcrumbsItem">
              <Link to="/" className="search-breadcrumbsLink">Главная</Link>
            </li>
            <li className="search-breadcrumbsItem">
              <Link to="/catalog" className="search-breadcrumbsLink">Каталог</Link>
            </li>
            <li className="search-breadcrumbsItem search-breadcrumbsCurrent">
              Поиск: {query}
            </li>
          </ul>
        </div>
      </section>

      {totalResults > 0 ? (
        <>
          {/* Табы для фильтрации */}
          <section className="search-tabs-section">
            <div className="search-container">
              <div className="search-tabs">
                <button 
                  className={`search-tab ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  <span className="search-tabName">Все</span>
                  <span className="search-tabCount">{totalResults}</span>
                </button>
                <button 
                  className={`search-tab ${activeTab === 'products' ? 'active' : ''}`}
                  onClick={() => setActiveTab('products')}
                >
                  <span className="search-tabName">Букеты</span>
                  <span className="search-tabCount">{results.products.length}</span>
                </button>
                <button 
                  className={`search-tab ${activeTab === 'categories' ? 'active' : ''}`}
                  onClick={() => setActiveTab('categories')}
                >
                  <span className="search-tabName">Категории</span>
                  <span className="search-tabCount">{results.categories.length}</span>
                </button>
                <button 
                  className={`search-tab ${activeTab === 'pages' ? 'active' : ''}`}
                  onClick={() => setActiveTab('pages')}
                >
                  <span className="search-tabName">Статьи</span>
                  <span className="search-tabCount">{results.pages.length}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Результаты */}
          <section className="search-results-section">
            <div className="search-container">
              {/* Букеты */}
              {filtered.products.length > 0 && (
                <div className="search-results-block">
                  <h2 className="search-blockTitle">Букеты</h2>
                  <div className="search-productsGrid">
                    {filtered.products.map(product => (
                      <div key={product.id} className="search-product-card">
                        <div className="search-product-image">
                          <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} />
                          {product.is_hit && <span className="search-product-badge hit">Хит</span>}
                          {product.is_new && <span className="search-product-badge new">Новинка</span>}
                        </div>
                        <div className="search-product-info">
                          <h3 className="search-product-name">{product.name}</h3>
                          <p className="search-product-description">{product.description}</p>
                          <Link to={`/catalog`} className="search-product-link">
                            <span>Смотреть букет</span>
                            <span className="link-arrow">→</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Категории */}
              {filtered.categories.length > 0 && (
                <div className="search-results-block">
                  <h2 className="search-blockTitle">Категории</h2>
                  <div className="search-categoriesGrid">
                    {filtered.categories.map(category => (
                      <Link to={`/category/${category.slug}`} key={category.id} className="search-categoryCard">
                        <div className="search-categoryImage">
                          <img src={category.image || "https://via.placeholder.com/300"} alt={category.name} />
                        </div>
                        <div className="search-categoryContent">
                          <h3 className="search-categoryName">{category.name}</h3>
                          <p className="search-categoryDescription">{category.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Статьи */}
              {filtered.pages.length > 0 && (
                <div className="search-results-block">
                  <h2 className="search-blockTitle">Статьи</h2>
                  <div className="search-pagesGrid">
                    {filtered.pages.map(page => (
                      <Link to={`/blog/${page.id}`} key={page.id} className="search-pageCard">
                        <div className="search-pageImage">
                          <img src={page.image || "https://via.placeholder.com/300"} alt={page.name} />
                        </div>
                        <div className="search-pageContent">
                          <h3 className="search-pageName">{page.name}</h3>
                          <p className="search-pageDescription">{page.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="search-empty">
          <div className="search-container">
            <div className="search-emptyCard">
              <div className="search-emptyIcon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#e83e8c" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <h2 className="search-emptyTitle">Ничего не найдено</h2>
              <p className="search-emptyText">
                По вашему запросу «{query}» ничего не найдено. 
                Попробуйте изменить запрос или посмотреть другие категории.
              </p>
              <Link to="/catalog" className="search-emptyLink">
                <span>Перейти в каталог</span>
                <span className="link-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResults;