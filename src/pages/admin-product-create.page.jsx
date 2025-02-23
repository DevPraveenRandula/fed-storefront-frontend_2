import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function AdminProductCreatePage() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Error fetching categories. Please try again later.");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, image: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate image file
    if (!product.image) {
      setError("Please upload an image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name.trim());
    formData.append("price", product.price.trim());
    formData.append("description", product.description.trim());
    formData.append("categoryId", product.categoryId);
    formData.append("image", product.image);

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || "Failed to create product");
      }

      alert("Product created successfully!");
      navigate("/shop"); // Redirect to the product list page
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-8">
      <h1 className="text-4xl font-bold mb-4">Create Product</h1>
  
      {error && <p className="text-red-500">{error}</p>}
  
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
  
        <input
          type="number"
          name="price"
          placeholder="Price (e.g., 119.00)"
          value={product.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="border p-2 rounded"
        />
  
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
  
        <select
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Loading categories...
            </option>
          )}
        </select>
  
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="border p-2 rounded"
        />
  
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded hover:bg-gray-800 disabled:bg-gray-500"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </main>
  );
  
}

export default AdminProductCreatePage;