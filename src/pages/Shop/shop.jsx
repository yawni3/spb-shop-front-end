import { globalLang } from "../../data/globalLang";
import { t } from "../../utils/lang";
import '../../components/style/Home.css';
import '../../components/style/Shop.css';
import yawncook from "../../assets/img/yawncook.png";

const Shop = () =>{
    //gumroad const [products, setProducts] = useState([]);
    
  return (
    <div className="shop">

            <div className="shopcook">
            <div className="shopcook-img-wrap">
            <img src={yawncook} alt="cook" />
            </div>
            
            <span className="shop-title">{t(globalLang.headers.shop)}</span>
            <p className="shop-subtitle">{t(globalLang.subtitle.shop)}</p>
            </div>
        <div className="products-grid" id="products-grid">
            {/* Sadece bir span olarak ekledik */}
             <span className="products-placeholder-text">
            {t(globalLang.placeholders.shop)}
    </span>
    </div>

    </div>


);
};

export default Shop;