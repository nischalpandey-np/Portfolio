import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import ProjectDialog from "./ProjectDialog";
import { projects } from "../data/projects";

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const num = (i) => String(i + 1).padStart(2, "0");
const thumb = (p) => `/work/${p.image}-720.webp`;

/**
 * A floating card that trails the cursor over the list. All six previews
 * sit in one vertical strip; hovering a row slides the strip to it.
 */
function usePreviewFollow(listRef, previewRef) {
  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = 0, y = 0, cx = 0, cy = 0, frame = 0;
    const tick = () => {
      cx += (x - cx) * 0.15;
      cy += (y - cy) * 0.15;
      preview.style.left = `${cx}px`;
      preview.style.top = `${cy}px`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const enter = (e) => {
      cx = x = e.clientX;
      cy = y = e.clientY;
      move(e);
    };
    list.addEventListener("pointerenter", enter);
    list.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener("pointerenter", enter);
      list.removeEventListener("pointermove", move);
    };
  }, [listRef, previewRef]);
}

const Work = () => {
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(null);
  usePreviewFollow(listRef, previewRef);

  return (
    <section className="section" aria-labelledby="work-title">
      <div className="wrap" id="work">
        <SectionHead
          id="work-title"
          title="Selected"
          serif="work"
          count={String(projects.length).padStart(2, "0")}
          note="Builds from 2025–26 — from a multi-page PHP showroom to a full-stack booking platform. Open any project for the details."
        />

        <ul className="work-list" role="list" ref={listRef} onPointerLeave={() => setHovered(null)}>
          {projects.map((p, i) => (
            <li key={p.id} className="work-row" id={p.id} data-reveal style={{ "--delay": `${i * 60}ms` }}>
              <h3>
                <button
                  type="button"
                  className="work-row__btn"
                  aria-haspopup="dialog"
                  onClick={() => setOpen(i)}
                  onPointerEnter={() => setHovered(i)}
                >
                  <span className="work-row__media" style={{ background: p.tone }}>
                    <img src={thumb(p)} alt="" width="720" height="402" loading="lazy" decoding="async" />
                  </span>
                  <span className="work-row__num mono">{num(i)}</span>
                  <span className="work-row__title">{p.title}</span>
                  <span className="work-row__cat">{p.category}</span>
                  <span className="work-row__year mono">{p.year}</span>
                  <span className="work-row__arrow">
                    <ArrowIcon />
                  </span>
                </button>
              </h3>
            </li>
          ))}
        </ul>
      </div>

      <div className="preview" ref={previewRef} data-active={hovered !== null} aria-hidden="true">
        <div className="preview__window">
          <div className="preview__strip" style={{ transform: `translateY(${-(hovered ?? 0) * 100}%)` }}>
            {projects.map((p) => (
              <div key={p.id} className="preview__slide" style={{ "--slide-bg": p.tone }}>
                <img src={thumb(p)} alt="" width="720" height="402" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
        <span className="preview__cursor">View</span>
      </div>

      {open !== null && (
        <ProjectDialog
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={(step) => setOpen((i) => (i + step + projects.length) % projects.length)}
        />
      )}
    </section>
  );
};

export default Work;
