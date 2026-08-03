import React, { useEffect, useState } from 'react';
import "./navbar.css";
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { searchProductApi } from '../../services/products';

export default function Navbar() {
    const [showSearchZone, setShowSearchZone] = useState(false);
    const location = useLocation();

    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timer;
        if (search && search.trim() !== "") {
            setIsLoading(true);
            timer = setTimeout(() => {
                const fetchProducts = async (query) => {
                    try {
                        const response = await searchProductApi(query);
                        setProducts(response.products || []);
                    } catch (error) {
                        setProducts([]);
                    } finally {
                        setIsLoading(false);
                    }
                };
                fetchProducts(search);
            }, 400); // 400ms debounce feels much snappier than 2000ms
        } else {
            setProducts(null);
            setIsLoading(false);
        }

        return () => clearTimeout(timer);
    }, [search]);

    const handleCloseSearch = () => {
        setShowSearchZone(false);
        setSearch("");
        setProducts(null);
    };

    return (
        <nav className='navbar'>
            <div className="nav-container">
                {/* Logo Section */}
                <div className="logo">
                    <Link to="/">
                        <img src="header/logo.png" alt="Logo" className='logoImage' />
                    </Link>
                </div>

                {/* Conditional Dynamic Middle Zone */}
                {showSearchZone ? (
                    <div className="zoneSearch">
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Search products, brands, categories..." 
                                className="zoneSearchInput" 
                                autoFocus
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <button onClick={handleCloseSearch} className='closeSearch' aria-label="Close search">
                                ✕
                            </button>
                        </div>

                        {/* Search Results Dropdown */}
                        {search && (
                            <div className='products_searched'>
                                {isLoading ? (
                                    <div className="search-status">Searching products...</div>
                                ) : products && products.length > 0 ? (
                                    <div className="search-results-list">
                                        {products.map((product) => (
                                            <Link 
                                                to={`/products/${product.id}`} 
                                                className='product_searched' 
                                                key={product.id}
                                                onClick={handleCloseSearch}
                                            >
                                                {product.thumbnail && (
                                                    <img 
                                                        src={product.thumbnail} 
                                                        alt={product.title} 
                                                        className="search-product-img" 
                                                    />
                                                )}
                                                <div className="search-product-info">
                                                    <span className="search-product-title">{product.title}</span>
                                                    {product.category && (
                                                        <span className="search-product-category">{product.category}</span>
                                                    )}
                                                </div>
                                                {product.price && (
                                                    <span className="search-product-price">${product.price}</span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="search-status">No products found for "{search}"</div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="menu">
                        <Link to="/" className={`menu-item ${location.pathname === '/' ? "active" : ""}`}>Home</Link>
                        <Link to="/products" className={`menu-item ${location.pathname === '/products' ? "active" : ""}`}>Products</Link>
                        <Link to="/aboutUs" className={`menu-item ${location.pathname === '/aboutUs' ? "active" : ""}`}>About Us</Link>
                        <Link to="/contactUs" className={`menu-item ${location.pathname === '/contactUs' ? "active" : ""}`}>Contact Us</Link>
                    </div>
                )}
             
                {/* Right Utilities Section */}
                <div className="searchCart">
                    {!showSearchZone && (
                        <button className="icon-btn" onClick={() => setShowSearchZone(true)} aria-label="Search">
                            <Search size={20} />
                            <span className="icon-label">Search</span>
                        </button>
                    )}
                    <button className="icon-btn cart-btn" aria-label="Cart">
                        <ShoppingBag size={20} />
                        <span className="icon-label">Cart</span>
                        <span className="cart-badge">0</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}