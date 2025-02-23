import Navigation from "@/Navigation";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";

function RootLayout() {
    return (
        <>
            <Navigation />
            <Outlet />
            <ToastContainer /> 
        </>);
}

export default RootLayout;