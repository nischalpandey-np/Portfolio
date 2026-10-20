import { lazy, Suspense, useCallback, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Work from "./components/Work";
import Capabilities from "./components/Capabilities";
import About from "./components/About";
import Playground from "./components/Playground";
import Contact from "./components/Contact";
import { useRevealOnScroll, useSmoothScroll } from "./lib/motion";
import "./index.css";

// Everything that opens in a window is loaded on demand.
const PaintApp = lazy(() => import("./components/PaintApp"));
const GalleryWindow = lazy(() => import("./components/GalleryWindow"));
const GameWindow = lazy(() => import("./components/GameWindow"));

const App = () => {
  // null | "paint" | "gallery" | "snake" | "mines" — one window at a time.
  const [openWindow, setOpenWindow] = useState(null);
  const close = useCallback(() => setOpenWindow(null), []);
  useSmoothScroll();
  useRevealOnScroll();

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to the work
      </a>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Work />
        <Capabilities />
        <About onOpenWindow={setOpenWindow} />
        <Playground onOpenWindow={setOpenWindow} />
      </main>
      <Contact />

      <Suspense fallback={null}>
        {openWindow === "paint" && <PaintApp onClose={close} onSaved={() => setOpenWindow("gallery")} />}
        {openWindow === "gallery" && <GalleryWindow onClose={close} onOpenPaint={() => setOpenWindow("paint")} />}
        {(openWindow === "snake" || openWindow === "mines") && <GameWindow game={openWindow} onClose={close} />}
      </Suspense>
    </>
  );
};

export default App;
