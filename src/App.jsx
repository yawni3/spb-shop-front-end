import { Routes, Route } from "react-router-dom";

// ⭐ GitHub'daki gerçek dosya isimlerine göre düzenlendi
import Shop from "./pages/Shop/shop.jsx";
import About from "./pages/About/About.jsx";
import ProductDetails from "./pages/Product/ProductDetail.jsx";
import Layout from "./Baselayout.jsx";
import Checkout from './pages/checkout/checkOut.jsx';  // ⭐ DİKKAT: checkOut.jsx
import Cart from "./pages/Cart/Cart.jsx";
import Home from "./pages/Home/home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/assets" element={<Shop />} />
        <Route path="/apps" element={<Shop />} />
        <Route path="/wallpapers" element={<Shop />} />
        <Route path="/freebies" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;