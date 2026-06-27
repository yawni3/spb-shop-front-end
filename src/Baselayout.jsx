import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import './styles/globalStyle.css';
import './styles/layout.css';
import './styles/mobilLayout.css';

const Layout = () => {
    return (
        <div className="page">
            {/* Background layer */}
            <div className="page-bg" />
            <AnnouncementBar />
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
