import { useEffect, useState, useSyncExternalStore } from "react";

/** Current time, re-rendered at the top of every minute. */
export function useMinuteClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let interval;
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, msToNextMinute);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  return now;
}

export function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(date);
}

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/**
 * Id of the section currently under the reading line (40% from the top),
 * or null above the first one. Used for the nav's active state.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const current = sections.find((s) => visible.get(s.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
