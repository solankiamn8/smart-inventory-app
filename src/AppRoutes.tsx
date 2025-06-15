import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ScanPage from '@/pages/ScanPage';
import AddItemPage from '@/pages/AddItemPage';
import EditItemPage from '@/pages/EditItemPage';
import AlertDashboard from '@/pages/AlertDashboard'; // ✅ Make sure this has a default export

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scan" element={<ScanPage />} />
      <Route path="/add-item" element={<AddItemPage />} />
      <Route path="/edit-item/:id" element={<EditItemPage />} />
      <Route path="/alerts" element={<AlertDashboard />} />
    </Routes>
  </Router>
);

export default AppRoutes;
