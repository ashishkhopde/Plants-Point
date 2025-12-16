import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Plants from './pages/Plants';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

export default function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/plants' element={<Plants />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/*" element={<h2>
          Page Not Found
        </h2>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}
