import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="store-footer">
      <div className="footer-container">
        
        {/* Top Segment: Brand & Newsletter */}
        <div className="footer-top">
          <div className="footer-brand-zone">
            <h2 className="footer-logo">STORE<span>.</span></h2>
            <p className="footer-tagline">
              Elevating everyday essentials with a modern, premium aesthetic. Crafted for contemporary living.
            </p>
          </div>
          
          <div className="footer-newsletter">
            <h4 className="footer-title">Join Our Newsletter</h4>
            <p className="newsletter-text">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Middle Segment: Navigation Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4 className="footer-title">Shop</h4>
            <ul className="footer-links">
              <li><a href="#new">New Arrivals</a></li>
              <li><a href="#best">Best Sellers</a></li>
              <li><a href="#clothing">Clothing & Apparel</a></li>
              <li><a href="#accessories">Accessories</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#shipping">Shipping & Delivery</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#faq">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">Our Story</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
              <li><a href="#stores">Find a Store</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links contact-info">
              <li><span>Email:</span> support@store.com</li>
              <li><span>Phone:</span> +1 (555) 019-2834</li>
              <li><span>Hours:</span> Mon - Fri: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Bottom Segment: Copyright & Payments */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} STORE Inc. All rights reserved.
          </p>
          <div className="footer-payments">
            <span className="payment-icon">Visa</span>
            <span className="payment-icon">Mastercard</span>
            <span className="payment-icon">Apple Pay</span>
            <span className="payment-icon">Stripe</span>
          </div>
        </div>

      </div>
    </footer>
  );
}