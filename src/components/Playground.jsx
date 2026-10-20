import SectionHead from "./SectionHead";
import Television from "./tv/Television";

const Playground = ({ onOpenWindow }) => (
  <section className="section" aria-labelledby="play-title">
    <div className="wrap" id="playground">
      <SectionHead id="play-title" title="After" serif="hours" />

      <div className="playground">
        <div className="playground__copy" data-reveal>
          <p>This portfolio used to be a television. It still works.</p>
          <p>
            Channel 01 replays the work above. Flip to 02 for Snake or 03 for Minesweeper — or open Paint and leave a
            drawing in the gallery. Drawings stay in your browser; nobody else sees them.
          </p>
        </div>
        <div className="playground__set" data-reveal style={{ "--delay": "150ms" }}>
          <Television onOpenWindow={onOpenWindow} />
        </div>
      </div>
    </div>
  </section>
);

export default Playground;
