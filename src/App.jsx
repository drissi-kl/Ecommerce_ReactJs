import { useState } from 'react'
import Home from './views/home'
import "./App.css";
import Navbar from './components/header/navbar';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import Footer from './components/footer/footer';
import Products from './views/products';

function App() {

  return (<main>

    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/category/:category' element={<Products />} />

    

    </Routes>

    <Footer />

  </main>)
}

export default App
