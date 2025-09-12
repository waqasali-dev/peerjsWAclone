import React from 'react';
import './App.css';
import Button from './components/button';
import { AuthProvider } from './context/Authcontext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Button label="Click Me to logout" />} />
          <Route path="/login" element= {<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
