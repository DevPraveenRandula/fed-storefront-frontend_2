import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

function AdminProtected() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Wait until the user data is fully loaded
  if (!isLoaded) return null;

  // Redirect to home if the user is not signed in or not an admin
  if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/"  />;
  }

  return <Outlet />;
}

export default AdminProtected;
