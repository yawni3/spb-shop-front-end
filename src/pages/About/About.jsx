import { aboutData } from "../../data/about";
import { getBrowserLang } from "../../utils/lang";
import '../../components/style/about.css'

const About = () => {

  const lang = getBrowserLang();

  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>{aboutData.title[lang]}</h1>
        <p>{aboutData.description[lang]}</p>
      </section>

      <section className="about-block">
        <h2>{aboutData.subtitles.philosophy[lang]}</h2>
        <p>{aboutData.philosophy[lang]}</p>
      </section>

      <section className="about-block">
        <h2>{aboutData.subtitles.current[lang]}</h2>
        <p>{aboutData.current[lang]}</p>
      </section>

      <section className="about-block">
        <h2>{aboutData.subtitles.vision[lang]}</h2>
        <p>{aboutData.vision[lang]}</p>
      </section>

      <section className="about-ending">
        <h2>{aboutData.subtitles.note[lang]}</h2>
        <p>{aboutData.ending[lang]}</p>
      </section>

    </div>
  );
};

export default About;