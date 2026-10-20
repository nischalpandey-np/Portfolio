import { useEffect, useState } from "react";
import { projects } from "../../data/projects";

const INTERVAL_MS = 5000;
const total = String(projects.length).padStart(2, "0");
const thumb = (p) => `/work/${p.image}-720.webp`;

/**
 * Channel 01 — cycles through the project previews. Each frame links to
 * that project further down the page.
 */
const Showreel = ({ playing }) => {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % projects.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [playing]);

  // Warm the cache for the next frame so the cut is clean.
  useEffect(() => {
    if (!playing) return;
    const img = new Image();
    img.src = thumb(projects[(index + 1) % projects.length]);
  }, [index, playing]);

  return (
    <a className="reel" href={`#${project.id}`}>
      <img src={thumb(project)} alt="" width="720" height="402" loading="lazy" decoding="async" />
      <span className="reel__caption">
        <span className="reel__count">
          {String(index + 1).padStart(2, "0")}/{total} · {project.category.toUpperCase()}
        </span>
        <span className="reel__title">{project.title}</span>
        <span className="sr-only"> — jump to this project</span>
      </span>
      {/* Re-keyed every frame so the static blip replays on each cut */}
      <span key={index} className="screen-static screen-static--blip" aria-hidden="true" />
    </a>
  );
};

export default Showreel;
