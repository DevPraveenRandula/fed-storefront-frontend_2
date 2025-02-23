import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import HomePage from "./pages/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import CartPage from "./pages/cart.page";
import CheckoutPage from "./pages/checkout.page";
import MyOrdersPage from "./pages/MyOrders";
import Shop from "./pages/shop";
import ProductDetails from "./ProductDetails";
import CompletePage from "./pages/complete.page";
import PaymentPage from "./pages/payment.page";
import AccountPage from "./pages/account.page";
import AdminProtected from "@/layouts/AdminProtected";
import AdminProductCreatePage from "./pages/admin-product-create.page";

import { store } from "@/lib/store";
import { Provider } from "react-redux";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import RootLayout from "./layouts/root.layout";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

// Components to Protect Routes
const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/shop/cart" element={<CartPage />} />
              <Route path="/shop/payment" element={<PaymentPage />} />
              <Route path="/shop/complete" element={<CompletePage />} />
              <Route path="/shop/:id" element={<ProductDetails />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/account" element={<AccountPage />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route element={<AdminProtected />}>
                <Route
                  path="/admin/products/create"
                  element={ <AdminProductCreatePage />}
                />
              </Route>
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrdersPage />
                </ProtectedRoute>
              }
            />
            </Route>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
