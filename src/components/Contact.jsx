import { useEffect, useState } from "react";
import { Orb, Roll } from "./Text";
import { profile } from "../data/profile";
import { formatTime, useMinuteClock } from "../lib/hooks";

const CopyButton = ({ text }) => {
  const [state, setState] = useState("idle"); // idle | copied | failed

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2400);
    return () => clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <button type="button" className="pill" onClick={copy}>
      <span aria-live="polite">
        {state === "copied" ? "Copied ✓" : state === "failed" ? "Couldn’t copy — select it" : "Copy email"}
      </span>
    </button>
  );
};

const Contact = () => {
  const now = useMinuteClock();

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact__head" data-reveal>
          <img className="contact__avatar" src={profile.portrait} alt="" width="400" height="400" loading="lazy" />
          <h2 id="contact-title" className="contact__title">
            Let’s work <span className="serif">together</span>
          </h2>
        </div>

        <div className="contact__line">
          <div className="contact__orb">
            <Orb href={`mailto:${profile.email}`}>Get in touch</Orb>
          </div>
        </div>

        <div className="contact__pills" data-reveal>
          <a className="pill" href={`mailto:${profile.email}`}>
            <Roll>{profile.email}</Roll>
          </a>
          <CopyButton text={profile.email} />
        </div>
        <p className="contact__intro" data-reveal>
          Open to new projects, collaborations, or just a good conversation.
        </p>

        <div className="footer-bar">
          <div className="footer-bar__group">
            <p className="footer-bar__item">
              <span className="eyebrow">Version</span>
              {new Date().getFullYear()} edition
            </p>
            <p className="footer-bar__item">
              <span className="eyebrow">Local time</span>
              {formatTime(now, profile.timeZone)} GMT+5:45
            </p>
          </div>
          <div className="footer-bar__item">
            <span className="eyebrow">Socials</span>
            <div className="footer-bar__links">
              {profile.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                  <Roll>{l.label}</Roll>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
