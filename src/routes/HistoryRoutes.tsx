import { Route, Routes } from 'react-router-dom';
import HistoryPage from '../pages/HistoryPage';

const HistoryRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<HistoryPage />} />
      <Route path="order-history" element={<h1>Order History</h1>} />
      <Route path="payment-history" element={<h1>Payment History</h1>} />
    </Routes>
  );
};

export default HistoryRoutes;
