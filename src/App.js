import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignUpAdmin from './components/SignUpAdmin';
import Home from './components/Home';
import Login from './components/Login';
import AdminLogin from './components/LoginAdmin';
import HomeAdmin from './components/HomeAdmin';
import About from './components/About';
import CreateItem from './components/CreateItem';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/signupadmin" element={<SignUpAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginadmin" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/AdminHome" element={<HomeAdmin />} />
        <Route path="/About" element={<About />} />
        <Route path="/create" element={<CreateItem />} />
      </Routes>
    </Router>
  );
}

export default App;
