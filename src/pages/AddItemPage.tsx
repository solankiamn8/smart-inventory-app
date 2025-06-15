import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddItemPage() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');


  const navigate = useNavigate();
  const { id } = useParams(); // <-- Check for edit mode

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        const docRef = doc(db, 'inventory', id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setName(data.name);
          setQuantity(data.quantity);
          setCategory(data.category || '');
          if (data.expiryDate?.seconds) {
            const date = new Date(data.expiryDate.seconds * 1000);
            setExpiryDate(date.toISOString().split('T')[0]);
          }
        }
      };
      fetchItem();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || quantity <= 0) {
      alert('Please enter valid item details.');
      return;
    }

    setLoading(true);

    try {
      const itemData = {
        name,
        quantity,
        category,
        expiryDate: expiryDate ? Timestamp.fromDate(new Date(expiryDate)) : null,
      };

      if (id) {
        await updateDoc(doc(db, 'inventory', id), itemData);
      } else {
        await addDoc(collection(db, 'inventory'), {
          ...itemData,
          createdAt: Timestamp.now(),
        });
      }

      navigate('/inventory');
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Failed to save item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-xl mb-4">{id ? 'Edit' : 'Add'} Inventory Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border rounded"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <input
          type="date"
          placeholder="Expiry Date"
          className="w-full p-2 border rounded"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Saving...' : id ? 'Update Item' : 'Add Item'}
        </button>
      </form>
    </div>
  );
}
