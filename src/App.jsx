import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Products from "./components/Products";   
import ProductForm from "./components/ProductForm";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Toast provider */}
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          {/* Redirect root to products */}
          <Route path="/" element={<Navigate to="/products" />} />

          {/* Product listing */}
          <Route path="/products" element={<Products />} />

          {/* Create new product */}
          <Route path="/products/new" element={<ProductForm />} />

          {/* Edit product */}
          <Route path="/products/:id/edit" element={<ProductForm />} />

          {/* Catch all invalid routes */}
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-red-600">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
