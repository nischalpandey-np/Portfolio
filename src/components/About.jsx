import SectionHead from "./SectionHead";
import { ScrollWords } from "./Text";
import { timeline } from "../data/profile";

const About = ({ onOpenWindow }) => (
  <section className="section" aria-labelledby="about-title">
    <div className="wrap" id="about">
      <SectionHead id="about-title" title="About" serif="me" />

      <div className="about">
        <ScrollWords
          className="about__lead"
          text="Frontend developer in Kathmandu — working at Rahu Doom Pvt Ltd and studying Computer Science & IT at Metropolitan College."
        />

        <div className="about__body" data-reveal>
          <p>
            Most of what I build is React: booking flows, appointment pages, maps, carousels — the parts of a site
            people actually touch.
          </p>
          <p>
            When a project calls for it I take on the backend too. On Himalayan Bellevue Resort I was the full-stack
            developer, from the React front end to the Express API and MongoDB data behind it.
          </p>
          <p>
            And yes, this site has a television in it. Change the channel to play Snake or Minesweeper, or open{" "}
            <button type="button" className="link-btn" onClick={() => onOpenWindow("paint")}>
              Paint
            </button>{" "}
            and draw something.
          </p>
        </div>

        <div className="experience">
          <p className="eyebrow" data-reveal>
            Experience &amp; education
          </p>
          <ol role="list">
            {timeline.map((item, i) => (
              <li key={item.title} className="experience__item" data-reveal style={{ "--delay": `${i * 100}ms` }}>
                <p className="experience__when mono">
                  {item.start} — {item.end ?? "Present"}
                </p>
                <h3 className="experience__title">
                  {item.title}
                  <span className="experience__org">{item.org}</span>
                </h3>
                <p className="experience__summary">{item.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

export default About;
