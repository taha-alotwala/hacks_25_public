import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import necessary components from react-router-dom
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home/Index";
import Cart from "./Pages/Payment/Cart";
import ProductList from "./Pages/Buyer/ProductList";
import VendorProfile from "./Pages/Buyer/VendorProfile";

function App() {
  return (
    <Router> {/* Wrap the app in Router */}
      <Navbar /> {/* Always render the Navbar */}
      <Routes> {/* Define your routes */}
        <Route path="/" element={<Home />} /> {/* Home Page route */}
        <Route path="/cart" element={<Cart />}/>
        <Route path="/product-list" element={<ProductList />}/>
        <Route path="/vendor/:id" element={<VendorProfile />} />
        {/* <Route path="/cart" element={<Cart />} /> Cart Page route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;