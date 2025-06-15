import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ScanPage from '@/pages/ScanPage';
// import other pages...

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scan" element={<ScanPage />} />
      {/* Add other routes as needed */}
    </Routes>
  </Router>
);

export default AppRoutes;
