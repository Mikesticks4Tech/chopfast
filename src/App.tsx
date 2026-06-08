import { Routes, Route } from "react-router-dom";
import { CartProvider, AuthProvider } from "./context";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import { Checkout, Orders } from "./pages/CheckoutAndOrders";
import { Login, Register } from "./pages/Auth";

const App = () => (
  <AuthProvider>
    <CartProvider>
      <Navbar />
      <Routes>
        ;''
        <Route path="/" element={<Home />} />
        <Route path="/menu/:id" element={<MenuPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </CartProvider>
  </AuthProvider>
);

export default App;
