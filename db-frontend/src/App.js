import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Mainpage from './pages/Mainpage';
import AllCollection from './pages/AllCollection';
import Add from './pages/Add';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(savedLoginState);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/AllCollection" element={<AllCollection isLoggedIn={isLoggedIn} />} />
          {isLoggedIn && <Route path="/Add" element={<Add />} />}
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
