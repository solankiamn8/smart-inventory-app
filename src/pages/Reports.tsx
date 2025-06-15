import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function ReportsPage() {
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [nearExpiryCount, setNearExpiryCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = new Date();
      const expiryThreshold = 7 * 24 * 60 * 60 * 1000;

      const docs = snapshot.docs.map((doc) => doc.data());
      setTotalItems(docs.length);
      setTotalQuantity(docs.reduce((acc, curr) => acc + (curr.quantity || 0), 0));
      setLowStockCount(docs.filter((item) => item.quantity < 5).length);
      setNearExpiryCount(
        docs.filter((item) => {
          if (!item.expiryDate) return false;
          const expiry = new Date(item.expiryDate);
          return expiry.getTime() - now.getTime() <= expiryThreshold;
        }).length
      );

      setLastUpdated(now.toLocaleString());
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">📊 Inventory Reports</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Total Items</h4>
          <p className="text-3xl font-semibold text-blue-600 dark:text-blue-300">{totalItems}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Total Quantity</h4>
          <p className="text-3xl font-semibold text-green-600 dark:text-green-300">{totalQuantity}</p>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-800 rounded-xl p-5 shadow text-yellow-900 dark:text-yellow-100">
          <h4 className="text-sm">Low Stock Items</h4>
          <p className="text-3xl font-bold">{lowStockCount}</p>
        </div>

        <div className="bg-red-100 dark:bg-red-800 rounded-xl p-5 shadow text-red-900 dark:text-red-100">
          <h4 className="text-sm">Near Expiry Items</h4>
          <p className="text-3xl font-bold">{nearExpiryCount}</p>
        </div>
      </div>

      {lastUpdated && (
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-right">
          Last updated: {lastUpdated}
        </p>
      )}
    </div>
  );
}
