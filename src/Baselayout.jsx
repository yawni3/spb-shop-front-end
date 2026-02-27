import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import './styles/globalStyle.css'
import './styles/layout.css'
import './styles/mobilLayout.css'

const Layout = () => {
    return (
        <div className="page">
            
            {/* Background layer */}
            <div className="page-bg" />

            <Navbar />

        <main className="content-ctn">
            <div className="content-card">
              <Outlet />
            </div>
        </main>

          <Footer />

        </div>
    );
};

export default Layout;