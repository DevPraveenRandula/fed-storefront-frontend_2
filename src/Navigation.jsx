import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router"; 


import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function Navigation() {
  const savedItems = useSelector((state) => state.saved.items || []);
  const cart = useSelector((state) => state.cart.value || []);

  const getCartQuantity = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <nav className="flex items-center justify-between py-8 px-8">
      {/* Left Section - Logo & Links */}
      <div className="flex gap-x-16">
        <a className="font-semibold text-3xl" href="/">
          Mebius
        </a>
        <div className="flex items-center gap-4">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
        </div>
      </div>

      

      {/* Right Section - Saved, Cart, and Authentication */}
      <div className="flex items-center gap-6">
        {/* Saved Items */}
        <Link  className="flex items-center gap-2 relative">
          <Heart className="text-red-500" size={24} />
          {savedItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {savedItems.length}
            </span>
          )}
          {/* <SavedItemsDropdown items={savedItems} onRemove={handleRemoveSavedItem} />   */}
          <span>Saved</span>
        </Link>

        {/* Cart */}
        <Link to="/shop/cart" className="flex items-center gap-2 relative">
          <ShoppingCart size={24} />
          {getCartQuantity() > 0 && (
            <span className="absolute -top-2 -right-3 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {getCartQuantity()}
            </span>
          )}
          <span>Cart</span>
        </Link>
        
        <SignedIn>
          <Link to="/my-orders">My Orders</Link>
        </SignedIn>

        {/* Authentication */}
        <SignedOut>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="text-primary">Sign In</Link>
            <Link to="/sign-up" className="text-primary">Sign Up</Link>
          </div>
        </SignedOut>

        <SignedIn>
          <UserButton />
          <Link to="/account">Account</Link>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
