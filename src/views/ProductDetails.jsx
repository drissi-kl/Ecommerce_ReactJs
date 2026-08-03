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

// Mock data to demonstrate standalone functionality
const MOCK_PRODUCT = {
  id: '1',
  title: 'LUXESound Pro Wireless Noise-Canceling Headphones',
  price: 249.99,
  originalPrice: 299.99,
  category: 'Audio & Electronics',
  rating: 4.8,
  reviewsCount: 142,
  stock: 12,
  sku: 'LX-AUD-2026-X',
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop'
  ],
  description: 'Experience pure audio immersion with active noise cancellation, custom-tuned 40mm drivers, and up to 40 hours of uninterrupted playback. Engineered with soft memory foam ear cushions for all-day luxury comfort.',
  features: [
    'Advanced Active Noise Cancellation (ANC)',
    '40-hour battery life with Fast Charging (10 min charge = 5 hours play)',
    'Ultra-soft memory foam ear cushions & lightweight aluminum frame',
    'Bluetooth 5.3 with multipoint dual-device pairing'
  ],
  specifications: {
    'Driver Size': '40 mm Dynamic',
    'Frequency Response': '20Hz - 20kHz',
    'Battery Life': 'Up to 40 Hours (ANC On)',
    'Connectivity': 'Bluetooth 5.3 / 3.5mm Aux',
    'Weight': '250 g',
    'Warranty': '2-Year International'
  },
  reviews: [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      date: 'July 14, 2026',
      title: 'Best noise cancellation I have ever owned',
      comment: 'The sound quality is crisp and clear, and the ANC completely blocks out office noise. Super comfortable during long work sessions.'
    },
    {
      id: 2,
      user: 'David K.',
      rating: 4,
      date: 'June 28, 2026',
      title: 'Premium build quality',
      comment: 'Materials feel premium in hand. Battery life easily lasts me through a full week of commuting and workouts.'
    }
  ]
};

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

    const {id} = useParams();
    const [product, setProduct]=useState({});
    const [productIsLoading, setProductIsLoading] = useState(false);

    useEffect(()=>{
      (async () => {
          try{
              const response = await getProductApi(id);
              setProduct(response)
          }catch(error){

          }finally{
              setProductIsLoading(false);
          }
      })()


    }, [id])




  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.stock || 99)));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} item(s) of ID ${product.id} to cart.`);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
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
            {discount && <span className="details_badge">-{discount}% OFF</span>}
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