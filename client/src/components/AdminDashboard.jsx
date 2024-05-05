import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className={`w-64 h-screen bg-gray-800 fixed top-0 left-0 overflow-y-auto pt-20 ${isSidebarOpen ? '' : 'hidden'}`}>
      <ul className="list-none p-0">
        <li className="mb-4">
          <Link to="/user" className="block px-4 py-2 text-white hover:bg-gray-700">User</Link>
        </li>
        <li className="mb-4">
          <Link to="/upload" className="block px-4 py-2 text-white hover:bg-gray-700">Courses</Link>
        </li>
        <li className="mb-4">
          <Link to="/getAllCourses" className="block px-4 py-2 text-white hover:bg-gray-700">Payment</Link>
        </li>
        <li className="mb-4">
          <Link to="/learner" className="block px-4 py-2 text-white hover:bg-gray-700">Learner</Link>
        </li>
        <li className="mt-auto mb-4">
          <Link to="/logout" className="block px-4 py-2 text-white hover:bg-gray-700">Logout</Link>
        </li>
      </ul>
      {/* Three-line button to toggle sidebar */}
      <button
        className="absolute top-4 right-4 text-white"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isSidebarOpen ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'}
          />
        </svg>
      </button>
    </nav>
  );
};

export default AdminDashboard;
