import React, { useEffect } from 'react'
import "./home.css";
import Hero from '../components/home/hero';
import CategorySwiper from '../components/home/categorySwiper';
import Review from '../components/home/review';
import { toTop } from '../utilities/toTop';

export default function Home() {

  useEffect(()=>{
    toTop();
  },[])

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