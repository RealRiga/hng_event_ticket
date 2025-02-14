import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './home';
import UsersDetails from './usersDetails';
import Ticket from './ticket';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users-details" element={<UsersDetails />} />
        <Route path="/tickets" element={<Ticket />} />

      </Routes>
    </Router>
  </StrictMode>
);
