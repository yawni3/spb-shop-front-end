import {Link} from "react-router-dom";
import './style/aboutPreview.css'
import { aboutData } from "../data/about";
import { getBrowserLang } from "../utils/lang";
import { globalLang } from "../data/globalLang";
import { t } from "../utils/lang";
import "./style/sharedBtn.css";

const AboutPreview = () =>{

    const lang = getBrowserLang();

    return (
        <div className="about-preview">

            <h2 className="preview-title">{aboutData.title[lang]}</h2>

            <p className="preview-text">{aboutData.description[lang]}</p>

           <Link to="/about" className="read-more-btn pixel-btn">{t(globalLang.buttons.morebtn)}
           </Link> 
        </div>
    );
};

export default AboutPreview;