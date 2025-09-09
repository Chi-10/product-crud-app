import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { getProducts, deleteProduct } from "../api";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Delete product with toast
  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span>Delete this product?</span>
          <button
            onClick={async () => {
              try {
                await deleteProduct(id);
                setProducts((prev) => prev.filter((p) => p.id !== id));
                toast.dismiss(t.id);
                toast.success("Product deleted!");
              } catch {
                toast.error("Failed to delete product.");
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded-lg"
          >
            No
          </button>
        </div>
      ),
      { duration: 5000 }
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          to="/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-500 mb-4">
                {product.description}
              </p>
              <div className="flex gap-3 mt-auto">
                <Link
                  to={`/products/${product.id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
