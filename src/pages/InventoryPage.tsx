import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category?: string;
  expiryDate?: string;
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: InventoryItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as InventoryItem[];
      setItems(data);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteDoc(doc(db, 'inventory', id));
    }
  };

  const today = new Date();
  const nearExpiryThreshold = 7 * 24 * 60 * 60 * 1000;

  const lowStockItems = items.filter((item) => item.quantity < 5);
  const nearExpiryItems = items.filter((item) => {
    if (!item.expiryDate) return false;
    const expiry = new Date(item.expiryDate);
    return expiry.getTime() - today.getTime() <= nearExpiryThreshold;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Inventory</h2>

      {/* Alerts Section */}
      <div className="space-y-3 mb-4">
        {lowStockItems.length > 0 && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded">
            ⚠️ Low Stock: {lowStockItems.length} item(s) below threshold.
          </div>
        )}
        {nearExpiryItems.length > 0 && (
          <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded">
            ⏳ Expiry Alert: {nearExpiryItems.length} item(s) expiring soon.
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-200 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Category</th>
              <th className="p-3">Expiry</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">{item.category || '-'}</td>
                <td className="p-3">{item.expiryDate || '-'}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => navigate(`/edit-item/${item.id}`)}
                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
