import { useState } from "react";
import XPWindow from "./XPWindow";
import { GALLERY_KEY, readJSON, writeJSON } from "../lib/storage";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Gallery — drawings saved from Paint. They live only in this browser. */
const GalleryWindow = ({ onClose, onOpenPaint }) => {
  const [paintings, setPaintings] = useState(() => readJSON(GALLERY_KEY, []));

  const remove = (id) => {
    const next = paintings.filter((p) => p.id !== id);
    setPaintings(next);
    writeJSON(GALLERY_KEY, next);
  };

  const count = `${paintings.length} drawing${paintings.length === 1 ? "" : "s"}`;

  return (
    <XPWindow
      title={`Gallery — ${count}`}
      icon="🖼️"
      onClose={onClose}
      className="gallery"
      status={<span>Saved in this browser only — nobody else can see these.</span>}
    >
      <div className="gallery__body">
        {paintings.length === 0 ? (
          <div className="gallery__empty">
            <p>No drawings yet.</p>
            <button type="button" className="xp-button xp-button--primary" onClick={onOpenPaint}>
              Open Paint
            </button>
          </div>
        ) : (
          <ul className="gallery__grid" role="list">
            {paintings.map((p, i) => {
              const date = dateFormat.format(new Date(p.id));
              return (
                <li key={p.id}>
                  <figure className="gallery__item">
                    <img src={p.url} alt={`Drawing ${paintings.length - i}, made ${date}`} width="500" height="340" />
                    <figcaption>
                      <span>{date}</span>
                      <span className="gallery__item-actions">
                        <a className="xp-button" href={p.url} download={`drawing-${p.id}.png`}>
                          Save
                        </a>
                        <button type="button" className="xp-button" onClick={() => remove(p.id)} aria-label={`Delete drawing from ${date}`}>
                          Delete
                        </button>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </XPWindow>
  );
};

export default GalleryWindow;
