import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CriarEnquete from './pages/CriarEnquete';
import VisualizarEnquete from './pages/VisualizarEnquete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {<Route path="/dashboard" element={<Dashboard />} />}
        {<Route path="/criar-enquete" element={<CriarEnquete />} />}
        {<Route path="/visualizar-enquete/:id" element={<VisualizarEnquete />} />}
      </Routes>
    </Router>
  );
}

export default App;
