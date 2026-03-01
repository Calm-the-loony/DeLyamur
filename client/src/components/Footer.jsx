import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">Де Лямур</Link>
            <p className="footer-tagline">цветочная мастерская</p>
            <div className="footer-decoration">
              <span className="decoration-dot"></span>
              <span className="decoration-dot"></span>
              <span className="decoration-dot"></span>
            </div>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <h3 className="footer-title">Магазин</h3>
              <ul className="footer-list">
                <li><Link to="/catalog" className="footer-link">Каталог</Link></li>
                <li><Link to="/about" className="footer-link">О нас</Link></li>
                <li><Link to="/delivery" className="footer-link">Доставка</Link></li>
                <li><Link to="/contacts" className="footer-link">Контакты</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Категории</h3>
              <ul className="footer-list">
                <li><Link to="/category/wedding" className="footer-link">Свадебные</Link></li>
                <li><Link to="/category/birthday" className="footer-link">День рождения</Link></li>
                <li><Link to="/category/romantic" className="footer-link">Романтические</Link></li>
                <li><Link to="/category/business" className="footer-link">Деловые</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Контакты</h3>
              <ul className="footer-list">
                <li className="footer-contact">
                  <span className="contact-label">Тел:</span>
                  <a href="tel:88005551615" className="footer-link">8 900 555 16 15</a>
                </li>
                <li className="footer-contact">
                  <span className="contact-label">Почта:</span>
                  <a href="mailto:info@delyamur.ru" className="footer-link">info@delyamur.ru</a>
                </li>
                <li className="footer-contact">
                  <span className="contact-label">Часы:</span>
                  <span className="footer-text">9:00 - 20:00 ежедневно</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2026 Де Лямур. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;