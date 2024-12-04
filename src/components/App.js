import React, {useEffect, useState} from 'react';

import Header from './Header';
import Footer from './Footer';
import Component404 from './Component404';
import FormPage from './FormPage';
import * as Helper from '../Helper'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./App.css"

function App() {

  return (
    
    <Router>
      <div className="App">
        <Header></Header>
        
        <div id="mse" className=''>
          <Routes>
            <Route path="/" element={<FormPage/>} />
            <Route path="/:token" element={<FormPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
