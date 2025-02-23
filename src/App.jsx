import Hero from "./Hero";
import Navigation from "./Navigation";
import Products from "./Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const name = "Praveen";
  const cartCount = 2;

  return (
    <div>
      <Navigation name={name} cartCount={cartCount} />
      <Hero />
      <Products />
      <ToastContainer />
    </div>
  );
}

export default App;
