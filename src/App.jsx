import { useState, useCallback } from "react";
import TVStage from "./components/TVStage";
import PaintApp from "./components/PaintApp";
import GalleryWindow from "./components/GalleryWindow";
import SideRail from "./components/SideRail";
import Taskbar from "./components/Taskbar";
import "./index.css";

const App = () => {
  // null = idle/screensaver, 0-4 = channel index, string = game
  const [activeChannel, setActiveChannel] = useState(null);
  const [showPaint, setShowPaint] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [tvOn, setTvOn] = useState(false); // TV off by default

  const handleChannelSelect = useCallback((idxOrUpdater) => {
    if (typeof idxOrUpdater === "function") {
      setActiveChannel(idxOrUpdater);
    } else {
      setActiveChannel(idxOrUpdater);
    }
  }, []);

  const handleTvToggle = useCallback(() => {
    setTvOn((prev) => !prev);
    if (tvOn) {
      // Turning off — reset channel
      setActiveChannel(null);
    }
  }, [tvOn]);

  return (
    <div className="xp-desktop">
      {/* ── CRT TV (center stage) ─────────────────────────── */}
      <TVStage
        activeChannel={activeChannel}
        onChannelChange={handleChannelSelect}
        tvOn={tvOn}
        onTvToggle={handleTvToggle}
      />

      {/* ── FABs: Paint & Gallery ─────────────────────────── */}
      <div className="fab-group">
        <button
          className="fab-btn"
          title="Open Paint"
          onClick={() => setShowPaint(true)}
        >
          🎨
        </button>
        <button
          className="fab-btn"
          title="Visitor Gallery"
          onClick={() => setShowGallery(true)}
        >
          🖼️
        </button>
      </div>

      {/* ── Side Rail ─────────────────────────────────────── */}
      <SideRail
        onMailClick={() => {
          window.location.href = "mailto:fsd.nischal@gmail.com";
        }}
      />

      {/* ── Paint App ─────────────────────────────────────── */}
      {showPaint && (
        <PaintApp
          onClose={() => setShowPaint(false)}
          onSave={() => {
            setTimeout(() => {
              setShowPaint(false);
              setShowGallery(true);
            }, 1200);
          }}
        />
      )}

      {/* ── Gallery Window ────────────────────────────────── */}
      {showGallery && <GalleryWindow onClose={() => setShowGallery(false)} />}

      {/* ── XP Taskbar (with Start Menu) ──────────────────── */}
      <Taskbar
        activeChannel={activeChannel}
        onChannelSelect={handleChannelSelect}
        onOpenPaint={() => setShowPaint(true)}
        onOpenGallery={() => setShowGallery(true)}
        onOpenMinesweeper={() => handleChannelSelect("minesweeper")}
        onOpenSnake={() => handleChannelSelect("snake")}
      />
    </div>
  );
};

export default App;
