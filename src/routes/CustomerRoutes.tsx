import { Route, Routes } from 'react-router-dom';
import CustomerPage from '../pages/CustomerPage';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<CustomerPage />} />
      <Route path="reviews" element={<h1>Reviews</h1>} />
      <Route path="feedback" element={<h1>Feedback</h1>} />
    </Routes>
  );
};

export default CustomerRoutes;
