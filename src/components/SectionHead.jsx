import { Split } from "./Text";

/** Big section title — the plain part in sans, the second part in italic serif. */
const SectionHead = ({ id, title, serif, count, note }) => {
  const offset = title.split(" ").length;
  return (
    <header className="section-head">
      <h2 id={id} className="section-head__title" data-reveal="split">
        <Split text={title} />
        {serif && (
          <span className="serif">
            <Split text={serif} offset={offset} />
          </span>
        )}
        {count && <sup className="section-head__count">({count})</sup>}
      </h2>
      {note && (
        <p className="section-head__note" data-reveal>
          {note}
        </p>
      )}
    </header>
  );
};

export default SectionHead;
