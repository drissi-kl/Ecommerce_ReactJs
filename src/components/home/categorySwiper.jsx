import React, { useEffect, useState } from 'react'
import { getCategories } from '../../services/category';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'react-bootstrap';

export default function CategorySwiper() {


  const [categories, setCategories] = useState(null);
  console.log('category compononet');

  useEffect(()=>{
    (async ()=>{
      const response = await getCategories();
      console.log('response', response);
      if(response){
        setCategories(response.slice(0,4));
      }
    })()

  }, [])
    

  return (
<section className="categories-section">
        <div className="categories-container">
          
          <div className="section-header">
            <div>
              <span className="sub-title">Shop by Vibe</span>
              <h2 className="section-title">Popular Categories</h2>
            </div>
            <button className="view-all-link">View All Categories →</button>
          </div>

          <Swiper className="categories-grid"   
            modules={[Pagination, ]}
            pagination = {{
              clickable: true
            }}
            slidesPerView={4}
            spaceBetween={20}

          >
            { categories && categories.map((category, index) => (
              <SwiperSlide key={index} className = 'cat-card'>
                <img src={`category.`} alt="" />
                {/* Fallback overlay inside the cards */}
                <div className="category-overlay">
                  <div className="category-info">
                    <span className="category-count">10</span>
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
