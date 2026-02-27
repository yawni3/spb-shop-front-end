import { Link } from "react-router-dom";
import '../components/style/sourcesPreview.css';
import { sourcesData } from "../data/sources";
import { getBrowserLang } from "../utils/lang";
import { globalLang } from "../data/globalLang";
import { t } from "../utils/lang";

const SourcesPreview = () => {

  const lang = getBrowserLang();
  const sources = sourcesData.slice(0, 4);
  const isMobile = window.innerWidth < 768;

  const visibleSources = isMobile
   ? sources.slice(0, 3)
   : sources;
  return (

    <section className="sources-preview">

      <h2 className="section-title">{t(globalLang.headers.source)}</h2>

      <div className="sources-grid">
        {visibleSources.map(source => (
          <a
            key={source.id}
            href={source.link}
            target="_blank"
            rel="noopener noreferrer"
            className="source-card"
          >
            <h3>{source.title?.[lang] || source.title?.tr}</h3>
          </a>
        ))}
      </div>

      <Link to="/sources" className="view-all-btn">
        {t(globalLang.buttons.btnviewtext)}
      </Link>

    </section>
  );
};

export default SourcesPreview;