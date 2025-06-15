import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ScanPage from '@/pages/ScanPage';
import AddItemPage from '@/pages/AddItemPage'; // at the top
import EditItemPage from '@/pages/EditItemPage';
import AlertDashboard from '@/pages/AlertDashboard';


// import other pages...

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scan" element={<ScanPage />} />
      <Route path="/add-item" element={<AddItemPage />} />
      <Route path="/edit-item/:id" element={<EditItemPage />} />
      <Route path="/alerts" element={<AlertDashboard />} />


      {/* Add other routes as needed */}
    </Routes>
  </Router>
);

export default AppRoutes;
