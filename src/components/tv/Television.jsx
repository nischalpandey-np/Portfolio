import { lazy, Suspense, useEffect, useRef, useState } from "react";
import TVShell from "./TVShell";
import Showreel from "./Showreel";
import { useReducedMotion } from "../../lib/hooks";

const SnakeGame = lazy(() => import("../SnakeGame"));
const Minesweeper = lazy(() => import("../Minesweeper"));

const CHANNELS = [
  { id: "reel", num: "01", name: "Showreel" },
  { id: "snake", num: "02", name: "Snake" },
  { id: "mines", num: "03", name: "Minesweeper" },
];

// Below this on-screen width the games are too small to play, so the
// channel shows a title card that opens the game in a window instead.
const MIN_GAME_SCREEN = 380;

const PowerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="M18.36 6.64A9 9 0 1 1 5.64 6.64" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

function playStartupSound() {
  try {
    const audio = new Audio("/xp_startup.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});
  } catch {
    // Audio unsupported — the set still turns on silently.
  }
}

/**
 * Television — the site's centrepiece. Starts switched on, showing the
 * showreel. Channels 02/03 are the retro games; Paint and the gallery
 * open as windows via `onOpenWindow`.
 */
const Television = ({ onOpenWindow }) => {
  const reducedMotion = useReducedMotion();
  const figureRef = useRef(null);
  const screenRef = useRef(null);
  const [phase, setPhase] = useState("on"); // off | boot | on
  const [channel, setChannel] = useState(0);
  const [switching, setSwitching] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScreenWidth(entry.contentRect.width));
    observer.observe(screenRef.current);
    return () => observer.disconnect();
  }, []);

  // Stop the showreel when the set is scrolled out of view.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(figureRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "boot") return;
    const t = setTimeout(() => setPhase("on"), reducedMotion ? 0 : 800);
    return () => clearTimeout(t);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (!switching) return;
    const t = setTimeout(() => setSwitching(false), 240);
    return () => clearTimeout(t);
  }, [switching]);

  const powerOn = () => {
    setPhase("boot");
    playStartupSound();
  };

  const tune = (i) => {
    const next = (i + CHANNELS.length) % CHANNELS.length;
    if (phase === "off") {
      setChannel(next);
      powerOn();
      return;
    }
    if (next === channel) return;
    setChannel(next);
    if (!reducedMotion) setSwitching(true);
  };

  const ch = CHANNELS[channel];
  const isOn = phase !== "off";
  const reelPlaying = phase === "on" && ch.id === "reel" && inView && !userPaused && !reducedMotion;

  let screen;
  if (phase === "off") {
    screen = (
      <div className="screen-off">
        <div className="screen-off__line" />
      </div>
    );
  } else if (phase === "boot") {
    screen = (
      <div className="screen-boot">
        <div className="screen-boot__line" />
      </div>
    );
  } else if (ch.id === "reel") {
    screen = <Showreel playing={reelPlaying} />;
  } else if (screenWidth < MIN_GAME_SCREEN) {
    screen = (
      <div className="screen-card">
        <p className="screen-card__title">{ch.name}</p>
        <p className="screen-card__text">Too small to play on this set</p>
        <button type="button" className="screen-btn" onClick={() => onOpenWindow(ch.id)}>
          Play full size
        </button>
      </div>
    );
  } else {
    screen = (
      <div className="screen-game">
        <Suspense fallback={null}>{ch.id === "snake" ? <SnakeGame mode="tv" /> : <Minesweeper />}</Suspense>
        <button type="button" className="screen-expand" onClick={() => onOpenWindow(ch.id)}>
          ⤢ Full size
        </button>
      </div>
    );
  }

  return (
    <div className="tv" ref={figureRef} role="group" aria-label="Interactive television">
      <div className="tv__set">
        <TVShell />
        <div className="tv__screen" ref={screenRef}>
          {screen}
          {phase === "on" && (
            <p className="screen-osd" aria-hidden="true">
              CH {ch.num}
            </p>
          )}
          {switching && <div className="screen-static" aria-hidden="true" />}
          <div className="screen-fx" aria-hidden="true" />
        </div>
        <button type="button" className="tv__knob tv__knob--up" onClick={() => tune(channel + 1)} aria-label="Next channel" />
        <button type="button" className="tv__knob tv__knob--down" onClick={() => tune(channel - 1)} aria-label="Previous channel" />
      </div>

      <div className="tv__controls">
        <button
          type="button"
          className="tv__power"
          aria-pressed={isOn}
          aria-label="Power"
          onClick={() => (isOn ? setPhase("off") : powerOn())}
        >
          <PowerIcon />
        </button>
        <span className="tv__controls-sep" aria-hidden="true" />
        <div className="tv__channels" role="group" aria-label="Channels">
          {CHANNELS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className="channel-btn"
              aria-pressed={isOn && i === channel}
              onClick={() => tune(i)}
            >
              <span className="mono">{c.num}</span>
              {c.name}
            </button>
          ))}
        </div>
        {isOn && ch.id === "reel" && !reducedMotion && (
          <button type="button" className="channel-btn channel-btn--quiet" onClick={() => setUserPaused((p) => !p)}>
            {userPaused ? "Play reel" : "Pause reel"}
          </button>
        )}
      </div>
      <p className="tv__note">
        Also on this set:{" "}
        <button type="button" className="link-btn" onClick={() => onOpenWindow("paint")}>
          Paint
        </button>
        , and a{" "}
        <button type="button" className="link-btn" onClick={() => onOpenWindow("gallery")}>
          gallery
        </button>{" "}
        for whatever you draw.
      </p>
    </div>
  );
};

export default Television;
