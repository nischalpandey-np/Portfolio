import { Orb, ScrollWords } from "./Text";

const Intro = () => (
  <section className="section" aria-label="Introduction">
    <div className="wrap intro">
      <ScrollWords
        className="intro__statement"
        text="I build React front ends — so far for a resort, a hospital, two consultancies, an NGO and a marble showroom — and, when a project needs it, the API and database behind them."
      />
      <div className="intro__side">
        <p data-reveal>Focused on clean code, good UX, and systems that hold up as they grow.</p>
        <div data-reveal style={{ "--delay": "150ms" }}>
          <Orb href="#about" ghost>
            About me
          </Orb>
        </div>
      </div>
    </div>
  </section>
);

export default Intro;
