import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Artist from './components/Artist';
import Albums from './components/Albums';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/artist/:id/albums" element={<Albums />} />
      </Routes>
    </Router>
  );
}

export default App;