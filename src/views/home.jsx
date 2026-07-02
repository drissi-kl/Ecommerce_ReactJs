import React from 'react'
import "./home.css";

export default function Home() {
  // Array data to map over for clean, maintainable category blocks
  const categories = [
    { id: 1, name: "New Arrivals", count: "120+ Items", className: "cat-card-1" },
    { id: 2, name: "Streetwear", count: "85+ Items", className: "cat-card-2" },
    { id: 3, name: "Accessories", count: "40+ Items", className: "cat-card-3" },
    { id: 4, name: "Minimalist Essentials", count: "60+ Items", className: "cat-card-4" }
  ];

  return (
    <main className='home'>
      {/* Hero Section */}
      <section className='hero'>
        <div className="hero-container">
          <div className="left_side">
            <div className="tagline">NEW SEASON INCOMING</div>
            <h1 className="left_side_top">Elevate Your Everyday Style & Comfort.</h1>
            <p className="left_side_bottom">
              Discover curated collections crafted for your modern lifestyle. Get 20% off your first order with free worldwide shipping today.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">Shop Collection</button>
              <button className="btn btn-secondary">Explore Lookbook</button>
            </div>
          </div>

          <div className='right_side'>
            <div className="hero-image-wrapper">
              <div className="hero-image-placeholder">
                <span className="badge-overlay">Trending Now</span>
              </div>
              <div className="decorative-blob"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- New Categories Section --- */}
      <section className="categories-section">
        <div className="categories-container">
          
          <div className="section-header">
            <div>
              <span className="sub-title">Shop by Vibe</span>
              <h2 className="section-title">Popular Categories</h2>
            </div>
            <button className="view-all-link">View All Categories →</button>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className={`category-card ${category.className}`}>
                {/* Fallback overlay inside the cards */}
                <div className="category-overlay">
                  <div className="category-info">
                    <span className="category-count">{category.count}</span>
                    <h3 className="category-name">{category.name}</h3>
                  </div>
                  <div className="category-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}