import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Hall from './pages/Hall/Hall';
import Buying from './pages/Buying/Buying';
import Main from './pages/Main/Main';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path=":date/seance/:seanceId/" element={<Hall />} />
        <Route path="/payment" element={<Buying name={'payment'} />} />
        <Route path="/ticket" element={<Buying name={'ticket'} />} />
        <Route path="/:date" element={<Main />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </Router>
  );
}
