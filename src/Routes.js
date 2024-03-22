// Routesapp.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import OTPVerification from './pages/auth/OTPVerification';
import PasswordReset from './pages/auth/PasswordReset';

function Routesapp() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<OTPVerification />} />
      <Route path="/reset-password" element={<PasswordReset />} />
    </Routes>
  );
}

export default Routesapp;
