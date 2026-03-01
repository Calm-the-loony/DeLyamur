const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к базе данных
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'flower_shop',
    port: 3307
});

db.connect(err => {
    if (err) {
        console.error('❌ Ошибка подключения к БД:', err.message);
        return;
    }
    console.log('✅ Подключено к базе данных MySQL на порту 3307');
});

app.get('/api/categories', (req, res) => {
    db.query('SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.get('/api/categories/:slug', (req, res) => {
    db.query('SELECT * FROM categories WHERE slug = ?', [req.params.slug], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results[0] || null);
    });
});

app.get('/api/products', (req, res) => {
    let query = `
        SELECT p.*, c.name as category_name, c.slug as category_slug,
               (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as main_image
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1
    `;
    const params = [];

    if (req.query.category) {
        query += ' AND c.slug = ?';
        params.push(req.query.category);
    }

    if (req.query.is_new === 'true') {
        query += ' AND p.is_new = 1';
    }

    if (req.query.is_hit === 'true') {
        query += ' AND p.is_hit = 1';
    }

    if (req.query.sort) {
        switch(req.query.sort) {
            case 'price_asc':
                query += ' ORDER BY p.price ASC';
                break;
            case 'price_desc':
                query += ' ORDER BY p.price DESC';
                break;
            case 'rating':
                query += ' ORDER BY p.rating DESC';
                break;
            default:
                query += ' ORDER BY p.created_at DESC';
        }
    } else {
        query += ' ORDER BY p.created_at DESC';
    }

    db.query(query, params, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.get('/api/products/:slug', (req, res) => {
    const query = `
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.slug = ?
    `;
    
    db.query(query, [req.params.slug], (err, productResults) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (productResults.length === 0) {
            res.status(404).json({ error: 'Продукт не найден' });
            return;
        }

        const product = productResults[0];
        
        db.query('SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order', [product.id], (err, imageResults) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            product.images = imageResults;
            res.json(product);
        });
    });
});

app.get('/api/search', (req, res) => {
    const searchTerm = req.query.q;
    
    if (!searchTerm || searchTerm.length < 2) {
        res.json({ products: [], categories: [], pages: [] });
        return;
    }

    const searchPattern = `%${searchTerm}%`;

    const productsQuery = `
        SELECT 'product' as type, p.id, p.name, p.slug, p.description, 
               c.name as category_name,
               (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as image
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.name LIKE ? OR p.description LIKE ?
    `;

    const categoriesQuery = `
        SELECT 'category' as type, id, name, slug, description, image
        FROM categories
        WHERE name LIKE ? OR description LIKE ?
    `;

    const blogQuery = `
        SELECT 'page' as type, id, title as name, slug, excerpt as description, image
        FROM blog_posts
        WHERE title LIKE ? OR excerpt LIKE ?
    `;

    Promise.all([
        new Promise(resolve => db.query(productsQuery, [searchPattern, searchPattern], (err, results) => resolve(results || []))),
        new Promise(resolve => db.query(categoriesQuery, [searchPattern, searchPattern], (err, results) => resolve(results || []))),
        new Promise(resolve => db.query(blogQuery, [searchPattern, searchPattern], (err, results) => resolve(results || [])))
    ]).then(([products, categories, pages]) => {
        res.json({
            products,
            categories,
            pages,
            total: products.length + categories.length + pages.length
        });
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/api/blog', (req, res) => {
    let query = 'SELECT * FROM blog_posts WHERE is_published = 1';
    const params = [];
    
    if (req.query.category) {
        query += ' AND category = ?';
        params.push(req.query.category);
    }
    
    query += ' ORDER BY published_at DESC';
    
    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Ошибка получения статей:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.get('/api/blog/:id', (req, res) => {
    const id = req.params.id;
    console.log('Запрос статьи с ID:', id);
    
    const query = 'SELECT * FROM blog_posts WHERE id = ? AND is_published = 1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Ошибка получения статьи:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (results.length === 0) {
            console.log('Статья не найдена с ID:', id);
            res.status(404).json({ error: 'Статья не найдена' });
            return;
        }
        
        const post = results[0];
        console.log('Статья найдена:', post.title);
        
        db.query('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?', [id], (updateErr) => {
            if (updateErr) {
                console.error('Ошибка обновления просмотров:', updateErr);
            }
        });
        
        res.json(post);
    });
});

app.get('/api/popular-products', (req, res) => {
    const query = `
        SELECT p.*, 
               (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as main_image
        FROM products p
        WHERE p.is_hit = 1 OR p.is_new = 1
        ORDER BY p.rating DESC
        LIMIT 3
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.get('/api/testimonials', (req, res) => {
    db.query(
        'SELECT * FROM testimonials WHERE is_published = 1 ORDER BY date DESC',
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(results);
        }
    );
});

app.get('/api/team', (req, res) => {
    db.query(
        'SELECT * FROM team WHERE is_active = 1 ORDER BY sort_order',
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(results);
        }
    );
});

app.get('/api/settings', (req, res) => {
    db.query('SELECT * FROM settings', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        const settings = {};
        results.forEach(row => {
            settings[row.setting_key] = row.setting_value;
        });
        
        res.json(settings);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`База данных: ${process.env.DB_NAME || 'flower_shop'}`);
});