import { Route, Routes } from 'react-router-dom';
import OrdersPage from '../pages/OrdersPage';

const OrdersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<OrdersPage />} />
      <Route path="all-orders" element={<h1>All Orders</h1>} />
      <Route path="scanned-orders" element={<h1>Scanned Orders</h1>} />
      <Route path="parcel-preorder" element={<h1>Parcel / Pre-Order</h1>} />
      <Route path="home-delivery" element={<h1>Home Delivery</h1>} />
      <Route path="dine" element={<h1>Dine</h1>} />
      <Route path="event-booking" element={<h1>Party / Event Booking</h1>} />
      <Route path="waiters-order" element={<h1>Waiters Order</h1>} />
    </Routes>
  );
};

export default OrdersRoutes;
