import React from 'react';
import { Link } from 'react-router-dom'; 
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="heroSectionUnique">
      <div className="heroSectionUnique-bg">
        <div className="heroSectionUnique-pattern"></div>
      </div>
      
      <div className="heroSectionUnique-container">
        <div className="heroSectionUnique-content">
          <h1 className="heroSectionUnique-title">
            <span className="heroSectionUnique-titleSmall">Цветочная мастерская</span>
            <span className="heroSectionUnique-titleLarge">Де Лямур</span>
          </h1>
          
          <p className="heroSectionUnique-description">
            Создаем букеты с душой. Только свежие цветы, 
            авторский подход и бережная доставка.
          </p>
          
          <div className="heroSectionUnique-actions">
            <Link to="/catalog" className="heroSectionUnique-link">
              Изучить коллекцию
              <span className="heroSectionUnique-arrow">→</span>
            </Link>
            
            <div className="heroSectionUnique-social">
              <Link to="/contacts" className="heroSectionUnique-socialLink">Instagram</Link>
              <Link to="/contacts" className="heroSectionUnique-socialLink">Telegram</Link>
              <Link to="/contacts" className="heroSectionUnique-socialLink">WhatsApp</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="heroSectionUnique-footer">
        <span className="heroSectionUnique-footerText">Ежедневно с 9:00 до 21:00</span>
        <span className="heroSectionUnique-footerSeparator">•</span>
        <span className="heroSectionUnique-footerText">Бесплатная доставка от 3000₽</span>
      </div>
    </section>
  );
};

export default HeroSection;