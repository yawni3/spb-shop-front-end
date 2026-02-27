import './style/Footer.css'

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-inner">
            <div className="footer-brand">
                  🍰 Sleepy Pie Bakery
            </div>
               
            <div className="footer-info">

                 <a
                      href="mailto:sleepypiebakery.contact@gmail.com?subject=Hello%20Yawnie"
                         className="footer-link"
                 >
                        🍓 Email
                     </a>
                <a href="https://www.instagram.com/yawn.pie"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          > 🍪 Developer</a>
        
            </div>

            <div className="footer-copy">
                 © 2026 Made with sweets & tiramisu paws 🐾
            </div>
        </div>
        </footer>
    );
};

export default Footer;