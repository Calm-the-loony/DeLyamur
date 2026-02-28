import React from 'react';
import { Link } from 'react-router-dom';
import './Delivery.css';

const Delivery = () => {
  const deliveryOptions = [
    {
      id: 1,
      title: "Стандартная доставка",
      time: "2-3 часа",
      price: "300 ₽",
      description: "Доставка по городу в течение 2-3 часов. Курьер позвонит за 30 минут.",
      icon: "delivery"
    },
    {
      id: 2,
      title: "Экспресс-доставка",
      time: "1 час",
      price: "500 ₽",
      description: "Срочная доставка в течение часа. Доступна при заказе до 19:00.",
      icon: "express"
    },
    {
      id: 3,
      title: "Самовывоз",
      time: "бесплатно",
      price: "0 ₽",
      description: "Заберите заказ самостоятельно из нашей мастерской по адресу: Будённовский проспект, 53",
      icon: "pickup"
    }
  ];

  const zones = [
    {
      name: "Центр",
      price: "300 ₽",
      time: "1-2 часа"
    },
    {
      name: "Северный район",
      price: "350 ₽",
      time: "2-3 часа"
    },
    {
      name: "Западный район",
      price: "350 ₽",
      time: "2-3 часа"
    },
    {
      name: "Восточный район",
      price: "400 ₽",
      time: "2-3 часа"
    },
    {
      name: "Южный район",
      price: "400 ₽",
      time: "2-3 часа"
    },
    {
      name: "Пригород",
      price: "500 ₽",
      time: "3-4 часа"
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      name: "В салоне",
      description: "Оплата наличными или картой при самовывозе",
      icon: "cash"
    },
    {
      id: 2,
      name: "Курьеру наличными",
      description: "Оплата при получении заказа",
      icon: "cash"
    },
    {
      id: 3,
      name: "Курьеру картой",
      description: "Терминал для оплаты у курьера",
      icon: "terminal"
    },
    {
      id: 4,
      name: "Перевод на карту",
      description: "По номеру телефона или реквизитам",
      icon: "transfer"
    }
  ];

  const rules = [
    "Минимальная сумма заказа для доставки — 1 500 ₽",
    "При заказе от 3 000 ₽ доставка по городу бесплатно",
    "Курьер свяжется за 30 минут до прибытия",
    "Вы можете проверить заказ при получении"
  ];

  const getIcon = (name) => {
    switch(name) {
      case 'delivery':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case 'express':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case 'pickup':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case 'cash':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
      case 'terminal':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
          </svg>
        );
      case 'transfer':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <polyline points="12 8 16 12 12 16" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero секция */}
      <section className="delivery-hero">
        <div className="container">
          <div className="delivery-hero-content">
            <span className="hero-label">Доставка</span>
            <h1 className="hero-title">
              Доставка и оплата
            </h1>
            <p className="hero-description">
              Мы доставим ваш заказ в любую точку города. Быстро, бережно и точно в срок.
            </p>
          </div>
        </div>
        <div className="hero-decoration">
          <span className="decoration-circle"></span>
          <span className="decoration-line"></span>
        </div>
      </section>


      {/* Варианты доставки */}
      <section className="delivery-options">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Как получить заказ</span>
            <h2 className="section-title">Способы доставки</h2>
          </div>

          <div className="options-grid">
            {deliveryOptions.map(option => (
              <div key={option.id} className="option-card">
                <div className="option-icon">
                  {getIcon(option.icon)}
                </div>
                <h3 className="option-title">{option.title}</h3>
                <div className="option-meta">
                  <span className="option-time">{option.time}</span>
                  <span className="option-price">{option.price}</span>
                </div>
                <p className="option-description">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Зоны доставки */}
      <section className="delivery-zones">
        <div className="container">
          <div className="zones-header">
            <span className="zones-subtitle">Зоны доставки</span>
            <h2 className="zones-title">Стоимость по районам</h2>
          </div>

          <div className="zones-grid">
            {zones.map((zone, index) => (
              <div key={index} className="zone-item">
                <span className="zone-name">{zone.name}</span>
                <div className="zone-info">
                  <span className="zone-price">{zone.price}</span>
                  <span className="zone-time">{zone.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="zones-note">
            <p>* Точная стоимость доставки рассчитывается при оформлении заказа</p>
          </div>
        </div>
      </section>

      {/* Правила доставки */}
      <section className="delivery-rules">
        <div className="container">
          <h2 className="rules-title">Правила доставки</h2>
          <ul className="rules-list">
            {rules.map((rule, index) => (
              <li key={index} className="rules-item">{rule}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Оплата */}
      <section className="payment-methods">
        <div className="container">
          <div className="payment-header">
            <span className="payment-subtitle">Удобно и безопасно</span>
            <h2 className="payment-title">Способы оплаты</h2>
          </div>

          <div className="payment-grid">
            {paymentMethods.map(method => (
              <div key={method.id} className="payment-card">
                <div className="payment-icon">
                  {getIcon(method.icon)}
                </div>
                <h3 className="payment-name">{method.name}</h3>
                <p className="payment-description">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="delivery-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Остались вопросы?</h2>
            <p className="cta-text">Свяжитесь с нами любым удобным способом</p>
            <div className="cta-links">
              <Link to="/contacts" className="cta-link">
                <span>Контакты</span>
                <span className="link-arrow">→</span>
              </Link>
              <a href="tel:88005551615" className="cta-link">
                <span>Позвонить</span>
                <span className="link-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Delivery;