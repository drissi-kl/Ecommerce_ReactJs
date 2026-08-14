import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./relatedProducts.css";

import { getProductsApi } from "../../services/products";

export default function RelatedProducts({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsApi(10, 0, category);
        setProducts(response.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <section className="related_products_section">
      <h2 className="section_title">You Might Also Like</h2>
      
      <Swiper
        className="products_swiper"
        spaceBetween={20}
        slidesPerView={3}
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        
      >
        {products.map((relProduct) => (
          <SwiperSlide key={relProduct.id} className="product_slide">
            <div className="product_card">
              <img src={relProduct.thumbnail} alt={relProduct.title} />
              <span>{relProduct.category}</span>
              <h3>{relProduct.title}</h3>
              <p>${relProduct.price}</p>
              <button>Add to Cart</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}