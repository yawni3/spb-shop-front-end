import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import './style/Navbar.css'
import HomeIcon from "../assets/home.png";
import ProjectIcon from "../assets/cupcake.png";
import SourcesIcon from "../assets/croissant.png";
import AboutIcon from "../assets/donat.png";

const Navbar = () => {

  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const sidebarRef = useRef(null);
  const location = useLocation();

  const items = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/projects", label: "Projects", icon: ProjectIcon },
    { to: "/sources", label: "Sources", icon: SourcesIcon },
    { to: "/about", label: "About", icon: AboutIcon }
  ];


  useEffect(() => {

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) setActiveIndex(null); // PC olunca reset
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);


  useEffect(() => {
    setActiveIndex(null);
  }, [location]);

  const timeoutRef = useRef(null);

const toggleSign = (index) => {

  if (!isMobile) return;

  setActiveIndex(index);

  clearTimeout(timeoutRef.current);

  timeoutRef.current = setTimeout(() => {
    setActiveIndex(null);
  }, 1500);
};


  return (
    <aside className="sidebar" ref={sidebarRef}>
      <nav>

        {items.map((item, index) => (

          <NavLink
            key={index}
            to={item.to}
            className={`sign ${
              isMobile && activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleSign(index)}
          >

            <svg viewBox="0 0 150 80" className="sign-shape">
              <path
                d="M103.007 1.01134H23.5065L1.50654 0.511345L0.506538 77.5113H23.5065H108.507L148.007 33.0113L103.007 1.01134Z"
                fill="#78AEFF"
                stroke="#FF71D0"
                strokeWidth="4"
              />
            </svg>

            <div className="inner">
              <span className="label">{item.label}</span>
              <img src={item.icon} className="icon" />
            </div>

          </NavLink>

        ))}

      </nav>
    </aside>
  );
};

export default Navbar;
