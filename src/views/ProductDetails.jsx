import React, { useEffect, useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Minus, 
  Plus, 
  Check 
} from 'lucide-react';
import ProductCard from './ProductCard';
import './productDetails.css';
import { getProductApi } from '../services/products';
import { useParams } from 'react-router-dom';
import checkIfInCart from '../utilities/checkIfInCart';
import searchInCart from '../utilities/searchInCart';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';



const RELATED_PRODUCTS = [
  {
    id: '2',
    title: 'Minimalist Ergonomic Stand',
    price: 49.99,
    originalPrice: 65.00,
    category: 'Accessories',
    rating: 4.7,
    reviewsCount: 58,
    thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Compact Wireless Charging Pad',
    price: 34.50,
    originalPrice: 45.00,
    category: 'Electronics',
    rating: 4.6,
    reviewsCount: 89,
    thumbnail: 'https://images.unsplash.com/photo-1622445268121-ac11f17a2834?q=80&w=600&auto=format&fit=crop',
    isNew: true
  },
  {
    id: '4',
    title: 'LUXE Carrying Case Pro',
    price: 29.99,
    category: 'Accessories',
    rating: 4.9,
    reviewsCount: 31,
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'
  }
];

export default function ProductDetails() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedSuccess, setAddedSuccess] = useState(false);

    const dispatch = useDispatch();
    const {id} = useParams();
    const [product, setProduct]=useState({});
    const [productIsLoading, setProductIsLoading] = useState(false);

    // for fetch product data by id
    useEffect(()=>{
      (async () => {
          try{
              const response = await getProductApi(id);
              setProduct(response);
          }catch(error){

          }finally{
              setProductIsLoading(false);
          }
      })()


    }, [id])

    useEffect(()=>{
      if(checkIfInCart(product.id)){
        setAddedSuccess(true);
        setQuantity((prev) => searchInCart(product.id)?.quantity || 1); 
      }
    }, [product])
  

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, Math.min(quantity + delta, product.stock || 99));
    setQuantity(newQuantity);    
    if(checkIfInCart(product.id)){
      console.log('quantity', newQuantity)
      dispatch({type: "updateQuantity", payload: {productId: product.id, quantity: newQuantity}});
      const cartItems = localStorage.getItem('cartItems');
      const cartItemsObj = JSON.parse(cartItems);
      const newCartItems = cartItemsObj.map((item)=>{return (item.id == product.id)? {...item, quantity: newQuantity}: item; })
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
  };



  const handleAddToCart = () => {
    if(!checkIfInCart(product.id)){
      const data = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        thumbnail: product.thumbnail,
        stock: product.stock
      }

      dispatch({type:"addProduct", payload: data});
  
      const cartItems = localStorage.getItem('cartItems');
  
      if(cartItems){
        const cartItemsObj = JSON.parse(cartItems);
        cartItemsObj.push(data)
        localStorage.setItem('cartItems', JSON.stringify(cartItemsObj))
  
      }else{
        localStorage.setItem("cartItems", JSON.stringify([data]) )
      }
      setAddedSuccess(true);
      toast.success(`Add ${product.title} success`)
    }
  };

  return (
    <div className="product_details_container">
      {/* Top Product Overview Grid */}
      <section className="product_overview">
        {/* Left Column: Image Gallery */}
        <div className="gallery_section">
          <div className="main_image_wrapper">
            <img 
              src={product.images?.[selectedImage] || product.thumbnail} 
              alt={product.title} 
              className="main_image" 
            />
            {product.discountPercentage && <span className="details_badge">-{product.discountPercentage}% OFF</span>}
          </div>

          <div className="thumbnails_list">
            {product.images?.map((img, index) => (
              <button
                key={index}
                className={`thumb_btn ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.title} view ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Information & Purchase Actions */}
        <div className="purchase_section">
          <span className="details_category">{product.category}</span>
          <h1 className="details_title">{product.title}</h1>

          {/* Ratings & SKU */}
          <div className="details_meta">
            <div className="stars_box">
              <Star size={16} className="star_icon filled" />
              <span className="rating_score">{product.rating}</span>
              <span className="reviews_count">({product.reviewsCount} reviews)</span>
            </div>
            <span className="meta_divider">•</span>
            <span className="sku_code">SKU: {product.sku}</span>
          </div>

          {/* Pricing */}
          <div className="details_price_row">
            <span className="current_price">${Number(product.price).toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original_price">${Number(product.originalPrice).toFixed(2)}</span>
            )}
          </div>

          <p className="details_short_desc">{product.description}</p>

          {/* Stock Status */}
          <div className="stock_status">
            <span className={`status_indicator ${product.stock > 0 ? 'in_stock' : 'out_stock'}`} />
            <span className="status_text">
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="purchase_controls">
            <div className="quantity_selector">
              <button 
                onClick={() => handleQuantityChange(-1)} 
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="qty_val">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)} 
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <button 
              className={`add_to_cart_btn ${addedSuccess ? 'success' : ''}`}
              onClick={handleAddToCart}
            >
              {addedSuccess ? (
                <>
                  <Check size={18} /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add To Cart
                </>
              )}
            </button>

            <button 
              className={`wishlist_toggle_btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
              aria-label="Toggle Wishlist"
            >
              <Heart size={20} fill={isWishlisted ? '#ff3f6c' : 'none'} />
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="trust_perks">
            <div className="perk_item">
              <Truck size={20} className="perk_icon" />
              <div>
                <h4>Free Fast Delivery</h4>
                <p>On all domestic orders over $50</p>
              </div>
            </div>

            <div className="perk_item">
              <ShieldCheck size={20} className="perk_icon" />
              <div>
                <h4>2-Year Warranty</h4>
                <p>Full manufacturer coverage included</p>
              </div>
            </div>

            <div className="perk_item">
              <RotateCcw size={20} className="perk_icon" />
              <div>
                <h4>30-Day Returns</h4>
                <p>Hassle-free return policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section (Description, Specs, Reviews) */}
      <section className="tabs_section">
        <div className="tabs_header">
          <button 
            className={`tab_btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description & Features
          </button>
          <button 
            className={`tab_btn ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
          </button>
          <button 
            className={`tab_btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviewsCount})
          </button>
        </div>

        <div className="tab_content">
          {activeTab === 'description' && (
            <div className="tab_pane">
              <h3>Product Overview</h3>
              <p>{product.description}</p>
              <h4>Key Highlights</h4>
              <ul className="features_list">
                {product.features?.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={16} className="feature_check" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="tab_pane">
              <h3>Technical Specifications</h3>
              <table className="specs_table">
                <tbody>
                  {Object.entries(product.specifications || {}).map(([key, val], idx) => (
                    <tr key={idx}>
                      <td className="spec_key">{key}</td>
                      <td className="spec_val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab_pane">
              <div className="reviews_header">
                <h3>Customer Feedback</h3>
                <span className="avg_score">{product.rating} out of 5 stars</span>
              </div>
              <div className="reviews_list">
                {product.reviews?.map((rev) => (
                  <div key={rev.id} className="review_card">
                    <div className="review_meta">
                      <strong>{rev.user}</strong>
                      <span className="review_date">{rev.date}</span>
                    </div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={`star_icon ${i < rev.rating ? 'filled' : ''}`} 
                        />
                      ))}
                    </div>
                    <h5 className="review_title">{rev.title}</h5>
                    <p className="review_comment">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="related_products_section">
        <h2 className="section_title">You Might Also Like</h2>
        <div className="related_grid">
          {RELATED_PRODUCTS.map((relProduct) => (
            <ProductCard key={relProduct.id} product={relProduct} />
          ))}
        </div>
      </section>
    </div>
  );
}