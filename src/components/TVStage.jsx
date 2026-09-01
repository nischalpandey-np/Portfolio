import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const workData = [
  { title:"Himalayan Bellevue Resort", role:"Full-Stack Developer", tech:"React · Node · MongoDB", color:"#4f8ef7", image:"/hotel_project.jpg" },
  { title:"Aarogya Sewa Hospital",     role:"Frontend Developer",  tech:"React · TanStack · Framer", color:"#22d3ee", image:"/hospital_project.jpg" },
  { title:"FusionDot Consultancy",     role:"Frontend Developer",  tech:"React · Leaflet · Router",  color:"#f59e0b", image:"/fusiondot_project.jpg" },
  { title:"HiHi Consultancy",          role:"Frontend Developer",  tech:"React · Tailwind · Swiper", color:"#34d399", image:"/hihiconsult_project.jpg" },
  { title:"MRDS NGO",                  role:"Frontend Developer",  tech:"React · Framer · Lucide",   color:"#f472b6", image:"/mrds_project.jpg" },
  { title:"Srisha Marbel",             role:"Web Developer",       tech:"PHP · HTML · CSS · JS",     color:"#fb923c", image:"/srisha_project.jpg" },
];

const skills = ["JavaScript","TypeScript","React","Next.js","Node.js","Express","MongoDB","REST APIs","Tailwind CSS","Framer Motion","Figma","Git"];

/* ══════════════════════════════════════════════════════════════
   IDLE SCREEN
══════════════════════════════════════════════════════════════ */
export const IdleScreen = () => (
  <div style={{ width:"100%",height:"100%",background:"#0a0a0f",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,fontFamily:"system-ui,-apple-system,sans-serif" }}>
    <div style={{display:"flex",gap:5,marginBottom:4}}>
      {[1,2,3,4,5].map(i=>(
        <div key={i} style={{width:3,height:i*8,background:"#00ff88",opacity:0.5+i*0.1,borderRadius:2,animation:`bp ${0.5+i*0.12}s ease-in-out infinite alternate`,animationDelay:`${i*0.1}s`}}/>
      ))}
    </div>
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:"clamp(20px,3cqw,32px)",fontWeight:700,color:"#fff",letterSpacing:"-0.5px",marginBottom:6}}>Nischal Pandey</div>
      <div style={{fontSize:"clamp(9px,1.1cqw,12px)",color:"rgba(255,255,255,0.35)",letterSpacing:3,fontFamily:"'Courier New',monospace"}}>▸ scroll or click a channel to tune in</div>
    </div>
    <div style={{display:"flex",gap:12,marginTop:4}}>
      {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:"#00ff88",animation:`bl 1.2s ease-in-out infinite`,animationDelay:`${i*0.4}s`}}/>)}
    </div>
    <style>{`
      @keyframes bp{from{opacity:0.25}to{opacity:1}}
      @keyframes bl{0%,100%{opacity:0.15}50%{opacity:1}}
    `}</style>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   CH 01 · ABOUT
