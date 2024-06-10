// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FarmerOrderHistory from './components/FarmerHistory';
import Login from './components/Login';
import './App.css';
import BuyerOrderHistory from './components/BuyerHistory';
import ExtensionOfficerDashboard from './components/ExtOfficer';
import UserVisits from './components/UserVisits';
import CropData from './components/CropData';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setToken={handleSetToken} />} />
          <Route path="/uservisits" element={<UserVisits setToken={handleSetToken} />} />
          <Route path="/orderstats" element={<CropData setToken={handleSetToken} />} />
          <Route path="/farmer/my-orders" element={<FarmerOrderHistory token={token} />} />
          <Route path="/buyer/my-orders" element={<BuyerOrderHistory token={token} />} />
          <Route path="/my-reports" element={<ExtensionOfficerDashboard token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



