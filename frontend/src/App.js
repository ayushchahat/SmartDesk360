import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import BillingPage from './pages/BillingPage';
import ReturnPage from './pages/ReturnPage';
import Navbar from './components/Layout/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/returns" element={<ReturnPage />} />
      </Routes>
    </Router>
  );
}

export default App;
