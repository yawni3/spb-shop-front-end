import { useState } from "react";
import { sourcesData } from "../../data/sources";
import { getBrowserLang } from "../../utils/lang";
import '../../components/style/sources.css'
import { t } from "../../utils/lang";
import { globalLang } from "../../data/globalLang";

const Sources = () => {
  const lang = getBrowserLang();
  const [activeType, setActiveType] = useState("All");

  const types = ["All", ...new Set(sourcesData.map(s => s.type))];

  const filteredSources =
    activeType === "All"
      ? sourcesData
      : sourcesData.filter(source => source.type === activeType);

return (
  <div className="sources-page">

    <h1 className="sources-title">{t(globalLang.headers.source)}</h1>
    <div className="sources-divider"> 🍰 ✦ 🍪 ✦ 🥐</div>

    <div className="type-btn-ctn">
      {types.map(type => (
        <button
          className={`type-btn ${activeType === type ? "active" : ""}`}
          key={type}
          onClick={() => setActiveType(type)}
        >
          {type}
        </button>
      ))}
    </div>

      <div className="source-grid">

  {filteredSources.map(source => (

    <a
      key={source.id}
      href={source.link}
      target="_blank"
      rel="noreferrer"
      className="source-box"
    >
      <span className="source-title">
        {source.title?.[lang] || source.title?.tr || source.title?.en}
      </span>
    </a>

  ))}

  </div>
  
  </div>
);
};

export default Sources;
