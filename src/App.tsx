import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrdersRoutes from './routes/OrdersRoutes';
import ProductsRoutes from './routes/ProductsRoutes';
import OffersRoutes from './routes/OffersRoutes';
import HistoryRoutes from './routes/HistoryRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import HelpRoutes from './routes/HelpRoutes';
import SettingsRoutes from './routes/SettingsRoutes';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute element={<DashboardPage />} />} />
          <Route path="/orders/*" element={<ProtectedRoute element={<OrdersRoutes />} />} />
          <Route path="/products/*" element={<ProtectedRoute element={<ProductsRoutes />} />} />
          <Route path="/offers/*" element={<ProtectedRoute element={<OffersRoutes />} />} />
          <Route path="/history/*" element={<ProtectedRoute element={<HistoryRoutes />} />} />
          <Route path="/customer/*" element={<ProtectedRoute element={<CustomerRoutes />} />} />
          <Route path="/help/*" element={<ProtectedRoute element={<HelpRoutes />} />} />
          <Route path="/settings/*" element={<ProtectedRoute element={<SettingsRoutes />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
