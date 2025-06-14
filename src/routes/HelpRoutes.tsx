import { Route, Routes } from 'react-router-dom';
import HelpPage from '../pages/HelpPage';

const HelpRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<HelpPage />} />
      <Route path="learning-videos" element={<h1>Learning Videos</h1>} />
      <Route path="customer-care" element={<h1>Customer Care</h1>} />
      <Route path="app-tutorial" element={<h1>App Tutorial</h1>} />
      <Route path="donate-food" element={<h1>Donate Food</h1>} />
    </Routes>
  );
};

export default HelpRoutes;
