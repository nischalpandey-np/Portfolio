/**
 * The television artwork. Drawn on a 320 × 180 viewBox — the screen
 * (x 34, y 42, 216 × 100) and the two knobs are overlaid in CSS using
 * percentages of these numbers, so keep them in sync with index.css.
 */
const TVShell = () => (
  <svg className="tv__shell" viewBox="0 0 320 180" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="tv-blue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b8d8e8" />
        <stop offset="1" stopColor="#85afc4" />
      </linearGradient>
      <linearGradient id="tv-gold" x1="0" y1="0" x2="0.15" y2="1">
        <stop offset="0" stopColor="#f0cc70" />
        <stop offset="0.5" stopColor="#d8a83c" />
        <stop offset="1" stopColor="#b8852c" />
      </linearGradient>
      <radialGradient id="tv-chrome" cx="0.35" cy="0.25" r="0.8">
        <stop offset="0" stopColor="#f8f8f6" />
        <stop offset="0.5" stopColor="#d0d0cb" />
        <stop offset="1" stopColor="#909088" />
      </radialGradient>
      <linearGradient id="tv-foot" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9a6035" />
        <stop offset="1" stopColor="#5e3c1e" />
      </linearGradient>
    </defs>
    <path d="M84 161 l-12 18 10 1 14-17z" fill="url(#tv-foot)" />
    <path d="M236 161 l12 18-10 1-14-17z" fill="url(#tv-foot)" />
    <rect x="6" y="18" width="308" height="150" rx="22" fill="#3c6880" />
    <rect x="9" y="21" width="302" height="144" rx="20" fill="url(#tv-blue)" />
    <rect x="22" y="32" width="276" height="118" rx="14" fill="#9a6030" />
    <rect x="24" y="34" width="272" height="114" rx="13" fill="url(#tv-gold)" />
    <rect x="24" y="34" width="272" height="114" rx="13" fill="none" stroke="#f8e090" strokeWidth="1.2" opacity="0.7" />
    <rect x="30" y="38" width="224" height="108" rx="12" fill="#1e1a16" />
    <rect x="34" y="42" width="216" height="100" rx="9" fill="#050506" />
    <circle cx="274" cy="62" r="10" fill="url(#tv-chrome)" stroke="#888" strokeWidth="1.2" />
    <line x1="267" y1="62" x2="281" y2="62" stroke="#666" strokeWidth="2" strokeLinecap="round" />
    <circle cx="274" cy="90" r="10" fill="url(#tv-chrome)" stroke="#888" strokeWidth="1.2" />
    <line x1="269" y1="95" x2="279" y2="85" stroke="#666" strokeWidth="2" strokeLinecap="round" />
    <g stroke="#c49030" strokeWidth="1.8" strokeLinecap="round">
      {[257, 261, 265, 269, 273, 277, 281].map((x) => (
        <line key={x} x1={x} y1="108" x2={x} y2="142" />
      ))}
    </g>
    <rect x="253" y="104" width="34" height="42" rx="4" fill="none" stroke="#d4a040" strokeWidth="1" />
    <rect x="86" y="143" width="108" height="9" rx="3" fill="#f4ebcc" stroke="#c99530" strokeWidth="0.8" />
    <text
      x="140"
      y="149.6"
      textAnchor="middle"
      fontFamily="'IBM Plex Mono', 'Courier New', monospace"
      fontSize="5.4"
      letterSpacing="0.8"
      fill="#8a5520"
      fontWeight="600"
    >
      NISCHAL·O·VISION
    </text>
  </svg>
);

export default TVShell;
