import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrdersPage";
import UpdateAddress from "./pages/UpdateAddress";
import ProfileSettings from "./pages/ProfileSettings";
import RatedDishes from "./pages/RatedDishes";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />

            {/* Protected User Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
            <Route path="/update-address" element={<PrivateRoute><UpdateAddress /></PrivateRoute>} />
            <Route path="/profile-settings" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
            <Route path="/favorites" element={<PrivateRoute><RatedDishes /></PrivateRoute>} />

            {/* Admin Route */}
            <Route path="/admin/dashboard" element={<AdminRoute><Admin /></AdminRoute>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
