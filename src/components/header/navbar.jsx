import React, { useState } from 'react';
import "./navbar.css";

export default function Navbar() {
    const [showSearchZone, setShowSearchZone] = useState(false);

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
                        />
                        <button onClick={() => setShowSearchZone(false)} className='closeSearch' aria-label="Close search">
                            ✕
                        </button>
                    </div>
                ) : (
                    <div className="menu">
                        <div className="menu-item categories">Categories</div>
                        <div className="menu-item">Home</div>
                        <div className="menu-item">About Us</div>
                        <div className="menu-item">Contact Us</div>
                    </div>
                )}
             
                {/* Right Utilities Section */}
                <div className="searchCart">
                    {!showSearchZone && (
                        <button className="icon-btn" onClick={() => setShowSearchZone(true)} aria-label="Search">
                            {/* Simple inline SVG for Search Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <span className="icon-label">Search</span>
                        </button>
                    )}
                    <button className="icon-btn cart-btn" aria-label="Cart">
                        {/* Simple inline SVG for Cart Icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <span className="icon-label">Cart</span>
                        <span className="cart-badge">0</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}