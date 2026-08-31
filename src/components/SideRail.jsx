/**
 * SideRail — Fixed right-side Y2K navigation buttons (CHAT, MAIL)
 */
const SideRail = ({ onMailClick }) => {
  return (
    <div className="side-rail">
      <button
        className="rail-btn"
        title="Chat Room"
        onClick={() => window.open("https://discord.com", "_blank")}
      >
        <svg className="rail-ico" viewBox="0 0 24 24" fill="none" stroke="#18145D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="4" width="19" height="12.5" rx="3.5"/>
          <rect x="5" y="6.4" width="14" height="7.7" rx="2.2" opacity="0.3"/>
          <path d="M7.5 16.5 L5.5 20.5 L11 16.5"/>
          <circle cx="8.5" cy="10.2" r="1.05" fill="#18145D" stroke="none"/>
          <circle cx="12" cy="10.2" r="1.05" fill="#18145D" stroke="none"/>
          <circle cx="15.5" cy="10.2" r="1.05" fill="#18145D" stroke="none"/>
        </svg>
        <span>CHAT</span>
      </button>

      <button
        className="rail-btn"
        title="Send a Message"
        onClick={onMailClick}
      >
        <svg className="rail-ico" viewBox="0 0 24 24" fill="none" stroke="#18145D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="5" width="19" height="14" rx="2.5"/>
          <path d="M3 6.5 L12 13 L21 6.5"/>
          <path d="M3 18.2 L9.4 12"/>
          <path d="M21 18.2 L14.6 12"/>
        </svg>
        <span>MAIL</span>
      </button>
    </div>
  );
};

export default SideRail;
