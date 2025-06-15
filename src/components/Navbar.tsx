import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const linkClass = (path: string) =>
    `px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
      location.pathname === path ? 'font-bold underline' : ''
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow p-4 flex items-center justify-between">
      <div className="text-xl font-semibold">SmartInventory</div>
      <div className="flex gap-4 items-center">
        <Link to="/" className={linkClass('/')}>
          Dashboard
        </Link>
        <Link to="/inventory" className={linkClass('/inventory')}>
          Inventory
        </Link>
        <Link to="/add-item" className={linkClass('/add-item')}>
          ➕ Add Item
        </Link>
        <button onClick={handleLogout} className="text-red-500">
          Logout
        </button>
        <button onClick={() => setDark(!dark)} className="ml-2">
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
