import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './features/auth/Login';
import Dashboard from './features/user/Dasboard';
import Signup from './features/auth/Signup';
import VerifyEmail from './features/auth/VerifyEmail';
import ForgotPassword from './features/auth/ForgotPassword';
import ResetPassword from './features/auth/ResetPassword';
import PrivateRoute from './features/auth/PrivateRoutes';
import Loader from './components/UniversalLoader';
import Home from './pages/Home';
import NotFound from './pages/404';
import AdminPanel from './features/admin/AdminDashboard';
import { setNavigate } from './utils/NavigationService';


const App = () => {
  const { isLoading } = useSelector((state) => state.auth); // Global loading state
  const navigate = useNavigate();

    useEffect(() => {
        setNavigate(navigate); // Pass the navigate function to the middleware
    }, [navigate]);

  return (
    <>
      <Toaster />
      {isLoading && <Loader />}
      {/* <Router> */}
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/verify" element={<VerifyEmail />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Route */}
          <Route
            path="/verify"
            element={
              <PrivateRoute requireVerification>
                <VerifyEmail />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute allowedRoles={['user']}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard/*"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminPanel /> 
              </PrivateRoute>
            }
          />
        </Routes>
      {/* </Router> */}
    </>
  );
};

export default App;
