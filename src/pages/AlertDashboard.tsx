import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  expiryDate?: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

export default function AlertDashboard() {
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([]);
  const [expiringItems, setExpiringItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(now.getDate() + 7);

      const lowStock: InventoryItem[] = [];
      const expiring: InventoryItem[] = [];

      snapshot.docs.forEach((doc) => {
        const data = doc.data() as InventoryItem;
        const expiryDate = data.expiryDate
          ? new Date(data.expiryDate.seconds * 1000)
          : null;

        // Check low stock
        if (data.quantity <= 5) {
          lowStock.push({ ...data, id: doc.id });
        }

        // Check expiry
        if (expiryDate) {
          if (expiryDate < nextWeek) {
            expiring.push({ ...data, id: doc.id });
          }
        }
      });

      setLowStockItems(lowStock);
      setExpiringItems(expiring);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">⚠️ Inventory Alerts</h2>

      {/* Low Stock Section */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-red-600">Low Stock Items (≤ 5)</h3>
        {lowStockItems.length > 0 ? (
          <ul className="space-y-2">
            {lowStockItems.map((item) => (
              <li key={item.id} className="bg-red-100 dark:bg-red-900 p-3 rounded">
                {item.name} — Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No low stock items found.</p>
        )}
      </section>

      {/* Expiry Section */}
      <section>
        <h3 className="text-lg font-semibold mb-2 text-yellow-600">
          Expiring Soon (within 7 days)
        </h3>
        {expiringItems.length > 0 ? (
          <ul className="space-y-2">
            {expiringItems.map((item) => (
              <li key={item.id} className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded">
                {item.name} — Expires on:{' '}
                {item.expiryDate
                  ? new Date(item.expiryDate.seconds * 1000).toLocaleDateString()
                  : 'N/A'}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No expiring items.</p>
        )}
      </section>
    </div>
  );
}
