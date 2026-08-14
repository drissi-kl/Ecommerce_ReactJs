import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './cart.css';
import { useDispatch } from 'react-redux';
import searchInCart from '../utilities/searchInCart';
import axios from 'axios';
import ConfirmFrom from '../components/cart/confirmFrom';
import toast from 'react-hot-toast';
import { toTop } from '../utilities/toTop';


export default function Cart() {
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    // get products form local storage, ci mean cart items
    const ci = localStorage.getItem('cartItems');
    setCartItems((prev) => ci ? JSON.parse(ci) : []);
    toTop()
  }, []);


  // --- Handlers ---
  const handleQuantityChange = (id, delta) => {
    const product = searchInCart(id);
    const newQuantity = Math.max(1, Math.min(product.quantity + delta, product.stock || 99));
    const newItems = cartItems.map((item) => {return item.id == id? {...item, quantity: newQuantity} : item  })

    // for synchronization updating that happened in cart with locat state
    setCartItems(newItems);
    // for synchronization updating that happened in cart with localstorage
    localStorage.setItem("cartItems" ,JSON.stringify(newItems));
    // for synchronization updating that happened in cart with state management
    dispatch({type: "updateQuantity", payload: {productId: id, quantity: newQuantity}});
  };

  const handleRemoveItem = (id) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    dispatch({type: "removeProduct", payload: id});
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.clear("cartItems");
    dispatch({type:"clearProducts"});
  };

  // --- Calculations ---
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const grandTotal = subtotal + shippingFee;



  const [confirmShipping, setConfirmShipping] = useState(false);
  const productsName = useMemo(()=>{
    const np = cartItems?.map((item)=>{return item.title});
    return np.join(", ");
  }, [cartItems]);

  const handleConfirm = () => {
    handleClearCart();
    setConfirmShipping(false);
  }


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
                  <div className="cart_item_quantity disabled_button">
                    <button 
                      type="button" 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      aria-label="Decrease quantity"
                      disabled = {item.quantity == 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      type="button" 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      aria-label="Increase quantity"
                      disabled={item.quantity >= item.stock}
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

            <button type="button" className="checkout_btn" onClick={()=>{setConfirmShipping(true);}}>
              confirm
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


      {
        confirmShipping && <ConfirmFrom data={productsName} confirmed={()=>handleConfirm()} closeConfirm={()=>setConfirmShipping(false)} />
      }


    </main>
  );
}