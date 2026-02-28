import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Order from './pages/Order';
import Delivery from './pages/Delivery';
import Contacts from './pages/Contacts';
import Category from './pages/Category';
import Blog from './pages/Blog';           
import BlogPost from './pages/BlogPost';  
import SearchResults from './pages/SearchResults';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/order" element={<Order />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/category/:cat" element={<Category />} />
          <Route path="/blog" element={<Blog />} />              
          <Route path="/blog/:id" element={<BlogPost />} />  
            <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer />
        <ScrollTop />
      </div>
    </Router>
  );
}

// Компонент кнопки "Наверх"
const ScrollTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 300);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`scroll-top ${visible ? 'active' : ''}`}
      onClick={scrollToTop}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default App;