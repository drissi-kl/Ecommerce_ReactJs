import React from 'react'
import "./home.css";
import Hero from '../components/home/hero';
import CategorySwiper from '../components/home/categorySwiper';
import Review from '../components/home/review';

export default function Home() {
  

  return (
    <main className='home'>
      {/* Hero Section */}
      <Hero />

      {/* --- New Categories Section --- */}
      <CategorySwiper />

      {/* Reviews Section */}
      <Review />
    </main>
  )
}