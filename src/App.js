import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import TradeForm from './components/TradeForm';
import PortfolioTable from './components/PortfolioTable';
import HistoryList from './components/HistoryList';

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>TradeX – Live Crypto Trading</title>
        <meta
          name="description"
          content="TradeX – Real-time crypto exchange. Live prices, advanced charts, zero-risk."
        />
      </Helmet>
      <Navbar />
      <LoginModal />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trade" element={<TradeForm />} />
          <Route path="/portfolio" element={<PortfolioTable />} />
          <Route path="/history" element={<HistoryList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
