import ShippingAddressForm from "@/components/ui/ShippingAddressForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import CartItem from "@/components/ui/cartItem";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);

  if (cart.length === 0) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="px-8 py-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6">Checkout</h2>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold border-b pb-2">Order Details</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold border-b pb-2">Shipping Address</h3>
          <div className="mt-4">
            <ShippingAddressForm cart={cart} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
