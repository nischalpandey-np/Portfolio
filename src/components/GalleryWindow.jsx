import { useState, useRef } from "react";

/**
 * GalleryWindow — XP window showing all visitor paintings saved from Paint App.
 */
const GalleryWindow = ({ onClose }) => {
  const [paintings, setPaintings] = useState(() =>
    JSON.parse(localStorage.getItem("np_gallery") || "[]")
  );
  const winRef = useRef(null);
  const dragging = useRef(false);
  const winOffset = useRef({ x: 0, y: 0 });
  const [winPos, setWinPos] = useState({ x: 100, y: 60 });

  const deletePainting = (id) => {
    const updated = paintings.filter(p => p.id !== id);
    setPaintings(updated);
    localStorage.setItem("np_gallery", JSON.stringify(updated));
  };

  const downloadPainting = (url, id) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitor-art-${id}.png`;
    a.click();
  };

  // Window dragging
  const onWinDragStart = (e) => {
    if (e.target.closest(".xp-btn")) return;
    dragging.current = true;
    const rect = winRef.current.getBoundingClientRect();
    winOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const onMove = (ev) => {
      if (!dragging.current) return;
      setWinPos({
        x: Math.max(0, ev.clientX - winOffset.current.x),
        y: Math.max(0, ev.clientY - winOffset.current.y),
      });
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1900,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(2px)",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={winRef}
        className="xp-window"
        style={{
          position: "absolute",
          left: winPos.x,
          top: winPos.y,
          width: "min(560px, 94vw)",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "4px 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <div className="xp-titlebar" onMouseDown={onWinDragStart} style={{cursor:"move"}}>
          <span className="xp-titlebar-icon">🖼️</span>
          <span className="xp-titlebar-title">
            Visitor Gallery — {paintings.length} painting{paintings.length !== 1 ? "s" : ""}
          </span>
          <div className="xp-titlebar-btns">
            <button className="xp-btn close" title="Close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Address bar */}
        <div style={{
          background:"#f0f0f0", borderBottom:"1px solid #aaa",
          padding:"2px 8px", display:"flex", alignItems:"center", gap:6, flexShrink:0,
        }}>
          <span style={{fontSize:11,fontFamily:"var(--font-system)",color:"#666"}}>📁</span>
          <span style={{
            flex:1, fontSize:11, fontFamily:"var(--font-system)",
            background:"#fff", border:"1px inset #aaa", padding:"1px 6px", borderRadius:2,
          }}>
            C:\Portfolio\Visitors\Gallery
          </span>
        </div>

        {/* Gallery body */}
        <div className="xp-window-body" style={{flex:1,overflow:"auto"}}>
          {paintings.length === 0 ? (
            <div className="gallery-empty">
              <div style={{fontSize:48,marginBottom:12}}>🎨</div>
              <div>No paintings yet!</div>
              <div style={{fontSize:14,marginTop:8,color:"#aaa"}}>
                Open the Paint app and create something magical.
              </div>
            </div>
          ) : (
            <div className="gallery-grid">
              {paintings.map((p) => (
                <div key={p.id} className="gallery-item" title={`Painted on ${new Date(p.id).toLocaleDateString()}`}>
                  <img src={p.url} alt={`visitor art ${p.id}`} />
                  <button
                    className="gallery-item-del"
                    title="Delete"
                    onClick={e => { e.stopPropagation(); deletePainting(p.id); }}
                  >✕</button>
                  <div
                    style={{
                      position:"absolute", bottom:0, left:0, right:0,
                      background:"rgba(0,0,0,0.6)", padding:"2px 4px",
                      fontSize:9, color:"#fff", fontFamily:"var(--font-system)",
                      opacity:0, transition:"opacity 0.15s",
                    }}
                    onMouseEnter={e=>e.target.style.opacity="1"}
                    onMouseLeave={e=>e.target.style.opacity="0"}
                  />
                  <div
                    style={{
                      position:"absolute", bottom:2, right:22,
                      background:"rgba(0,84,227,0.8)", borderRadius:2,
                      padding:"1px 4px", cursor:"pointer", fontSize:9, color:"#fff",
                      opacity:0, transition:"opacity 0.15s",
                    }}
                    className="gallery-download"
                    onClick={e=>{ e.stopPropagation(); downloadPainting(p.url, p.id); }}
                    title="Download"
                  >⬇</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div style={{
          background:"linear-gradient(180deg,#e8e8e8,#d8d8d8)",
          borderTop:"1px solid #aaa", padding:"2px 8px",
          fontSize:10, fontFamily:"var(--font-system)", color:"#444",
          display:"flex", gap:12, flexShrink:0,
        }}>
          <span>{paintings.length} object(s)</span>
          <span style={{marginLeft:"auto"}}>👁 Hover to see actions • ✕ to delete</span>
        </div>
      </div>

      <style>{`
        .gallery-item:hover .gallery-download { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

export default GalleryWindow;
