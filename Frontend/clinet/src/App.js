import './App.css';
import React from 'react';
//import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/Login.js';
//import Signup from './components/Signup.js';
//import Contancts from './components/Contancts';

function App() {
  return (
    <div className='pages'>
      <Login />
      {/*<Signup />*/}
      {/*<Contancts />*/}
    </div>
  );
}
export default App;
