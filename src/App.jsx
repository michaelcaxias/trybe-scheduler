import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/privacy-policy" element={ <PrivacyPolicy /> } />
        <Route path="/terms-and-conditions" element={ <TermsAndConditions /> } />
      </Routes>
    </Router>
  );
}
