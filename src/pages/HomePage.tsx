import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">SmartInventory</h1>
      <p className="mb-6 text-gray-600">Welcome! Manage your inventory smartly.</p>

      <div className="space-x-4">
        <Link
          to="/scan"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Scan QR
        </Link>
        {/* Add more buttons for other pages later */}
      </div>
    </div>
  );
};

export default HomePage;
