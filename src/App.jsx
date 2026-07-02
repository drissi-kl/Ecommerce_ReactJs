import { useState } from 'react'
import Home from './views/home'
import "./App.css";
import Navbar from './components/header/navbar';
import { Route, RouterProvider, Routes } from 'react-router-dom';

function App() {

  return (<main>

    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />

    

    </Routes>


  </main>)
}

export default App
