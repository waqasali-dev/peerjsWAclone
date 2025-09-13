import React from 'react';
import './App.css';
import { AuthProvider } from './context/Authcontext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Chatapp from './components/Chatapp';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Chatapp/>} />
          <Route path="/login" element= {<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
