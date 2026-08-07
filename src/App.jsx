import { useState } from 'react'
import Home from './views/home'
import "./App.css";
import Navbar from './components/header/navbar';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import Footer from './components/footer/footer';
import Products from './views/products';
import ContactUs from './views/contactUs';
import AboutUs from './views/aboutUs';
import ProductDetails from './views/ProductDetails';
import Cart from './views/cart';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './store/reducer';




function App() {
  const store = createStore(reducer)

  return (<main>
    <Provider store={store}>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:id' element={<ProductDetails />} />
      <Route path='/products/category/:category' element={<Products />} />
      <Route path='aboutUs' element={<AboutUs />} />
      <Route path='/contactUs' element={<ContactUs />} />
      <Route path='/cart' element={<Cart />} />

    

    </Routes>

    <Footer />
    </Provider>
  </main>)
}

export default App
