import { Route, Routes } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ProductsPage />} />
      <Route path="all-products" element={<h1>All Products</h1>} />
      <Route path="add-products" element={<h1>Add Products</h1>} />
      <Route path="unavailable" element={<h1>Unavailable</h1>} />
      <Route path="deleted-products" element={<h1>Deleted Products</h1>} />
    </Routes>
  );
};

export default ProductsRoutes;
