import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Artist from './components/Artist';
import Albums from './components/Albums';
import Callback from './components/Callback';
import AuthSpotify from './components/AuthSpotify';
import './App.css';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/artist/:id/albums" element={<Albums />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/auth/spotify" element={<AuthSpotify />} />
      </Routes>
    </Router>
  );
}

export default App;