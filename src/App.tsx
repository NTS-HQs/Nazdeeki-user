import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import CollectionPage from './pages/CollectionPage';
import BookingsPage from './pages/BookingsPage';
import AddressCollectionPage from './pages/AddressCollectionPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import DineOrderPage from './pages/DineOrderPage';
import RegisterRestaurantPage from './pages/RegisterRestaurantPage';
import FeedbackPage from './pages/FeedbackPage';
import SettingsPage from './pages/SettingsPage';
import Homepage from './pages/HomePage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <Layout>
                <ProtectedRoute element={<Homepage />} />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <ProtectedRoute element={<ProfilePage />} />
              </Layout>
            }
          />
          <Route
            path="/collection"
            element={
              <Layout>
                <ProtectedRoute element={<CollectionPage />} />
              </Layout>
            }
          />
          <Route
            path="/bookings"
            element={
              <Layout>
                <ProtectedRoute element={<BookingsPage />} />
              </Layout>
            }
          />
          <Route
            path="/address-collection"
            element={
              <Layout>
                <ProtectedRoute element={<AddressCollectionPage />} />
              </Layout>
            }
          />
          <Route
            path="/order-history"
            element={
              <Layout>
                <ProtectedRoute element={<OrderHistoryPage />} />
              </Layout>
            }
          />
          <Route
            path="/dine-order"
            element={
              <Layout>
                <ProtectedRoute element={<DineOrderPage />} />
              </Layout>
            }
          />
          <Route
            path="/register-restaurant"
            element={
              <Layout>
                <ProtectedRoute element={<RegisterRestaurantPage />} />
              </Layout>
            }
          />
          <Route
            path="/feedback"
            element={
              <Layout>
                <ProtectedRoute element={<FeedbackPage />} />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <ProtectedRoute element={<SettingsPage />} />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
