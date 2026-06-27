import { Routes, Route } from "react-router-dom";

import Shop from "./pages/shop/Shop.jsx";
import About from "./pages/about/About.jsx";
import ProductDetails from "./pages/product/Productdetail.jsx";
import Layout from "./Baselayout.jsx";
import Checkout from './pages/Checkout/Checkout.jsx';
import Cart from "./pages/cart/Cart.jsx";
import Home from "./pages/home/Home.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
         {/* <Route index element={<Home />} />*/}
        <Route path="/about" element={<About />} />
        
        {/* ⭐ Shop ve filtreli sayfalar */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/assets" element={<Shop />} />
        <Route path="/apps" element={<Shop />} />
        <Route path="/wallpapers" element={<Shop />} />
        <Route path="/freebies" element={<Shop />} />
        
        {/* ⭐ Ürün detay */}
        <Route path="/product/:slug" element={<ProductDetails />} />
        
        {/* ⭐ Sepet ve Ödeme */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;