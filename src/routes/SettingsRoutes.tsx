import { Route, Routes } from 'react-router-dom';
import SettingsPage from '../pages/SettingsPage';

const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<SettingsPage />} />
    </Routes>
  );
};

export default SettingsRoutes;
