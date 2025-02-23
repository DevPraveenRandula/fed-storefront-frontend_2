import Navigation from "@/Navigation";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


// const handleCheckout  = async () => {
//     createOrder ({
//         items: cart,
//     })
// }

function CartPage() {
    const cart = useSelector((state) => state.cart.value);

    return (
        <main className="px-8 py-4">
            <h2 className="text-4xl font-bold mb-6">Your Shopping Cart</h2>
            <div className="flex gap-4 flex-wrap">
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <Card key={index} className="flex items-center gap-4 p-4 w-[450px] border rounded-lg shadow-lg">
                            <img src={item.product.image} alt={item.product.name} className="h-24 w-24 object-contain bg-gray-100 p-2 rounded-lg" />
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold">{item.product.name}</h3>
                                <p className="text-sm text-gray-600">{item.product.description}</p>
                                <p className="text-lg font-bold mt-2">${item.product.price}</p>
                                <p className="text-sm">Amount: {item.quantity}</p>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className="text-lg text-gray-600">Your cart is empty.</p>
                )}
            </div>
            <div className="mt-6">
                <Link to="/checkout">
                    <Button className="bg-black text-white px-6 py-2 rounded-lg">Proceed to Checkout</Button>
                </Link>
            </div>
        </main>
    );
}

export default CartPage;
