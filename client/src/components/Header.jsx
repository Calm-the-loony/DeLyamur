import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        if (!searchQuery) {
          setSearchOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  useEffect(() => {
    setSearchOpen(false);
    setSearchQuery('');
    setShowResults(false);
  }, [location]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        const allResults = [
          ...data.products.map(p => ({ ...p, type: 'product' })),
          ...data.categories.map(c => ({ ...c, type: 'category' })),
          ...data.pages.map(p => ({ ...p, type: 'page' }))
        ];
        
        setSearchResults(allResults);
        setShowResults(true);
      } catch (error) {
        console.error('Ошибка поиска:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = (result) => {
    setSearchOpen(false);
    setSearchQuery('');
    setShowResults(false);
    
    if (result.type === 'product') {
      navigate(`/search?q=${encodeURIComponent(result.name)}&type=products`);
    } else if (result.type === 'category') {
      navigate(`/search?q=${encodeURIComponent(result.name)}&type=categories`);
    } else {
      navigate(result.url);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'product': return 'Букет';
      case 'category': return 'Категория';
      case 'page': return 'Статья';
      default: return '';
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            Де Лямур
          </Link>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`} 
              onClick={() => setMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/catalog" 
              className={`nav-link ${isActive('/catalog') ? 'active' : ''}`} 
              onClick={() => setMenuOpen(false)}
            >
              Букеты
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`} 
              onClick={() => setMenuOpen(false)}
            >
              О нас
            </Link>
            <Link 
              to="/delivery" 
              className={`nav-link ${isActive('/delivery') ? 'active' : ''}`} 
              onClick={() => setMenuOpen(false)}
            >
              Доставка
            </Link>
            <Link 
              to="/contacts" 
              className={`nav-link ${isActive('/contacts') ? 'active' : ''}`} 
              onClick={() => setMenuOpen(false)}
            >
              Контакты
            </Link>
          </nav>

          <div className="actions">
            <div className="search-container" ref={searchRef}>
              <button 
                className={`action-btn search-btn ${searchOpen ? 'active' : ''}`} 
                aria-label="Поиск"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>

              {searchOpen && (
                <div className="search-dropdown">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="search-input-wrapper">
                      <input
                        type="text"
                        placeholder="Поиск букетов, категорий..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                        autoFocus
                      />
                      {searchQuery && (
                        <button type="button" className="search-clear" onClick={clearSearch}>
                          ×
                        </button>
                      )}
                    </div>
                  </form>

                  {showResults && (
                    <div className="search-results">
                      {loading ? (
                        <div className="search-loading">
                          <div className="search-spinner"></div>
                          <span>Поиск...</span>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          <div className="search-results-count">
                            Найдено {searchResults.length} результатов
                          </div>
                          <div className="search-results-list">
                            {searchResults.slice(0, 5).map(result => (
                              <div
                                key={`${result.type}-${result.id}`}
                                className="search-result-item"
                                onClick={() => handleResultClick(result)}
                              >
                                <span className="search-result-type">{getTypeLabel(result.type)}</span>
                                <div className="search-result-info">
                                  <span className="search-result-name">{result.name}</span>
                                  {result.category_name && (
                                    <span className="search-result-category">{result.category_name}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          {searchResults.length > 5 && (
                            <div className="search-view-all">
                              <button 
                                className="search-view-all-btn"
                                onClick={() => {
                                  navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                                  setSearchOpen(false);
                                  setSearchQuery('');
                                  setShowResults(false);
                                }}
                              >
                                Показать все результаты ({searchResults.length})
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="search-no-results">
                          <p>Ничего не найдено</p>
                          <p className="search-no-results-hint">Попробуйте изменить запрос</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              className={`menu-btn ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;