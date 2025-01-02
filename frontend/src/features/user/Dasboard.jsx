import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../../app/slices/authSlice';
import { logout } from '../auth/asyncThunks';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

  
  useEffect(() => {

    dispatch(reset()); 
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(true));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
  <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
    <h1 className="text-3xl font-bold text-purple-700 text-center">Dashboard</h1>
    <p className="text-gray-500 text-center mt-2">Welcome back, {user.name || "guest"}!</p>

    {/* User Details Card */}
    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Full Name</p>
          <p className="text-lg font-semibold text-gray-800">{user.name || "guest"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Email Address</p>
          <p className="text-lg font-semibold text-gray-800">{user.email || "email"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Account Created</p>
          <p className="text-lg font-semibold text-gray-800">{user.createdAt}</p>
        </div>
       
      </div>
    </div>

    {/* Action Buttons */}
    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
      <button className="w-full sm:w-auto bg-purple-700 text-white py-3 px-6 rounded-lg shadow-md hover:bg-purple-800 transition">
        Edit Profile
      </button>
      <button onClick={handleLogout} className="w-full sm:w-auto bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition">
        Logout
      </button>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
