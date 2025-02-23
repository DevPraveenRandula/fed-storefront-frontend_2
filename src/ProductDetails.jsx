import React, { useState, useEffect, useCallback } from "react";
import { useParams,Link} from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "./lib/features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleClick = useCallback(() => {
    if (product) {
      dispatch(
        addToCart({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
        })
      );
    }
  }, [dispatch, product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product data");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg font-medium">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="p-4 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-96 rounded-lg shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{product.name || "Unknown Product"}</h1>
            <p className="text-2xl font-semibold text-gray-700 mb-4">Rs {product.price || "N/A"}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Storage Options */}
            {product.storageOptions?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Storage Options</h3>
                <div className="flex gap-2">
                  {product.storageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedStorage(option)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedStorage === option
                          ? "ring-2 ring-black ring-offset-500"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Options */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Available Colors</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color
                          ? "ring-2 ring-black ring-offset-500"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                className="flex-grow bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-black/80"
                onClick={handleClick}
              >
                Add to Cart
              </button>
                <button className="flex-grow bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300" to="/shop/cart"
                  onClick={handleClick}>
                    Buy Now
                </button>
            </div>

            {/* Watching Info */}
            {product.peopleWatching && (
              <p className="mt-4 text-sm text-gray-500">
                {product.peopleWatching} people are watching this product now!
              </p>
            )}

            {/* Product Features */}
            {product.features?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
