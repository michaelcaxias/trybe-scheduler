import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scheduler from './pages/Scheduler/Scheduler';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';
import PrivateRoute from './context/PrivateRoute';

import './App.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/scheduler" element={ <PrivateRoute><Scheduler /></PrivateRoute> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/privacy-policy" element={ <PrivacyPolicy /> } />
        <Route path="/terms-and-conditions" element={ <TermsAndConditions /> } />
      </Routes>
    </Router>
  );
}
