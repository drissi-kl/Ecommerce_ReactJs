import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';


export default function Hero() {
  return (
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
                <Swiper 
                    className='hero_swiper'
                    modules={[Navigation, Pagination]}

                    navigation={true}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true
                    }}

                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide className='hero_swiper_slide'>
                        <img src="/home/hero_slice1.jpg" alt="" className='hero-img' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/home/hero_slice2.jpg" alt="" className='hero-img' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/home/hero_slice3.jpg" alt="" className='hero-img' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/home/hero_slice4.jpg" alt="" className='hero-img' />
                    </SwiperSlide>
                </Swiper>
              </div>
              {/* <div className="decorative-blob"></div> */}
            </div>
          </div>
        </div>
    </section>
  )
}
