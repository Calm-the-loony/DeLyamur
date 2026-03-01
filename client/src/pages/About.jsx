import React from 'react';
import './About.css';

const About = () => {
  const team = [
    {
      name: "Анна Иванова",
      position: "Главный флорист",
      photo: "https://decoracademy.ru/wp-content/uploads/2020/08/preview-01-7.jpg",
      description: "10 лет создает неповторимые букеты",
      accent: "Мастер своего дела"
    },
    {
      name: "Елена Петрова",
      position: "Флорист-дизайнер",
      photo: "https://blog.tutortop.ru/app/webpc-passthru.php?src=https://blog.tutortop.ru/app/uploads/2023/05/image-97.png&nocache=1",
      description: "Специализируется на свадебной флористике",
      accent: "Создает нежность"
    },
    {
      name: "Мария Сидорова",
      position: "Флорист",
      photo: "https://kartin.papik.pro/uploads/posts/2023-06/thumbs/1687158647_kartin-papik-pro-p-kartinki-florist-s-tsvetami-1.jpg",
      description: "Мастер авторских букетов",
      accent: "Творит с душой"
    }
  ];

  const values = [
    {
      number: "01",
      title: "Качество",
      description: "Только свежие цветы от лучших поставщиков"
    },
    {
      number: "02",
      title: "Индивидуальность",
      description: "Каждый букет создается с учетом ваших пожеланий"
    },
    {
      number: "03",
      title: "Надежность",
      description: "Бережная доставка и гарантия свежести"
    }
  ];

  return (
    <>
      {/* Hero секция */}
      <section className="aboutUnique-hero">
        <div className="aboutUnique-container">
          <div className="aboutUnique-heroContent">
            <span className="aboutUnique-heroLabel">Цветочная мастерская</span>
            <h1 className="aboutUnique-heroTitle">
              О нас
            </h1>
            <p className="aboutUnique-heroDescription">
              Команда профессионалов, которые любят свое дело и создают красоту каждый день
            </p>
          </div>
        </div>
        <div className="aboutUnique-heroDecoration">
          <span className="aboutUnique-decorationCircle"></span>
          <span className="aboutUnique-decorationLine"></span>
        </div>
      </section>

      {/* История */}
      <section className="aboutUnique-history">
        <div className="aboutUnique-container">
          <div className="aboutUnique-historyContent">
            <div className="aboutUnique-historyText">
              <span className="aboutUnique-historyLabel">С 2010 года</span>
              <h2 className="aboutUnique-historyTitle">Наша история</h2>
              <div className="aboutUnique-historyDescription">
                <p>
                  Цветочная мастерская Де Лямур начала свою работу в 2010 году с небольшого 
                  цветочного магазина в центре города. За 15 лет мы выросли в крупную мастерскую 
                  с собственной службой доставки и командой профессиональных флористов.
                </p>
                <p>
                  Наша миссия — дарить радость и красоту через цветы. Мы тщательно отбираем 
                  поставщиков, следим за свежестью цветов и постоянно учимся новым техникам 
                  флористики.
                </p>
                <p>
                  Каждый букет мы создаем с душой, учитывая индивидуальные пожелания клиентов. 
                  Для нас важно, чтобы наши цветы вызывали искренние улыбки и делали людей счастливее.
                </p>
              </div>
            </div>
            <div className="aboutUnique-historyImage">
              <img 
                src="https://posiflora.com/wp-content/uploads/2025/02/ad_4nxdidovcrvbaqwqwp7akdrdqlmreqhczboawvjaz49xhs_-pkfzascvwrijvs9tiexudhwygpa0xeix-c0z0mr5xkwidehpnrqtoct42psjwep3kxehnphd4sxm1btxfpp7guu_4lq.jpg" 
                alt="Наша мастерская"
              />
              <div className="aboutUnique-imageFrame"></div>
              <div className="aboutUnique-experienceBadge">
                <span className="aboutUnique-expNumber">15</span>
                <span className="aboutUnique-expText">лет опыта</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ценности */}
      <section className="aboutUnique-values">
        <div className="aboutUnique-container">
          <div className="aboutUnique-valuesHeader">
            <span className="aboutUnique-valuesSubtitle">Наши принципы</span>
            <h2 className="aboutUnique-valuesTitle">Что для нас важно</h2>
          </div>
          <div className="aboutUnique-valuesGrid">
            {values.map((value, index) => (
              <div key={index} className="aboutUnique-valueCard">
                <span className="aboutUnique-valueNumber">{value.number}</span>
                <h3 className="aboutUnique-valueTitle">{value.title}</h3>
                <p className="aboutUnique-valueDescription">{value.description}</p>
                <div className="aboutUnique-valueLine"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="aboutUnique-team">
        <div className="aboutUnique-container">
          <div className="aboutUnique-teamHeader">
            <span className="aboutUnique-teamSubtitle">Профессионалы</span>
            <h2 className="aboutUnique-teamTitle">Наша команда</h2>
          </div>
          
          <div className="aboutUnique-teamGrid">
            {team.map((member, index) => (
              <div key={index} className="aboutUnique-teamCard">
                <div className="aboutUnique-memberImageWrapper">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="aboutUnique-memberImage"
                  />
                  <div className="aboutUnique-imageOverlay"></div>
                </div>
                <div className="aboutUnique-memberInfo">
                  <span className="aboutUnique-memberAccent">{member.accent}</span>
                  <h3 className="aboutUnique-memberName">{member.name}</h3>
                  <p className="aboutUnique-memberPosition">{member.position}</p>
                  <p className="aboutUnique-memberDescription">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты и карта */}
      <section className="aboutUnique-contacts">
        <div className="aboutUnique-container">
          <div className="aboutUnique-contactsHeader">
            <span className="aboutUnique-contactsSubtitle">Всегда на связи</span>
            <h2 className="aboutUnique-contactsTitle">Как нас найти</h2>
          </div>
          
          <div className="aboutUnique-contactsContent">
            <div className="aboutUnique-contactsInfo">
              <div className="aboutUnique-contactItem">
                <div className="aboutUnique-contactIcon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="aboutUnique-contactDetail">
                  <h4>Адрес</h4>
                  <p>г. Ростов-на-Дону, Будённовский проспект, 53</p>
                </div>
              </div>
              
              <div className="aboutUnique-contactItem">
                <div className="aboutUnique-contactIcon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="aboutUnique-contactDetail">
                  <h4>Телефон</h4>
                  <p>8‒800‒555‒16‒15</p>
                </div>
              </div>
              
              <div className="aboutUnique-contactItem">
                <div className="aboutUnique-contactIcon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="aboutUnique-contactDetail">
                  <h4>Email</h4>
                  <p>info@delyamur.ru</p>
                </div>
              </div>
              
              <div className="aboutUnique-contactItem">
                <div className="aboutUnique-contactIcon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="aboutUnique-contactDetail">
                  <h4>Часы работы</h4>
                  <p>Пн-Пт: 9:00 - 20:00</p>
                  <p>Сб-Вс: 10:00 - 18:00</p>
                </div>
              </div>
              
              <div className="aboutUnique-contactSocial">
                <a href="#" className="aboutUnique-socialLink" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="3"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" className="aboutUnique-socialLink" aria-label="Telegram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21.198 2.433a2.242 2.242 0 0 0-2.325-.333L2.765 9.318a1.787 1.787 0 0 0-.35 3.186l5.357 3.425 2.426 5.607a1.58 1.58 0 0 0 2.906-.131l3.537-8.818 5.036-4.48a1.788 1.788 0 0 0 .52-1.676z"/>
                  </svg>
                </a>
                <a href="#" className="aboutUnique-socialLink" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="aboutUnique-mapWrapper">
              <iframe 
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Будённовский+проспект+53,+Ростов-на-Дону&center=47.2266,39.7244&zoom=15" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Карта проезда"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;