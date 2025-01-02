import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './asyncThunks';
import { reset } from '../../app/slices/authSlice';
import useGoogleAuth from '../../hooks/useGoogleAuth';

const Login = () => {
  const { loginWithGoogle } = useGoogleAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && user?.isVerified) {
      navigate('/admin/dashboard');
    }
    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-purple-700 text-center">Welcome Back</h2>
          <p className="text-gray-500 text-center mt-2">Login to continue</p>

          <button onClick={loginWithGoogle} className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-3 mt-6 rounded-md hover:bg-gray-200 transition">
            <img
              src="../google-logo-search-new-svgrepo-com.svg"
              alt="Google logo"
              className="w-6 h-6 mr-3"
            />
            Continue with Google
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Email Address"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div className="text-right mb-6">
              <Link to="/forgot-password" className="text-sm text-purple-700 hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-md transition ${isLoading ? 'bg-purple-500 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800 text-white'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4">
            Don’t have an account? <Link to="/signup" className="text-purple-700 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

    </>

  );
};

export default Login;
