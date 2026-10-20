import { profile } from "../data/profile";
import { formatTime, useMinuteClock } from "../lib/hooks";

const Globe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <ellipse cx="12" cy="12" rx="4.2" ry="9.5" />
    <path d="M2.5 12h19M4 7h16M4 17h16" />
  </svg>
);

const Arrow = () => (
  <svg className="hero__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M5 5l14 14M19 7v12H7" />
  </svg>
);

const NAME = (
  <span className="marquee__item">
    Nischal Pandey <span className="serif">—</span>
  </span>
);

const Hero = () => {
  const now = useMinuteClock();

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <figure className="hero__portrait">
          <div className="hero__portrait-frame">
            <img src={profile.portrait} alt="Portrait of Nischal Pandey" width="400" height="400" fetchPriority="high" />
          </div>
        </figure>

        <div className="hero__role enter" style={{ "--delay": "350ms" }}>
          <Arrow />
          <h1 id="hero-title">
            <span className="sr-only">Nischal Pandey, </span>
            Frontend <span className="serif">&amp;</span> full‑stack developer
          </h1>
          <p>React front ends — and, when a project needs it, the Node.js API and database behind them.</p>
        </div>

        <div className="hero__location enter" style={{ "--delay": "500ms" }}>
          <span className="hero__globe">
            <Globe />
          </span>
          <p>
            Based in {profile.location}
            <br />
            <span className="time">Local time {formatTime(now, profile.timeZone)}</span>
          </p>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="enter">
          <div className="marquee__track">
            {NAME}
            {NAME}
            {NAME}
            {NAME}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
