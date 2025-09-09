import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import {
  getProduct,
  createProduct,
  updateProduct,
} from "../api";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch product if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      getProduct(id)
        .then((res) => {
          setForm(res.data);
          setPreview(res.data.image);
        })
        .catch((err) => console.error("Error fetching product:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      alert("Name, price, and image are required!");
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await updateProduct(id, form);
      } else {
        await createProduct(form);
      }
      navigate("/products");
    } catch (err) {
      console.error("Error saving product:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Product" : "Add New Product"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded-lg px-3 py-2"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-md mt-2"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          {id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}
