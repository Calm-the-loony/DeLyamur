import React from 'react';
import { Link } from 'react-router-dom';
import './Contacts.css';

const Contacts = () => {
  const contacts = [
    {
      id: 1,
      type: "address",
      title: "Адрес",
      value: "г. Ростов-на-Дону, Будённовский проспект, 53",
      icon: "address"
    },
    {
      id: 2,
      type: "phone",
      title: "Телефон",
      value: "8‒800‒555‒16‒15",
      link: "tel:88005551615",
      icon: "phone"
    },
    {
      id: 3,
      type: "email",
      title: "Email",
      value: "info@delyamur.ru",
      link: "mailto:info@delyamur.ru",
      icon: "email"
    },
    {
      id: 4,
      type: "hours",
      title: "Часы работы",
      value: "Пн-Пт: 9:00 - 20:00\nСб-Вс: 10:00 - 18:00",
      icon: "hours"
    }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "#",
      icon: "instagram"
    },
    {
      name: "Telegram",
      url: "#",
      icon: "telegram"
    },
    {
      name: "WhatsApp",
      url: "#",
      icon: "whatsapp"
    }
  ];

  const getIcon = (name) => {
    switch(name) {
      case 'address':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case 'phone':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        );
      case 'email':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        );
      case 'hours':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="3" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      case 'telegram':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21.198 2.433a2.242 2.242 0 0 0-2.325-.333L2.765 9.318a1.787 1.787 0 0 0-.35 3.186l5.357 3.425 2.426 5.607a1.58 1.58 0 0 0 2.906-.131l3.537-8.818 5.036-4.48a1.788 1.788 0 0 0 .52-1.676z" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero секция */}
      <section className="contactsPage-hero">
        <div className="contactsPage-container">
          <div className="contactsPage-heroContent">
            <span className="contactsPage-heroLabel">Свяжитесь с нами</span>
            <h1 className="contactsPage-heroTitle">Контакты</h1>
            <p className="contactsPage-heroDescription">
              Мы всегда рады ответить на ваши вопросы и помочь с выбором
            </p>
          </div>
        </div>
        <div className="contactsPage-heroDecoration">
          <span className="contactsPage-decorationCircle"></span>
          <span className="contactsPage-decorationLine"></span>
        </div>
      </section>



      {/* Контактная информация */}
      <section className="contactsPage-info">
        <div className="contactsPage-container">
          <div className="contactsPage-grid">
            {contacts.map(contact => (
              <div key={contact.id} className="contactsPage-card">
                <div className="contactsPage-icon">
                  {getIcon(contact.icon)}
                </div>
                <h3 className="contactsPage-cardTitle">{contact.title}</h3>
                {contact.link ? (
                  <a href={contact.link} className="contactsPage-value contactsPage-link">
                    {contact.value}
                  </a>
                ) : (
                  <p className="contactsPage-value" style={{ whiteSpace: 'pre-line' }}>
                    {contact.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Социальные сети */}
      <section className="contactsPage-social">
        <div className="contactsPage-container">
          <div className="contactsPage-socialHeader">
            <span className="contactsPage-socialSubtitle">Мы в соцсетях</span>
            <h2 className="contactsPage-socialTitle">Присоединяйтесь</h2>
          </div>
          <div className="contactsPage-socialGrid">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                className="contactsPage-socialCard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contactsPage-socialIcon">
                  {getIcon(social.icon)}
                </div>
                <span className="contactsPage-socialName">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Новая секция: Как заказать букет */}
      <section className="contactsPage-order">
        <div className="contactsPage-container">
          <div className="contactsPage-orderCard">
            <div className="contactsPage-orderContent">
              <span className="contactsPage-orderSubtitle">Хотите заказать букет?</span>
              <h2 className="contactsPage-orderTitle">Свяжитесь с нами любым удобным способом</h2>
              <p className="contactsPage-orderText">
                Мы принимаем заказы по телефону и в социальных сетях. 
                Наши флористы помогут подобрать идеальный букет для любого повода!
              </p>
              
              <div className="contactsPage-orderMethods">
                <div className="contactsPage-orderMethod">
                  <div className="contactsPage-orderIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e83e8c" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="contactsPage-orderMethodInfo">
                    <h4>По телефону</h4>
                    <a href="tel:88005551615" className="contactsPage-orderLink">8‒800‒555‒16‒15</a>
                    <p>Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>

                <div className="contactsPage-orderMethod">
                  <div className="contactsPage-orderIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e83e8c" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="3" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div className="contactsPage-orderMethodInfo">
                    <h4>В Instagram</h4>
                    <a href="#" className="contactsPage-orderLink">@delyamur_flowers</a>
                    <p>Отвечаем в Direct</p>
                  </div>
                </div>

                <div className="contactsPage-orderMethod">
                  <div className="contactsPage-orderIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e83e8c" strokeWidth="1.5">
                      <path d="M21.198 2.433a2.242 2.242 0 0 0-2.325-.333L2.765 9.318a1.787 1.787 0 0 0-.35 3.186l5.357 3.425 2.426 5.607a1.58 1.58 0 0 0 2.906-.131l3.537-8.818 5.036-4.48a1.788 1.788 0 0 0 .52-1.676z" />
                    </svg>
                  </div>
                  <div className="contactsPage-orderMethodInfo">
                    <h4>Telegram бот</h4>
                    <a href="#" className="contactsPage-orderLink">@de_lamourbot</a>
                    <p>Быстрые ответы 24/7</p>
                  </div>
                </div>

                <div className="contactsPage-orderMethod">
                  <div className="contactsPage-orderIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e83e8c" strokeWidth="1.5">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div className="contactsPage-orderMethodInfo">
                    <h4>В WhatsApp</h4>
                    <a href="#" className="contactsPage-orderLink">+7‒800‒555‒16‒15</a>
                    <p>Напишите, мы онлайн</p>
                  </div>
                </div>
              </div>

              <div className="contactsPage-orderNote">
                <p>✨ Индивидуальные букеты собираем под заказ. Просто расскажите, что вы хотите!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="contactsPage-cta">
        <div className="contactsPage-container">
          <div className="contactsPage-ctaContent">
            <h2 className="contactsPage-ctaTitle">Остались вопросы?</h2>
            <p className="contactsPage-ctaText">
              Напишите нам, и мы ответим в ближайшее время
            </p>
            <div className="contactsPage-ctaLinks">
              <a href="mailto:info@delyamur.ru" className="contactsPage-ctaLink">
                <span>info@delyamur.ru</span>
                <span className="contactsPage-linkArrow">→</span>
              </a>
              <a href="tel:88005551615" className="contactsPage-ctaLink">
                <span>8‒800‒555‒16‒15</span>
                <span className="contactsPage-linkArrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacts;