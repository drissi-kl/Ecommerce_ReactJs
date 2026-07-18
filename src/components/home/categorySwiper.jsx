import React, { useEffect, useState } from 'react'
import { getCategories } from '../../services/category';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function CategorySwiper() {
  const baseRoot = '/home/category';

  const categories = [
    {name: "Beauty", image: `${baseRoot}/beauty.jpg`, items:120},
    {name: "Home Decoration", image: `${baseRoot}/homedecoration.jpg`, items:60},
    {name: "Laptops", image: `${baseRoot}/laptops.jpg`, items:200},
    {name: "Mens Watches", image: `${baseRoot}/watch.jpg`, items:110},
    {name: "Smartphones", image: `${baseRoot}/smartphones.jpg`, items:120},
    {name: "Sunglasses", image: `${baseRoot}/sunglasses.jpg`, items:90},
    {name: "Sports Accessories", image: `${baseRoot}/sportsaccessories.jpg`, items:300},
  ]
  
    

  return (
<section className="categories-section">
        <div className="categories-container">
          
          <div className="section-header">
            <div>
              <span className="sub-title">Shop by Vibe</span>
              <h2 className="section-title">Popular Categories</h2>
            </div>
            {/* <button className="view-all-link">View All Categories →</button> */}
          </div>

          <Swiper className="categories-grid"   
            modules={[Pagination, Navigation]}
            pagination = {{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation
            slidesPerView={4}
            spaceBetween={20}
            loop={true}
          >
            { categories && categories.map((category, index) => (
              <SwiperSlide key={index} className = 'category-card'>
                <img src={category.image} className='cat-card-image' alt="" />
                {/* Fallback overlay inside the cards */}
                <div className="category-overlay">
                  <div className="category-info">
                    <span className="category-count">+{category.items} items</span>
                    <h3 className="category-name">{category.name}</h3>
                  </div>
                  <div className="category-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>
  )
}
