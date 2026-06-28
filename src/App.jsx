import { Routes, Route } from "react-router-dom";

import Shop from "./pages/shop/shop.jsx";
import About from "./pages/about/about.jsx";
import ProductDetails from "./pages/product/productdetail.jsx";
import Layout from "./Baselayout.jsx";
import Checkout from './pages/checkout/checkout.jsx';
import Cart from "./pages/cart/cart.jsx";
import Home from "./pages/home/home.jsx";
import FAQ from "./pages/FAQ.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";

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
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Route>
    </Routes>
  );
}

export default App;