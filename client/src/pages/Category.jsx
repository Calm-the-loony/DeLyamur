import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Category.css';

const Category = () => {
  const { cat } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  // Данные категорий
  const categories = {
    wedding: {
      name: 'Свадебные букеты',
      description: 'Нежные и изящные букеты для самого важного дня'
    },
    birthday: {
      name: 'Букеты на день рождения',
      description: 'Яркие и праздничные композиции для именинников'
    },
    romantic: {
      name: 'Романтические букеты',
      description: 'Букеты для признаний в любви и свиданий'
    },
    business: {
      name: 'Деловые букеты',
      description: 'Строгие и элегантные композиции для партнеров и коллег'
    }
  };

  // Товары по категориям
  const productsByCategory = {
    wedding: [
      {
        id: 1,
        image: "https://i.pinimg.com/736x/04/99/5d/04995d268635d11f1ee0a659525a0711.jpg",
        name: "Свадебный вальс",
        description: "Нежные пионы и розы",
        rating: 5,
        reviews: 45,
        currentPrice: "5 500",
        category: "wedding"
      },
      {
        id: 2,
        image: "https://i.pinimg.com/736x/2b/59/d3/2b59d3685de2a7461f557ccf16bdda40.jpg",
        name: "Нежность",
        description: "Розовые пионы и альстромерии",
        rating: 5,
        reviews: 56,
        currentPrice: "4 500",
        category: "wedding"
      },
      {
        id: 3,
        image: "https://i.pinimg.com/736x/97/78/33/9778339cf8a1e1e1851e6b6ed4ce81c6.jpg",
        badge: "Хит продаж",
        badgeType: "hit",
        name: "Белоснежка",
        description: "Белые розы и хризантемы",
        rating: 5,
        reviews: 38,
        currentPrice: "4 800",
        category: "wedding"
      }
    ],
    birthday: [
      {
        id: 4,
        image: "https://i.pinimg.com/736x/ac/ed/d2/acedd2e2b953d0637e41e9fffdbbfee7.jpg",
        name: "День рождения",
        description: "Яркий микс из гербер и хризантем",
        rating: 4,
        reviews: 12,
        currentPrice: "3 200",
        category: "birthday"
      },
      {
        id: 5,
        image: "https://i.pinimg.com/736x/48/8b/9b/488b9b95779fdf4cf9a10121874ee0e2.jpg",
        name: "Весеннее настроение",
        description: "Яркие тюльпаны и гиацинты",
        rating: 4,
        reviews: 18,
        currentPrice: "2 800",
        category: "birthday"
      },
      {
        id: 6,
        image: "https://i.pinimg.com/736x/c4/ae/f0/c4aef06a3a32c70ce1ed75271ab1d3e5.jpg",
        badge: "Новинка",
        badgeType: "new",
        name: "Солнечный день",
        description: "Желтые розы и подсолнухи",
        rating: 4.5,
        reviews: 22,
        currentPrice: "3 900",
        category: "birthday"
      }
    ],
    romantic: [
      {
        id: 7,
        image: "https://i.pinimg.com/736x/d9/6d/7c/d96d7c6e332d711c13acb67193b7380a.jpg",
        name: "Признание",
        description: "Красные розы в сердце",
        rating: 5,
        reviews: 38,
        currentPrice: "4 800",
        category: "romantic"
      },
      {
        id: 8,
        image: "https://i.pinimg.com/736x/97/78/33/9778339cf8a1e1e1851e6b6ed4ce81c6.jpg",
        badge: "Хит продаж",
        badgeType: "hit",
        name: "Романтический букет",
        description: "Нежные розы и пионы",
        rating: 4.5,
        reviews: 24,
        currentPrice: "3 500",
        oldPrice: "4 200",
        category: "romantic"
      }
    ],
    business: [
      {
        id: 9,
        image: "https://i.pinimg.com/736x/44/b8/fa/44b8fa8a8744b195159eb5a3a19e2919.jpg",
        name: "Деловой этикет",
        description: "Строгие и элегантные хризантемы",
        rating: 4.5,
        reviews: 21,
        currentPrice: "3 900",
        category: "business"
      },
      {
        id: 10,
        image: "https://i.pinimg.com/736x/c4/ae/f0/c4aef06a3a32c70ce1ed75271ab1d3e5.jpg",
        name: "Элегантность",
        description: "Белые розы, гортензии",
        rating: 5,
        reviews: 32,
        currentPrice: "4 200",
        category: "business"
      }
    ]
  };

  useEffect(() => {
    if (categories[cat]) {
      setCategoryName(categories[cat].name);
      setCategoryDescription(categories[cat].description);
    }
  }, [cat]);

  const products = productsByCategory[cat] || [];

  return (
    <>

      {/* Заголовок категории */}
      <section className="category-header">
        <div className="container">
          <div className="category-header-content">
            <h1 className="category-title">{categoryName}</h1>
            <p className="category-description">{categoryDescription}</p>
          </div>
        </div>
      </section>

      {/* Товары категории */}
      <section className="category-products">
        <div className="container">
          {products.length > 0 ? (
            <>
              <div className="category-stats">
                <span className="products-count">Найдено {products.length} букета</span>
              </div>
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="category-empty">
              <div className="empty-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <p className="empty-text">В этой категории пока нет товаров</p>
              <Link to="/catalog" className="category-link">
                <span>Вернуться в каталог</span>
                <span className="link-arrow">→</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Category;