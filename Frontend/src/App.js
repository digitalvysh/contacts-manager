import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Contancts from './components/Contancts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Contancts' element={<Contancts />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;