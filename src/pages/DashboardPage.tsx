import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  useEffect(() => { if (!user) nav('/login'); }, [user]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    return onSnapshot(q, snap => {
      const counts = snap.docs.map(d => d.data().quantity as number);
      setData(counts);
    });
  }, []);

  return user ? (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Dashboard</h2>
        <button onClick={logout} className="text-red-500">Logout</button>
      </div>
      <section className="mt-6">
        <h3 className="mb-2">Stock Levels</h3>
        <Bar data={{ labels: data.map((_, i) => `#${i+1}`), datasets: [{ label: 'Qty', data, backgroundColor: 'skyblue' }] }} />
      </section>
    </div>
  ) : null;
}
