import { Route, Routes } from 'react-router-dom';
import OffersPage from '../pages/OffersPage';

const OffersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<OffersPage />} />
      <Route path="all-offers" element={<h1>All Offers</h1>} />
      <Route path="add-offers" element={<h1>Add Offers</h1>} />
    </Routes>
  );
};

export default OffersRoutes;
