import { useState, useEffect, useRef } from "react";

const CHANNEL_NAMES = ["About", "Projects", "Skills", "Experience", "Contact"];

/**
 * Taskbar — Windows XP-style taskbar with Start Menu popup.
 * Clicking Start shows your photo + name + navigation.
 */
const Taskbar = ({ onChannelSelect, activeChannel, onOpenPaint, onOpenGallery, onOpenMinesweeper, onOpenSnake }) => {
  const [time, setTime] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target) && !startRef.current?.contains(e.target)) {
        setStartOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit", hour12:true });
  const dateStr = time.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });

  const handleChannel = (idx) => {
    onChannelSelect(idx);
    setStartOpen(false);
  };

  const menuItems = [
    ...CHANNEL_NAMES.map((name, i) => ({ label: name, idx: i, icon: ["👤","💻","⚡","📋","📡"][i] })),
  ];

  return (
    <>
      {/* ─── START MENU ──────────────────────────────────────── */}
      {startOpen && (
        <div ref={menuRef} style={{
          position:"fixed", bottom:48, left:0, zIndex:9000,
          width:280, background:"transparent",
          display:"flex", flexDirection:"column",
          filter:"drop-shadow(0 -4px 24px rgba(0,0,0,0.5))",
          animation:"slideUp 0.15s ease-out",
        }}>
          <style>{`@keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`}</style>

          {/* XP-style two-tone header */}
          <div style={{
            background:"linear-gradient(135deg, #245edc 0%, #3c8ef4 50%, #1a4abf 100%)",
            borderRadius:"8px 8px 0 0",
            padding:"14px 16px",
            display:"flex", alignItems:"center", gap:12,
            borderBottom:"2px solid rgba(0,0,0,0.3)",
          }}>
            <div style={{
              width:52, height:52, borderRadius:"50%",
              overflow:"hidden", border:"3px solid rgba(255,255,255,0.4)",
              flexShrink:0, boxShadow:"0 0 0 1px rgba(0,0,0,0.3)",
            }}>
              <img src="/1778232119049.jpg" alt="Nischal" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}/>
            </div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:"#fff", textShadow:"1px 1px 2px rgba(0,0,0,0.4)", letterSpacing:0.2 }}>
                Nischal Pandey
              </div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.75)", fontFamily:"var(--font-system)", marginTop:2 }}>
                Full-Stack Developer 🇳🇵
              </div>
            </div>
          </div>

          {/* Menu body */}
          <div style={{ background:"#f0eff4", flex:1, display:"flex", flexDirection:"column" }}>
            {/* Navigation items */}
            <div style={{ padding:"6px 0" }}>
              {menuItems.map(item => (
                <button key={item.idx} onClick={() => handleChannel(item.idx)} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:10,
                  padding:"9px 16px", background:"transparent", border:"none",
                  cursor:"pointer", textAlign:"left",
                  fontFamily:"var(--font-system)", fontSize:14,
                  color: activeChannel === item.idx ? "#1254d4" : "#1a1a1a",
                  fontWeight: activeChannel === item.idx ? "600" : "400",
                  transition:"background 0.1s",
                }}
                onMouseEnter={e => e.currentTarget.style.background="#3c8ef4"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}
                onMouseEnter={e => { e.currentTarget.style.background="#3c8ef4"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color = activeChannel === item.idx ? "#1254d4" : "#1a1a1a"; }}
                >
                  <span style={{ fontSize:16, width:20, textAlign:"center" }}>{item.icon}</span>
                  <span>{item.label}</span>
                  {activeChannel === item.idx && (
                    <span style={{ marginLeft:"auto", fontSize:10, color:"inherit", opacity:0.6 }}>● on air</span>
                  )}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height:1, background:"rgba(0,0,0,0.15)", margin:"2px 0" }}/>

            {/* Tools section */}
            <div style={{ padding:"6px 0" }}>
              <button onClick={() => { onOpenPaint(); setStartOpen(false); }} style={{
                width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"9px 16px", background:"transparent", border:"none",
                cursor:"pointer", textAlign:"left", fontFamily:"var(--font-system)", fontSize:14, color:"#1a1a1a",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#3c8ef4"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1a1a1a"; }}
              >
                <span style={{ fontSize:16, width:20, textAlign:"center" }}>🎨</span>
                <span>Paint</span>
              </button>
              <button onClick={() => { onOpenGallery(); setStartOpen(false); }} style={{
                width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"9px 16px", background:"transparent", border:"none",
                cursor:"pointer", textAlign:"left", fontFamily:"var(--font-system)", fontSize:14, color:"#1a1a1a",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#3c8ef4"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1a1a1a"; }}
              >
                <span style={{ fontSize:16, width:20, textAlign:"center" }}>🖼️</span>
                <span>Visitor Gallery</span>
              </button>
            </div>

            {/* Divider */}
            <div style={{ height:1, background:"rgba(0,0,0,0.15)", margin:"2px 0" }}/>

            {/* Games section */}
            <div style={{ padding:"6px 0" }}>
              <button onClick={() => { onOpenMinesweeper(); setStartOpen(false); }} style={{
                width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"9px 16px", background:"transparent", border:"none",
                cursor:"pointer", textAlign:"left", fontFamily:"var(--font-system)", fontSize:14, color:"#1a1a1a",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#3c8ef4"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1a1a1a"; }}
              >
                <span style={{ fontSize:16, width:20, textAlign:"center" }}>💣</span>
                <span>Minesweeper</span>
              </button>
              <button onClick={() => { onOpenSnake(); setStartOpen(false); }} style={{
                width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"9px 16px", background:"transparent", border:"none",
                cursor:"pointer", textAlign:"left", fontFamily:"var(--font-system)", fontSize:14, color:"#1a1a1a",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#3c8ef4"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1a1a1a"; }}
              >
                <span style={{ fontSize:16, width:20, textAlign:"center" }}>🐍</span>
                <span>Snake</span>
              </button>
            </div>

            {/* Divider */}
            <div style={{ height:1, background:"rgba(0,0,0,0.15)", margin:"2px 0" }}/>

            {/* Footer: Shut down */}
            <div style={{ padding:"6px 0 4px" }}>
              <button onClick={() => setStartOpen(false)} style={{
                width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"9px 16px", background:"transparent", border:"none",
                cursor:"pointer", textAlign:"left", fontFamily:"var(--font-system)", fontSize:13, color:"#555",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#3c8ef4"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#555"; }}
              >
                <span style={{ fontSize:16, width:20, textAlign:"center" }}>⏻</span>
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* XP blue footer */}
          <div style={{
            background:"linear-gradient(180deg,#1a4abf 0%,#0f3299 100%)",
            padding:"6px 12px",
            borderRadius:"0 0 8px 8px",
            borderTop:"2px solid rgba(0,0,0,0.3)",
          }}/>
        </div>
      )}

      {/* ─── TASKBAR ─────────────────────────────────────────── */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0, height:44, zIndex:8000,
        background:"linear-gradient(180deg, #245edc 0%, #1a4abf 40%, #1240a8 100%)",
        borderTop:"2px solid #5890f8",
        display:"flex", alignItems:"center", gap:4,
      }}>
        {/* Start Button */}
        <button ref={startRef} onClick={() => setStartOpen(s => !s)} style={{
          height:"100%", padding:"0 18px",
          background: startOpen
            ? "linear-gradient(180deg,#1a4abf,#0f3299)"
            : "linear-gradient(180deg,#56a000,#3c7a00)",
          border:"none", borderRight:"1px solid rgba(0,0,0,0.3)",
          cursor:"pointer", display:"flex", alignItems:"center", gap:6,
          flexShrink:0,
          boxShadow: startOpen ? "inset 0 2px 4px rgba(0,0,0,0.3)" : "none",
        }}>
          <span style={{ fontSize:18 }}>🪟</span>
          <span style={{
            color:"#fff", fontFamily:"var(--font-system)", fontSize:14,
            fontWeight:700, fontStyle:"italic",
            textShadow:"1px 1px 2px rgba(0,0,0,0.5)",
          }}>start</span>
        </button>

        {/* Separator */}
        <div style={{ width:1, height:30, background:"rgba(255,255,255,0.2)", marginLeft:4 }}/>

        {/* Active window — current channel */}
        {activeChannel !== null && (
          <div style={{
            padding:"4px 12px", marginLeft:4,
            background:"rgba(0,0,0,0.25)",
            border:"1px solid rgba(0,0,0,0.3)",
            borderRadius:3, maxWidth:180,
            display:"flex", alignItems:"center", gap:6,
          }}>
            <span style={{ fontSize:13 }}>📺</span>
            <span style={{ fontSize:12, color:"#fff", fontFamily:"var(--font-system)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
              {CHANNEL_NAMES[activeChannel]}
            </span>
          </div>
        )}

        {/* Spacer */}
        <div style={{ flex:1 }}/>

        {/* System Tray */}
        <div style={{
          display:"flex", alignItems:"center", gap:6, paddingRight:12,
          borderLeft:"1px solid rgba(255,255,255,0.15)", marginLeft:4, paddingLeft:8,
        }}>
          {/* Volume */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          {/* WiFi */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
            <path d="M12 21C11.3 21 10.7 20.76 10.23 20.28S9.5 19.2 9.5 18.5s.24-1.29.72-1.77S11.3 16 12 16s1.29.24 1.77.72.73 1.07.73 1.78-.24 1.29-.72 1.77S12.7 21 12 21zM6.35 15.35l-1.41-1.41C6.32 12.55 8.05 11.5 10 11.04V13c-1.38.38-2.52 1.2-3.65 2.35zM17.65 15.35C16.52 14.2 15.38 13.38 14 13v-1.96c1.95.46 3.68 1.51 5.06 2.9l-1.41 1.41zM2.1 11.1L.69 9.69C2.7 7.68 5.18 6.3 8 5.72V7.8c-2.22.52-4.2 1.7-5.9 3.3zm19.8 0C20.2 9.5 18.22 8.32 16 7.8V5.72c2.82.58 5.3 1.96 7.31 3.97l-1.41 1.41z"/>
          </svg>

          {/* Clock */}
          <div style={{ textAlign:"right", lineHeight:1.3 }}>
            <div style={{ fontSize:12, color:"#fff", fontFamily:"var(--font-system)", fontWeight:600, whiteSpace:"nowrap" }}>{timeStr}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.7)", fontFamily:"var(--font-system)", whiteSpace:"nowrap" }}>{dateStr}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
