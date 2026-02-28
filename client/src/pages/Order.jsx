import React from 'react';
import { Link } from 'react-router-dom';
import './Order.css';

const Order = () => {
  return (
    <>
      <section className="order-section">
        <div className="container">
          <h2 className="section-title">Как заказать букет</h2>
          <p className="section-subtitle">
            Всего несколько простых шагов и ваш букет будет готов
          </p>

          <div className="order-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Выберите букет</h3>
                <p>Посмотрите наш каталог и выберите понравившийся букет или составьте свой</p>
                <Link to="/catalog" className="btn btn-small">Перейти в каталог</Link>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Позвоните нам</h3>
                <p>Позвоните по телефону и уточните детали заказа, время и адрес доставки</p>
                <a href="tel:+78005551615" className="btn btn-small btn-call">
                  <i className="fas fa-phone-alt"></i> Позвонить
                </a>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Получите доставку</h3>
                <p>Мы соберем и доставим ваш букет в указанное время и место</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="order-benefits">
        <div className="container">
          <h2 className="section-title">Почему выбирают нас</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-truck"></i>
              <h3>Бесплатная доставка</h3>
              <p>При заказе от 3000 рублей</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-clock"></i>
              <h3>Точно в срок</h3>
              <p>Доставим к назначенному времени</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-gem"></i>
              <h3>Гарантия качества</h3>
              <p>Свежесть цветов 7 дней</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-heart"></i>
              <h3>Индивидуальный подход</h3>
              <p>Учтем все пожелания</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bouquet-examples">
        <div className="container">
          <h2 className="section-title">Примеры наших букетов</h2>
          <div className="bouquet-grid">
            {[1, 2, 3].map(item => (
              <Link to="/catalog" key={item} className="bouquet-card">
                <div 
                  className="bouquet-image"
                  style={{ 
                    backgroundImage: `url(https://i.pinimg.com/736x/${item === 1 ? '97/78/33/9778339cf8a1e1e1851e6b6ed4ce81c6' : item === 2 ? '48/8b/9b/488b9b95779fdf4cf9a10121874ee0e2' : 'c4/ae/f0/c4aef06a3a32c70ce1ed75271ab1d3e5'}.jpg)` 
                  }}
                ></div>
                <div className="bouquet-info">
                  <h3>Букет #{item}</h3>
                  <p>от 2 800 ₽</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="contacts">
        <div className="container">
          <h2 className="section-title">Наши контакты</h2>
          <div className="contacts-grid">
            <div className="contact-card">
              <i className="fas fa-phone-alt"></i>
              <h3>Телефон</h3>
              <p><a href="tel:+78005551615">8‒800‒555‒16‒15</a></p>
              <p>Ежедневно с 9:00 до 20:00</p>
            </div>
            <div className="contact-card">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Адрес</h3>
              <p>г. Ростов-на-Дону, Будённовский проспект, 53</p>
            </div>
            <div className="contact-card">
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <p><a href="mailto:info@delyamur.ru">info@delyamur.ru</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;