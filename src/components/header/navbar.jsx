import React, { useEffect, useState } from 'react';
import "./navbar.css";
import { Search, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getProductsApi, searchProductApi } from '../../services/products';

export default function Navbar() {
    const [showSearchZone, setShowSearchZone] = useState(false);
    const location = useLocation();

    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState(null);
    

    useEffect(()=>{
        let timer;
        if(search != null && search != ""){
            timer = setTimeout(()=>{
                console.log('inside setTimeout', search)
                const fetchProducts = async (d) => {
                    try{
                        const response = await searchProductApi(d);
                        setProducts(response.products);
                    } catch(error) {
                        console.log('fetchProducts', error );
                    }
                }
                fetchProducts(search);

            }, 3000);
        }else{
            setProducts(null)
        }
        
        return ()=>{clearTimeout(timer)}
    },[search] )
    

    console.log('product', products)



    



    return (
        <nav className='navbar'>
            <div className="nav-container">
                {/* Logo Section */}
                <div className="logo">
                    <img src="header/logo.png" alt="Logo" className='logoImage' />
                </div>

                {/* Conditional Dynamic Middle Zone */}
                {showSearchZone ? (
                    <div className="zoneSearch">
                        <input 
                            type="text" 
                            placeholder="Search products, brands, categories..." 
                            className="zoneSearchInput" 
                            autoFocus
                            onChange={(event)=>{setSearch(event.target.value)}}
                        />
                        <button onClick={() => setShowSearchZone(false)} className='closeSearch' aria-label="Close search">
                            ✕
                        </button>

                        {
                            products && products.length > 0 ?  <div className='products_searched'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, perspiciatis.
                            </div>
                            :null
                        }
                        
                    </div>
                ) : (
                    <div className="menu">
                        <Link to="/" className={`menu-item ${location.pathname == '/' ? "active" : ""}`}>Home</Link>
                        <Link to="/products" className={`menu-item ${location.pathname == '/products' ? "active" : ""}`}>Products</Link>
                        <Link to="/aboutUs" className={`menu-item ${location.pathname == '/aboutUs' ? "active" : ""}`}>About Us</Link>
                        <Link to="/contactUs" className={`menu-item ${location.pathname == '/contactUs' ? "active" : ""}`}>Contact Us</Link>
                    </div>
                )}
             
                {/* Right Utilities Section */}
                <div className="searchCart">
                    {!showSearchZone && (
                        <button className="icon-btn" onClick={() => setShowSearchZone(true)} aria-label="Search">
                            {/* Simple inline SVG for Search Icon */}
                            <Search />
                            <span className="icon-label">Search</span>
                        </button>
                    )}
                    <button className="icon-btn cart-btn" aria-label="Cart">
                        {/* Simple inline SVG for Cart Icon */}
                        <ShoppingBag />
                        <span className="icon-label">Cart</span>
                        <span className="cart-badge">0</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}