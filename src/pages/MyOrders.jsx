import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const MyOrdersPage = () => {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("No authentication token found");

        const response = await fetch("https://fed-storefront-backend-praveen.onrender.com/api/orders/user/my-orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                {/* <th className="py-3 px-6 text-left">Order</th> */}
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Payment</th>
                <th className="py-3 px-6 text-left">Fulfillment</th>
                <th className="py-3 px-6 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 text-blue-500 font-medium">#{order._id.slice(-6)}</td>
                  {/* <td className="py-4 px-6">Just now</td> */}
                  <td className="py-4 px-6 flex items-center space-x-4">
                    <img
                      src={order.items[0]?.product?.image || "/placeholder.png"}
                      alt={order.items[0]?.product?.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{order.items[0]?.product?.name || "N/A"}</p>
                      <p className="text-sm text-gray-600">x{order.items[0]?.quantity}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.paymentStatus === "PAID" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                    }`}>{order.paymentStatus}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.orderStatus === "FULFILLED" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                    }`}>{order.orderStatus}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold">${order.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrdersPage;
