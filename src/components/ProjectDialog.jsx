import { useEffect, useRef } from "react";
import { imageSet, projects } from "../data/projects";
import { useScrollLock } from "../lib/motion";
import { Roll } from "./Text";

const pad = (n) => String(n).padStart(2, "0");

const Chevron = ({ flip }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M6 3l5 5-5 5" />
  </svg>
);

/** Slide-in panel with the full details of one project. ←/→ step through projects. */
const ProjectDialog = ({ index, onClose, onNavigate }) => {
  const ref = useRef(null);
  const p = projects[index];
  const img = imageSet(p.image);
  useScrollLock();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog.open) dialog.showModal();
    // Focus the panel itself (not the first button) so ←/→ work straight away.
    dialog.focus();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  useEffect(() => {
    ref.current.scrollTop = 0;
  }, [index]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") onNavigate(1);
    if (e.key === "ArrowLeft") onNavigate(-1);
  };

  return (
    <dialog
      ref={ref}
      className="project"
      tabIndex={-1}
      aria-labelledby="project-title"
      onKeyDown={onKeyDown}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="project__bar">
        <span className="mono">
          Project {pad(index + 1)} / {pad(projects.length)}
        </span>
        <div className="project__nav">
          <button type="button" className="icon-btn" onClick={() => onNavigate(-1)} aria-label="Previous project">
            <Chevron flip />
          </button>
          <button type="button" className="icon-btn" onClick={() => onNavigate(1)} aria-label="Next project">
            <Chevron />
          </button>
          <button type="button" className="icon-btn icon-btn--close" onClick={onClose} aria-label="Close project">
            ✕
          </button>
        </div>
      </div>

      <div className="project__body">
        <p className="eyebrow">
          {p.category} · {p.year}
        </p>
        <h2 id="project-title" className="project__title">
          {p.title}
        </h2>

        <div className="project__shot" style={{ background: p.tone }}>
          <img {...img} sizes="(min-width: 72rem) 68rem, 100vw" alt={`Preview of the ${p.title} website`} decoding="async" />
        </div>

        <div className="project__cols">
          <dl className="facts">
            <div>
              <dt>Role</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{p.category}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{p.year}</dd>
            </div>
          </dl>

          <div>
            <p className="project__summary">{p.summary}</p>
            {p.highlights && (
              <ul className="project__highlights" role="list">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            <ul className="chips" role="list" aria-label="Built with">
              {p.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {(p.live || p.repo) && (
              <p className="project__links">
                {p.live && (
                  <a className="pill pill--solid" href={p.live} target="_blank" rel="noreferrer">
                    <Roll>Visit site ↗</Roll>
                  </a>
                )}
                {p.repo && (
                  <a className="pill" href={p.repo} target="_blank" rel="noreferrer">
                    <Roll>Source ↗</Roll>
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ProjectDialog;
