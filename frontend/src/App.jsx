import axios from "axios";
import { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "./pages/HomeLayout";
import { Landing } from "./pages/Landing";
import { Products } from "./pages/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import necessary components from react-router-dom
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home/Index";
import Cart from "./pages/Payment/Cart";
import Seller from "./pages/Seller/Seller";
import ProductList from "./pages/Buyer/ProductList";
import VendorProfile from "./pages/Buyer/VendorProfile";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import MapComponent from "./pages/map/map";
import VerifyForm from "./pages/Verify/verify";
import Subscribe from "./pages/Subscibe/subscribe";
import CreateProduct from "./pages/Seller/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap the app in Router */}
      <Navbar /> {/* Always render the Navbar */}
      <Routes>
        {" "}
        {/* Define your routes */}
        <Route path="/" element={<Home />} /> {/* Home Page route */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/vendor/:id" element={<VendorProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/map" element={<MapComponent />} />
        <Route path="/verify" element={<VerifyForm />} />
        <Route path="/subscribe" element={<Subscribe />} /> 


        <Route path="/seller" element={<Seller />} />
        <Route path="/create-product" element={<CreateProduct />} />
        {/* <Route path="/cart" element={<Cart />} /> Cart Page route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
