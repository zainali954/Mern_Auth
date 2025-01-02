import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Routes, Route, useNavigate, Outlet } from "react-router-dom"; // Ensure Outlet is imported
import { logout } from "../auth/asyncThunks";
import Login from "../auth/Login";

// AdminPanel component
const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout(true));
    navigate("/login");  // Redirect to login page after logout
  };

  const [isMenuHidden, setIsMenuHidden] = useState(true); // Track menu visibility state

  const toggleMenu = () => {
    setIsMenuHidden(prevState => !prevState); // Toggle the visibility state
  };


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`transition-all duration-1000 fixed md:block ${isMenuHidden ? 'hidden' : ''} 
                    bg-white shadow-lg p-4 w-full sm:w-64 h-screen`}>
        <div className="flex">
          <button onClick={toggleMenu} className="ml-auto  md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </button>
        </div>

        <div className="p-4 text-2xl font-bold text-center">Admin Panel</div>
        <nav className="mt-4">
          <ul>
            <li className="px-4 py-2 hover:bg-purple-800">
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="px-4 py-2 hover:bg-purple-800">
              <Link to="/admin/dashboard/users">Users</Link>
            </li>
            <li className="px-4 py-2 hover:bg-purple-800">
              <Link to="/admin/dashboard/settings">Settings</Link>
            </li>
            <li className="px-4 py-2 hover:bg-purple-800">
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow mb-4 md:ml-64">
        <nav className="bg-white shadow-lg p-4">
          <div className="flex justify-between items-center">
            {/* Logo or Title */}
            <div className=" text-xl font-bold">
              <Link to="/">Admin Panel</Link>
            </div>

            {/* Links */}
            <div className="flex">
              <button onClick={toggleMenu} className="ml-auto text-white md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 6l16 0" />
                  <path d="M4 12l16 0" />
                  <path d="M4 18l16 0" />
                </svg>
              </button>
            </div>

          </div>
        </nav>
        <div className="p-4">
          <Routes>
            {/* Define the main routes */}
            <Route path="/" element={<Dashboard toggleMenu={toggleMenu} />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />

            {/* Placeholder for nested routes */}
            {/* <Route path="admin/dashboard/*" element={<Outlet />} /> */}
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({  }) => {
  const { user } = useSelector((state)=>state.auth)

  return (
    <div className="h-screen bg-yellow-500 w-full p-4">

      <div className="h-64 bg-orange-500">
       { user && (
        <h1 className="font-xl font-white font-mono">Hello, {user.name}</h1>
       )}
      </div>
    </div>
  );
};

// User Management Component
const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Sam Wilson", email: "sam@example.com", role: "Moderator" },
  ]);

  return (
    <div className="h-screen w-full bg-green-500"></div>
  );
};

// Settings Component
const Settings = () => {
  return (
    <div className="h-screen w-full bg-blue-500"></div>

  );
};

export default AdminPanel;

// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Users from './Users';
// import Settings from './Settings';
// import Sidebar from '../../components/Sidebar';


// const AdminPanel = () => {
//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="content">
//         {/* <Routes>
//           <Route path="/admin/dashboard/users" element={<Users />} />
//           <Route path="/admin/dashboard/settings" element={<Settings />} />
//         </Routes> */}
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
