import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { query, collection, onSnapshot } from 'firebase/firestore';

export default function InventoryPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    return onSnapshot(q, snap => setItems(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);
  if (!user) return null;
  return (
    <div className="p-4">
      <h2 className="text-2xl">Inventory</h2>
      <ul className="mt-4 space-y-2">
        {items.map(i => (
          <li key={i.id} className="p-2 bg-white dark:bg-gray-800 rounded shadow">
            <div>{i.name} — Qty: {i.quantity}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
