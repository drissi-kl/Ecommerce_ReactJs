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
import { Toaster } from 'react-hot-toast';




function App() {
  const store = createStore(reducer)

  return (<main>
    <Provider store={store}>
    <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#111111',
            borderRadius: '14px',
            border: '1px solid #f0f0f2',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.08)',
            padding: '12px 18px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
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
