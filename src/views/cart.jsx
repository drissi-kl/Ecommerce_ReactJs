import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './cart.css';

// Sample initial data structure (replace with your Context/Redux state)
const initialCartItems = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    quantity: 2,
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    price: 19.99,
    quantity: 1,
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // --- Handlers ---
  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // --- Calculations ---
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const grandTotal = subtotal + shippingFee;

  return (
    <main className="cart_container">
      <h1 className="cart_heading">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="cart_layout">
          {/* Left: Cart Items List */}
          <section className="cart_items_wrapper">
            <div className="cart_header_actions">
              <span className="cart_count_text">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items in your cart
              </span>
              <button type="button" className="clear_cart_btn" onClick={handleClearCart}>
                Clear All
              </button>
            </div>

            <div className="cart_list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart_item">
                  <img src={item.thumbnail} alt={item.title} className="cart_item_img" />
                  
                  <div className="cart_item_details">
                    <Link to={`/products/${item.id}`} className="cart_item_title">
                      {item.title}
                    </Link>
                    <span className="cart_item_price_single">${item.price.toFixed(2)} each</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="cart_item_quantity">
                    <button 
                      type="button" 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      type="button" 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price & Delete */}
                  <div className="cart_item_total">
                    <span className="cart_item_price_total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      type="button" 
                      className="remove_item_btn" 
                      onClick={() => handleRemoveItem(item.id)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/" className="continue_shopping_link">
              ← Continue Shopping
            </Link>
          </section>

          {/* Right: Order Summary */}
          <aside className="order_summary">
            <h2>Order Summary</h2>
            
            <div className="summary_row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary_row">
              <span>Estimated Shipping</span>
              <span>{shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}</span>
            </div>

            {shippingFee > 0 && (
              <p className="free_shipping_notice">
                Add ${(50 - subtotal).toFixed(2)} more for <strong>FREE Shipping</strong>!
              </p>
            )}

            <hr className="summary_divider" />

            <div className="summary_row total_row">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <button type="button" className="checkout_btn">
              Proceed to Checkout
            </button>
          </aside>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="empty_cart">
          <div className="empty_cart_icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="shop_now_btn">
            Start Shopping
          </Link>
        </div>
      )}
    </main>
  );
}