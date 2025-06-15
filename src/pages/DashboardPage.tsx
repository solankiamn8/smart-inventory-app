import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData: number[] = [];
      const newLabels: string[] = [];
      snapshot.forEach((doc) => {
        const item = doc.data();
        newLabels.push(item.name || 'Item');
        newData.push(item.quantity || 0);
      });
      setLabels(newLabels);
      setData(newData);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📊 Dashboard</h2>
        <button
          onClick={logout}
          className="px-4 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg mb-2">Stock Levels</h3>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <Bar
            data={{
              labels,
              datasets: [
                {
                  label: 'Quantity',
                  data,
                  backgroundColor: 'rgba(59, 130, 246, 0.7)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { stepSize: 1 },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
