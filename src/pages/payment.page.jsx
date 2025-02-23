import { Button } from "@/components/ui/button";
import { clearCart } from "@/lib/features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import CartItem from "@/components/ui/CartItem";
import { useNavigate, Navigate} from "react-router"; 

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  const handlePayment = () => {
    dispatch(clearCart());
    toast.success("Order Placed Successfully");

    navigate(`/shop/complete`);
  };

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-4xl font-bold text-center text-gray-900">Review Your Order</h2>
      <div className="mt-6 space-y-4">
        {cart.map((item, index) => (
          <CartItem key={item.id || index} item={item} />
        ))}
      </div>
      <div className="mt-6 p-4 border-t border-gray-300 text-lg font-medium text-gray-800">
        <p>Total Price: <span className="font-bold">${totalPrice.toFixed(2)}</span></p>
      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={handlePayment} className="px-6 py-3 text-lg">Place Order</Button>
      </div>
    </main>
  );
}

export default PaymentPage;