══════════════════════════════════════════════════════════════ */
const AboutChannel = () => (
  <div style={{width:"100%",height:"100%",background:"#07070f",display:"flex",overflow:"hidden"}}>
    <div style={{width:"36%",flexShrink:0,position:"relative"}}>
      <img src="/1778232119049.jpg" alt="Nischal" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",filter:"brightness(0.8)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,transparent 55%,#07070f 100%)"}}/>
    </div>
    <div style={{flex:1,padding:"28px 28px 28px 12px",display:"flex",flexDirection:"column",justifyContent:"center",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{fontSize:10,color:"#00ff88",letterSpacing:4,fontWeight:600,marginBottom:10}}>CH 01 · ABOUT</div>
      <h1 style={{margin:"0 0 3px",fontSize:"clamp(20px,3cqw,36px)",fontWeight:700,color:"#fff",letterSpacing:"-0.8px"}}>Nischal Pandey</h1>
      <div style={{fontSize:"clamp(11px,1.4cqw,15px)",color:"#4f8ef7",fontWeight:500,marginBottom:16}}>Full-Stack Developer · Kathmandu, Nepal 🇳🇵</div>
      <p style={{margin:"0 0 20px",fontSize:"clamp(10px,1.2cqw,13px)",color:"#a1a1aa",lineHeight:1.7}}>
        I build fast, scalable web applications using the MERN stack. Focused on clean code, great UX, and systems that actually scale.
      </p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <div style={{padding:"8px 14px",borderRadius:8,background:"rgba(0,255,136,0.08)",border:"1px solid rgba(0,255,136,0.2)"}}>
          <div style={{fontSize:"clamp(14px,1.8cqw,22px)",fontWeight:700,color:"#fff"}}>6+</div>
          <div style={{fontSize:10,color:"#52525b",marginTop:2,letterSpacing:1}}>PROJECTS</div>
        </div>
        <div style={{padding:"8px 14px",borderRadius:8,background:"rgba(79,142,247,0.08)",border:"1px solid rgba(79,142,247,0.2)"}}>
          <div style={{fontSize:"clamp(14px,1.8cqw,22px)",fontWeight:700,color:"#fff"}}>1yr</div>
          <div style={{fontSize:10,color:"#52525b",marginTop:2,letterSpacing:1}}>EXPERIENCE</div>
        </div>
        <div style={{padding:"8px 14px",borderRadius:8,background:"rgba(0,255,136,0.05)",border:"1px solid rgba(0,255,136,0.15)",display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#00ff88",boxShadow:"0 0 6px #00ff88"}}/>
          <div style={{fontSize:"clamp(10px,1.2cqw,13px)",color:"#00ff88",fontWeight:600}}>AVAILABLE</div>
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   CH 02 · PROJECTS
══════════════════════════════════════════════════════════════ */
const ProjectsChannel = () => {
  const [sel, setSel] = useState(0);
  const w = workData[sel];
  return (
    <div style={{width:"100%",height:"100%",background:"#07070f",display:"flex",flexDirection:"column",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{padding:"10px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",flexShrink:0,display:"flex",alignItems:"center"}}>
        <span style={{fontSize:10,color:"#00ff88",letterSpacing:3,fontWeight:600}}>CH 02 · PROJECTS</span>
        <span style={{marginLeft:"auto",fontSize:10,color:"#3f3f46"}}>{sel+1}/{workData.length}</span>
      </div>
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        <div style={{width:"38%",borderRight:"1px solid rgba(255,255,255,0.06)",overflowY:"auto",flexShrink:0}}>
          {workData.map((p,i)=>(
            <div key={i} onClick={()=>setSel(i)} style={{
              padding:"10px 16px",cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,0.04)",
              background:i===sel?"rgba(79,142,247,0.1)":"transparent",
              borderLeft:i===sel?"3px solid #4f8ef7":"3px solid transparent",
              transition:"all 0.15s",
            }}>
              <div style={{fontSize:"clamp(9px,1.1cqw,12px)",fontWeight:600,color:i===sel?"#fff":"#a1a1aa",marginBottom:2}}>{p.title}</div>
              <div style={{fontSize:"clamp(8px,0.9cqw,10px)",color:i===sel?"#4f8ef7":"#52525b"}}>{p.role}</div>
            </div>
          ))}
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{flex:1,position:"relative",overflow:"hidden"}}>
            <img src={w.image} alt={w.title} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.45,transition:"opacity 0.3s"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(7,7,15,0.95) 0%,rgba(7,7,15,0.2) 100%)"}}/>
          </div>
          <div style={{padding:"14px 18px",flexShrink:0,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
            <div style={{fontSize:"clamp(11px,1.5cqw,16px)",fontWeight:700,color:"#fff",marginBottom:3}}>{w.title}</div>
            <div style={{fontSize:"clamp(9px,1cqw,11px)",color:"#4f8ef7",marginBottom:6}}>{w.role}</div>
            <div style={{fontSize:"clamp(8px,0.9cqw,10px)",color:"#52525b",letterSpacing:0.5}}>{w.tech}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   CH 03 · SKILLS
══════════════════════════════════════════════════════════════ */
const SkillsChannel = () => (
  <div style={{width:"100%",height:"100%",background:"#07070f",display:"flex",flexDirection:"column",fontFamily:"system-ui,-apple-system,sans-serif"}}>
    <div style={{padding:"10px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",flexShrink:0}}>
      <span style={{fontSize:10,color:"#00ff88",letterSpacing:3,fontWeight:600}}>CH 03 · SKILLS</span>
    </div>
    <div style={{flex:1,padding:"20px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <div style={{fontSize:"clamp(13px,1.8cqw,20px)",fontWeight:300,color:"#fff",marginBottom:16,letterSpacing:"-0.3px"}}>Technologies & Tools</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {skills.map(s=>(
          <div key={s} style={{padding:"6px 12px",borderRadius:6,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",fontSize:"clamp(9px,1.1cqw,12px)",color:"#d4d4d8",fontWeight:500,transition:"all 0.2s",cursor:"default"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(79,142,247,0.1)";e.currentTarget.style.borderColor="rgba(79,142,247,0.35)";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.09)";e.currentTarget.style.color="#d4d4d8";}}
          >{s}</div>
        ))}
      </div>
      <div style={{marginTop:18,padding:"10px 14px",borderRadius:8,background:"rgba(0,255,136,0.04)",border:"1px solid rgba(0,255,136,0.12)"}}>
        <div style={{fontSize:"clamp(8px,0.9cqw,11px)",color:"#00ff88",letterSpacing:0.5}}>🔭 Exploring: Docker · AWS · Redis · GraphQL · tRPC</div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   CH 04 · EXPERIENCE
══════════════════════════════════════════════════════════════ */
const ExperienceChannel = () => (
  <div style={{width:"100%",height:"100%",background:"#07070f",display:"flex",flexDirection:"column",fontFamily:"system-ui,-apple-system,sans-serif"}}>
    <div style={{padding:"10px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",flexShrink:0}}>
      <span style={{fontSize:10,color:"#00ff88",letterSpacing:3,fontWeight:600}}>CH 04 · EXPERIENCE</span>
    </div>
    <div style={{flex:1,padding:"20px 28px",display:"flex",flexDirection:"column",justifyContent:"center",gap:20,position:"relative"}}>
      <div style={{position:"absolute",left:44,top:"15%",bottom:"15%",width:1,background:"linear-gradient(to bottom,#4f8ef7,rgba(79,142,247,0.08))"}}/>
      {[
        {dot:"#4f8ef7",title:"Frontend Developer",org:"Rahu Doom Pvt Ltd",period:"May 2026 – Present",desc:"Architecting scalable frontends, optimizing performance, delivering exceptional UX for production web apps."},
        {dot:"rgba(255,255,255,0.25)",title:"B.Sc. CSIT",org:"Metropolitan College, Kathmandu",period:"2025 – Present",desc:"Computer Science & IT. Studying DSA, DBMS, OS, Web Technologies, and OOP."},
      ].map((e,i)=>(
        <div key={i} style={{display:"flex",gap:18,alignItems:"flex-start"}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:e.dot,border:"2px solid #07070f",boxShadow:`0 0 8px ${e.dot}`,marginTop:4,flexShrink:0,marginLeft:"clamp(5px,0.8cqw,9px)"}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:"clamp(12px,1.5cqw,17px)",fontWeight:600,color:"#fff",marginBottom:2}}>{e.title}</div>
            <div style={{fontSize:"clamp(9px,1cqw,12px)",color:"#4f8ef7",marginBottom:4}}>{e.org}</div>
            <div style={{fontSize:"clamp(8px,0.9cqw,10px)",color:"#3f3f46",marginBottom:8,letterSpacing:0.5}}>{e.period}</div>
            <p style={{margin:0,fontSize:"clamp(9px,1cqw,12px)",color:"#71717a",lineHeight:1.6}}>{e.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   CH 05 · CONTACT
══════════════════════════════════════════════════════════════ */
const ContactChannel = () => (
  <div style={{width:"100%",height:"100%",background:"#07070f",display:"flex",flexDirection:"column",fontFamily:"system-ui,-apple-system,sans-serif"}}>
    <div style={{padding:"10px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",flexShrink:0}}>
      <span style={{fontSize:10,color:"#00ff88",letterSpacing:3,fontWeight:600}}>CH 05 · CONTACT</span>
    </div>
    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:380}}>
        <h2 style={{margin:"0 0 6px",fontSize:"clamp(18px,2.2cqw,28px)",fontWeight:700,color:"#fff",letterSpacing:"-0.5px"}}>Let's build something.</h2>
        <p style={{margin:"0 0 22px",fontSize:"clamp(10px,1.2cqw,13px)",color:"#71717a",lineHeight:1.7}}>
          Open to new projects, collaborations, or just a good conversation.
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <a href="mailto:nischalpandey00@gmail.com" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 18px",background:"#fff",borderRadius:8,color:"#000",textDecoration:"none",fontWeight:600,fontSize:"clamp(9px,1.1cqw,13px)",transition:"transform 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          >
            nischalpandey00@gmail.com
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <div style={{display:"flex",gap:8}}>
            {[{l:"GitHub",u:"https://github.com/nischalpandey-np"},{l:"LinkedIn",u:"https://linkedin.com/in/nischal-pandey-np"}].map(x=>(
              <a key={x.l} href={x.u} target="_blank" rel="noreferrer" style={{flex:1,padding:"12px",borderRadius:8,textAlign:"center",border:"1px solid rgba(255,255,255,0.1)",color:"#a1a1aa",textDecoration:"none",fontSize:"clamp(9px,1.1cqw,12px)",fontWeight:500,transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.35)";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.color="#a1a1aa";}}
              >{x.l}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   CHANNELS
══════════════════════════════════════════════════════════════ */
const CHANNELS = [
  { id:0, num:"01", name:"About",      component:AboutChannel },
  { id:1, num:"02", name:"Projects",   component:ProjectsChannel },
  { id:2, num:"03", name:"Skills",     component:SkillsChannel },
  { id:3, num:"04", name:"Experience", component:ExperienceChannel },
  { id:4, num:"05", name:"Contact",    component:ContactChannel },
];

/* ══════════════════════════════════════════════════════════════
   TV SVG SHELL — Classic warm CRT
══════════════════════════════════════════════════════════════ */
const TVShell = () => (
  <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet" aria-hidden="true"
    style={{width:"100%",height:"auto",display:"block",filter:"drop-shadow(0 32px 48px rgba(0,0,0,0.7)) drop-shadow(0 2px 4px rgba(0,0,0,0.4))"}}>
    <defs>
      <linearGradient id="g_blue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b8d8e8"/><stop offset="1" stopColor="#85afc4"/>
      </linearGradient>
      <linearGradient id="g_gold" x1="0" y1="0" x2="0.15" y2="1">
        <stop offset="0" stopColor="#f0cc70"/><stop offset="0.5" stopColor="#d8a83c"/><stop offset="1" stopColor="#b8852c"/>
      </linearGradient>
      <radialGradient id="g_chrome" cx="0.35" cy="0.25" r="0.8">
        <stop offset="0" stopColor="#f8f8f6"/><stop offset="0.5" stopColor="#d0d0cb"/><stop offset="1" stopColor="#909088"/>
      </radialGradient>
      <linearGradient id="g_foot" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9a6035"/><stop offset="1" stopColor="#5e3c1e"/>
      </linearGradient>
      <radialGradient id="g_shadow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="rgba(20,30,40,0.35)"/><stop offset="1" stopColor="rgba(20,30,40,0)"/>
      </radialGradient>
    </defs>
    <ellipse cx="160" cy="177" rx="130" ry="6" fill="url(#g_shadow)"/>
    <path d="M84 161 l-12 18 10 3 14-19z" fill="url(#g_foot)"/>
    <path d="M236 161 l12 18-10 3-14-19z" fill="url(#g_foot)"/>
    <rect x="6" y="18" width="308" height="150" rx="22" fill="#3c6880"/>
    <rect x="9" y="20" width="302" height="6" rx="10" fill="rgba(255,255,255,0.12)"/>
    <rect x="9" y="21" width="302" height="144" rx="20" fill="url(#g_blue)"/>
    <rect x="22" y="32" width="276" height="118" rx="14" fill="#9a6030"/>
    <rect x="24" y="34" width="272" height="114" rx="13" fill="url(#g_gold)"/>
    <rect x="24" y="34" width="272" height="114" rx="13" fill="none" stroke="#f8e090" strokeWidth="1.2" opacity="0.7"/>
    <rect x="30" y="38" width="224" height="108" rx="12" fill="#1e1a16"/>
    <rect x="34" y="42" width="216" height="100" rx="9" fill="#0f0e15"/>
    <rect x="34" y="42" width="216" height="100" rx="9" fill="none" stroke="#4f8ef7" strokeWidth="0.5" opacity="0.25"/>
    <circle cx="274" cy="62" r="10" fill="url(#g_chrome)" stroke="#888" strokeWidth="1.2"/>
    <line x1="267" y1="62" x2="281" y2="62" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="274" cy="90" r="10" fill="url(#g_chrome)" stroke="#888" strokeWidth="1.2"/>
    <line x1="269" y1="95" x2="279" y2="85" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
    <g stroke="#c49030" strokeWidth="1.8" strokeLinecap="round">
      {[257,261,265,269,273,277,281].map(x=><line key={x} x1={x} y1="108" x2={x} y2="142"/>)}
    </g>
    <rect x="253" y="104" width="34" height="42" rx="4" fill="none" stroke="#d4a040" strokeWidth="1"/>
    <rect x="86" y="143" width="108" height="9" rx="3" fill="#f4ebcc" stroke="#c99530" strokeWidth="0.8"/>
    <text x="140" y="149.5" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="5.5" letterSpacing="0.6" fill="#8a5520" fontWeight="700">
      NISCHAL PANDEY
    </text>
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   TV STAGE — Special screens
══════════════════════════════════════════════════════════════ */
import Minesweeper from "./Minesweeper";
import SnakeGame from "./SnakeGame";

/* Static noise flash on channel switch */
const StaticNoise = () => (
  <div style={{
    position:"absolute", inset:0, zIndex:50, pointerEvents:"none",
    background:"#fff",
    backgroundImage:"url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%221%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
    animation:"tvStatic 0.2s steps(2, end) infinite",
    mixBlendMode:"difference",
  }}>
    <style>{`@keyframes tvStatic{0%{background-position:0 0}50%{background-position:-50px 50px}100%{background-position:50px -50px}}`}</style>
  </div>
);

/* TV Off: pure black with tiny dying-phosphor horizontal line collapsing to dot */
const TvOffScreen = () => (
  <div style={{width:"100%",height:"100%",background:"#000",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{
      width:"100%", height:3, background:"#fff",
      boxShadow:"0 0 12px 6px rgba(255,255,255,0.7)",
      animation:"tvOff 0.5s ease-out forwards",
    }}/>
    <style>{`
      @keyframes tvOff {
        0%   { transform:scaleX(1) scaleY(1); opacity:1; }
        40%  { transform:scaleX(1) scaleY(1); opacity:1; }
        70%  { transform:scaleX(0.05) scaleY(1); opacity:0.9; }
        100% { transform:scaleX(0.001) scaleY(0.001); opacity:0; }
      }
    `}</style>
  </div>
);

/* CRT power-on: white scan line expands from center to fill screen */
const CrtBootScreen = () => (
  <div style={{width:"100%",height:"100%",background:"#000",overflow:"hidden",position:"relative"}}>
    <div style={{
      position:"absolute", left:0, right:0, top:"50%",
      height:2, background:"#fff",
      boxShadow:"0 0 14px 5px rgba(255,255,255,0.9), 0 0 40px 10px rgba(180,200,255,0.4)",
      animation:"crtBoot 0.7s ease-out forwards",
      transformOrigin:"center",
    }}/>
    <style>{`
      @keyframes crtBoot {
        0%   { transform:scaleY(1);   opacity:1; }
        50%  { transform:scaleY(60);  opacity:1; }
        80%  { transform:scaleY(200); opacity:0.6; }
        100% { transform:scaleY(400); opacity:0; }
      }
    `}</style>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   TV STAGE — Main Component
══════════════════════════════════════════════════════════════ */
const TVStage = ({ activeChannel, onChannelChange, tvOn, onTvToggle }) => {
  const tvRef    = useRef(null);
  const [screenRect, setScreenRect]   = useState({ x:0, y:0, w:0, h:0 });
  const [isSwitching, setIsSwitching] = useState(false);
  const [bootPhase, setBootPhase]     = useState("off"); // "off" | "booting" | "on"
  const scrollAcc      = useRef(0);
  const scrollThrottle = useRef(false);
  const prevChannel    = useRef(activeChannel);
  const prevTvOn       = useRef(false);

  // Map SVG screen coords → rendered pixels
  useEffect(() => {
    const update = () => {
      if (!tvRef.current) return;
      const svg = tvRef.current.querySelector("svg");
      if (!svg) return;
      const { width, height } = svg.getBoundingClientRect();
      const sx = width / 320, sy = height / 180;
      setScreenRect({ x:34*sx, y:42*sy, w:216*sx, h:100*sy });
    };
    update();
    window.addEventListener("resize", update);
    setTimeout(update, 60);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Handle TV power transitions
  useEffect(() => {
    if (tvOn && !prevTvOn.current) {
      // Turning ON
      setBootPhase("booting");
      try {
        const audio = new Audio("/xp_startup.mp3");
        audio.volume = 0.65;
        audio.play().catch(() => {});
      } catch (_) {}
      const t = setTimeout(() => setBootPhase("on"), 1000);
      prevTvOn.current = true;
      return () => clearTimeout(t);
    }
    if (!tvOn && prevTvOn.current) {
      // Turning OFF
      setBootPhase("off");
      prevTvOn.current = false;
    }
  }, [tvOn]);

  // TV static on channel switch (only when screen is on)
  useEffect(() => {
    if (prevChannel.current !== activeChannel && bootPhase === "on") {
      setIsSwitching(true);
      const t = setTimeout(() => setIsSwitching(false), 260);
      prevChannel.current = activeChannel;
      return () => clearTimeout(t);
    }
    prevChannel.current = activeChannel;
  }, [activeChannel, bootPhase]);

  // Scroll → channel (disabled when off / booting / playing games)
  useEffect(() => {
    const onWheel = (e) => {
      if (!tvOn || bootPhase !== "on") return;
      if (typeof activeChannel === "string") return;
      e.preventDefault();
      if (scrollThrottle.current) return;
      scrollAcc.current += e.deltaY;
      if (Math.abs(scrollAcc.current) < 60) return;
      const dir = scrollAcc.current > 0 ? 1 : -1;
      scrollAcc.current = 0;
      scrollThrottle.current = true;
      setTimeout(() => { scrollThrottle.current = false; }, 600);
      onChannelChange(prev => {
        const cur = typeof prev === "number" ? prev : -1;
        return (cur + dir + CHANNELS.length) % CHANNELS.length;
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [onChannelChange, activeChannel, tvOn, bootPhase]);

  // What to render
  let Ch = IdleScreen, chLabel = null;
  if (activeChannel === "minesweeper") { Ch = Minesweeper; chLabel = "CH G1 · MINESWEEPER"; }
  else if (activeChannel === "snake")  { Ch = SnakeGame;   chLabel = "CH G2 · SNAKE"; }
  else if (typeof activeChannel === "number" && CHANNELS[activeChannel]) {
    Ch = CHANNELS[activeChannel].component;
    chLabel = `CH ${CHANNELS[activeChannel].num} · ${CHANNELS[activeChannel].name.toUpperCase()}`;
  }

  const renderScreen = () => {
    if (bootPhase === "off")     return <TvOffScreen />;
    if (bootPhase === "booting") return <CrtBootScreen />;
    return <Ch />;
  };

  // Detect mobile for layout decisions
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className="tv-stage-root" style={{
      position:"absolute",
      top: isMobile ? "50%" : "50%",
      left:"50%",
      transform: isMobile ? "translate(-50%, -47%)" : "translate(-50%, -55%)",
      width: isMobile ? "98vw" : "min(1100px, 90vw)",
      zIndex:100, userSelect:"none",
    }}>
      {/* TV Shell + Power Button */}
      <div ref={tvRef} style={{ position:"relative", width:"100%" }}>
        <TVShell />

        {/* ── Power Button — right side on desktop, below TV on mobile ── */}
        <button
          onClick={onTvToggle}
          title={tvOn ? "Turn TV Off" : "Turn TV On"}
          className="tv-power-btn"
          style={{
            position:"absolute",
            ...(isMobile ? {
              bottom:"-54px",
              right:"50%",
              transform:"translateX(50%)",
            } : {
              right:"-56px",
              top:"50%",
              transform:"translateY(-50%)",
            }),
            width: isMobile ? 48 : 44,
            height: isMobile ? 48 : 44,
            borderRadius:"50%",
            background: tvOn
              ? "radial-gradient(circle at 35% 30%, #66bb6a, #1b5e20)"
              : "radial-gradient(circle at 35% 30%, #555, #1a1a1a)",
            border:"3px solid",
            borderColor: tvOn ? "#a5d6a7" : "#3a3a3a",
            cursor:"pointer",
            boxShadow: tvOn
              ? "0 0 0 3px rgba(76,175,80,0.25), 0 0 24px rgba(76,175,80,0.7), inset 0 2px 5px rgba(255,255,255,0.3)"
              : "0 0 0 2px rgba(255,255,255,0.05), inset 0 2px 5px rgba(0,0,0,0.6)",
            transition:"all 0.35s ease",
            display:"flex", alignItems:"center", justifyContent:"center",
            zIndex:10,
          }}
          onMouseEnter={e => {
            if (!isMobile) e.currentTarget.style.transform = "translateY(-50%) scale(1.13)";
          }}
          onMouseLeave={e => {
            if (!isMobile) e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke={tvOn ? "#fff" : "#888"} strokeWidth="2.5" strokeLinecap="round">
            <path d="M18.36 6.64A9 9 0 1 1 5.64 6.64"/>
            <line x1="12" y1="2" x2="12" y2="12"/>
          </svg>
        </button>

        {/* Screen */}
        <div style={{
          position:"absolute",
          left:screenRect.x, top:screenRect.y,
          width:screenRect.w, height:screenRect.h,
          borderRadius:`${9*(screenRect.w/216)}px`,
          overflow:"hidden", background:"#000",
          boxShadow:"inset 0 0 30px rgba(0,0,0,0.8)",
        }}>
          {/* Static on channel switch */}
          {isSwitching && bootPhase === "on" && <StaticNoise />}

          {/* Content */}
          <div style={{
            position:"absolute", inset:0, containerType:"size",
            display: isSwitching ? "none" : "block",
          }}>
            <div style={{ width:"100%", height:"100%" }}>{renderScreen()}</div>
          </div>

          {/* CH HUD */}
          {chLabel && !isSwitching && bootPhase === "on" && (
            <div style={{position:"absolute",top:7,right:9,zIndex:30,pointerEvents:"none"}}>
              <div style={{
                fontSize:"clamp(7px,0.9cqw,11px)", color:"#00ff88",
                fontFamily:"'Courier New',monospace", letterSpacing:2,
                background:"rgba(0,0,0,0.65)", padding:"2px 7px", borderRadius:4,
                border:"1px solid rgba(0,255,136,0.2)",
              }}>{chLabel}</div>
            </div>
          )}

          {/* CRT vignette */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:20,background:"radial-gradient(ellipse at center,transparent 62%,rgba(0,0,0,0.6) 100%)"}}/>
          {/* Scanlines */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:21,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)"}}/>
        </div>
      </div>

      {/* ── Channel pills — only when TV is on and booted ── */}
      {tvOn && bootPhase === "on" && (
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          gap: isMobile ? 8 : 6,
          marginTop: isMobile ? 62 : 18,
          flexWrap:"wrap",
          padding: isMobile ? "0 4px" : 0,
        }}>
          {CHANNELS.map((c, i) => {
            const on = i === activeChannel;
            return (
              <button key={c.id} onClick={() => onChannelChange(i)} style={{
                padding: isMobile ? (on?"10px 20px":"8px 16px") : (on?"6px 18px":"6px 13px"),
                background: on?"rgba(255,255,255,0.93)":"rgba(255,255,255,0.05)",
                border:"1px solid", borderColor: on?"#fff":"rgba(255,255,255,0.1)",
                borderRadius:100, color: on?"#0a0a0f":"rgba(255,255,255,0.45)",
                fontSize: isMobile ? 13 : 12,
                fontWeight: on?600:400,
                fontFamily:"system-ui,sans-serif", cursor:"pointer",
                letterSpacing:0.3, whiteSpace:"nowrap",
                transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)",
                boxShadow: on?"0 2px 12px rgba(255,255,255,0.22)":"none",
                minHeight: isMobile ? 40 : "auto",
              }}
              onMouseEnter={e=>{ if(!on){e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="rgba(255,255,255,0.3)";e.currentTarget.style.background="rgba(255,255,255,0.1)";}}}
              onMouseLeave={e=>{ if(!on){e.currentTarget.style.color="rgba(255,255,255,0.45)";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.background="rgba(255,255,255,0.05)";}}}
              >{c.name}</button>
            );
          })}
        </div>
      )}

      {/* Idle hint — desktop only */}
      {!isMobile && tvOn && bootPhase === "on" && activeChannel === null && (
        <p style={{textAlign:"center",margin:"10px 0 0",fontSize:11,color:"rgba(255,255,255,0.22)",fontFamily:"system-ui,sans-serif",letterSpacing:2}}>
          SCROLL TO SWITCH CHANNELS
        </p>
      )}

      {/* Off hint */}
      {!tvOn && (
        <p style={{
          textAlign:"center",
          margin: isMobile ? "62px 0 0" : "14px 0 0",
          fontSize:11, color:"rgba(255,255,255,0.18)",
          fontFamily:"system-ui,sans-serif", letterSpacing:2,
        }}>
          TAP ⏻ TO TURN ON
        </p>
      )}
    </div>
  );
};

export default TVStage;

