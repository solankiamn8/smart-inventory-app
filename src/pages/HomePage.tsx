import { Link } from 'react-router-dom';
import { QrCode, Plus, Bell, BarChart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-center space-y-6">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">SmartInventory</h1>
        <p className="text-gray-600 dark:text-gray-300">Efficiently manage your stock with ease</p>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/scan"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <QrCode className="w-5 h-5" />
            <span>Scan QR</span>
          </Link>
          <Link
            to="/add-item"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </Link>
          <Link
            to="/alerts"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Bell className="w-5 h-5" />
            <span>Alerts</span>
          </Link>
          <Link
            to="/reports"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <BarChart className="w-5 h-5" />
            <span>Reports</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
