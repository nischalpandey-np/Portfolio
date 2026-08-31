import { useState, useEffect, useRef } from "react";

const COLS = 20, ROWS = 16, CELL = 18;
const DIR = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0] };

const rnd = (snake = []) => {
  let pos;
  do { pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }; }
  while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
};
const initSnake = () => [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }];

/* ─── Snake Game Component (TV Version) ─────────────────────── */
const SnakeGame = () => {
  const [snake, setSnake]   = useState(initSnake);
  const [food, setFood]     = useState({ x: 15, y: 5 });
  const [dir, setDir]       = useState({ x: 1, y: 0 });
  const [status, setStatus] = useState("idle"); // idle | playing | dead
  const [score, setScore]   = useState(0);
  const [best, setBest]     = useState(() => parseInt(localStorage.getItem("np_snake_best") || "0", 10));
  
  const dirRef    = useRef(dir);
  dirRef.current   = dir;

  // Keyboard controls
  useEffect(() => {
    const handler = (e) => {
      if (DIR[e.key]) {
        e.preventDefault();
        const [dx, dy] = DIR[e.key];
        if (dx !== 0 && dirRef.current.x !== 0) return;
        if (dy !== 0 && dirRef.current.y !== 0) return;
        setDir({ x: dx, y: dy });
        if (status === "idle") setStatus("playing");
      }
      if (e.key === " ") {
        e.preventDefault();
        if (status === "dead") reset();
        else if (status === "idle") setStatus("playing");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [status]);

  // Game loop
  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dirRef.current.x, y: prev[0].y + dirRef.current.y };
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          setStatus("dead");
          return prev;
        }
        if (prev.some(s => s.x === head.x && s.y === head.y)) {
          setStatus("dead");
          return prev;
        }
        const ate = head.x === food.x && head.y === food.y;
        const newSnake = ate ? [head, ...prev] : [head, ...prev.slice(0, -1)];
        if (ate) {
          setScore(s => {
            const ns = s + 10;
            setBest(b => {
              const nb = Math.max(b, ns);
              localStorage.setItem("np_snake_best", String(nb));
              return nb;
            });
            return ns;
          });
          setFood(rnd(newSnake));
        }
        return newSnake;
      });
    }, 120);
    return () => clearInterval(id);
  }, [status, food]);

  const reset = () => {
    setSnake(initSnake());
    setDir({ x: 1, y: 0 });
    setFood({ x: 15, y: 5 });
    setScore(0);
    setStatus("idle");
  };

  return (
    <div style={{
      width:"100%", height:"100%", background:"#1a1a1a", userSelect:"none",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    }}>
      <div style={{ background:"#c0c0c0", padding:"6px", boxShadow:"0 10px 30px rgba(0,0,0,0.5)" }}>
        {/* Score bar */}
        <div style={{
          background:"#c0c0c0", border:"3px solid", borderColor:"#808080 #fff #fff #808080",
          padding:"4px 10px", marginBottom:6, display:"flex", justifyContent:"space-between",
          fontFamily:"'Courier New',monospace", fontSize:14, fontWeight:"bold",
        }}>
          <span>SCORE: <span style={{color:"#00008b"}}>{String(score).padStart(5,"0")}</span></span>
          <span>BEST: <span style={{color:"#8b0000"}}>{String(best).padStart(5,"0")}</span></span>
        </div>

        {/* Canvas */}
        <div style={{
          position:"relative", border:"3px solid", borderColor:"#808080 #fff #fff #808080",
          width: COLS * CELL, height: ROWS * CELL, background:"#000", overflow:"hidden",
          flexShrink:0,
        }}>
          {/* Grid lines */}
          <svg style={{position:"absolute",inset:0,opacity:0.07}} width={COLS*CELL} height={ROWS*CELL}>
            {Array.from({length:COLS+1},(_,i)=>(<line key={`v${i}`} x1={i*CELL} y1={0} x2={i*CELL} y2={ROWS*CELL} stroke="#fff" strokeWidth="1"/>))}
            {Array.from({length:ROWS+1},(_,i)=>(<line key={`h${i}`} x1={0} y1={i*CELL} x2={COLS*CELL} y2={i*CELL} stroke="#fff" strokeWidth="1"/>))}
          </svg>

          {/* Food */}
          <div style={{
            position:"absolute", left: food.x * CELL + 2, top: food.y * CELL + 2,
            width: CELL - 4, height: CELL - 4, background:"#f00", borderRadius:"50%",
            boxShadow:"0 0 6px #f00, 0 0 12px #f00",
          }}/>

          {/* Snake */}
          {snake.map((s, i) => (
            <div key={i} style={{
              position:"absolute", left: s.x * CELL + 1, top: s.y * CELL + 1,
              width: CELL - 2, height: CELL - 2, background: i === 0 ? "#00e676" : "#00c853",
              borderRadius: i === 0 ? 4 : 2, boxShadow: i === 0 ? "0 0 4px #00e676" : "none",
            }}/>
          ))}

          {/* Overlay messages */}
          {status === "idle" && (
            <div style={{
              position:"absolute", inset:0, display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.75)",
              color:"#0f0", fontFamily:"'Courier New',monospace", fontSize:14, gap:8,
            }}>
              <div style={{fontSize:22}}>🐍 SNAKE</div>
              <div>Use ← → ↑ ↓ to move</div>
              <div style={{opacity:0.7, fontSize:12}}>Press SPACE or arrow to start</div>
            </div>
          )}
          {status === "dead" && (
            <div style={{
              position:"absolute", inset:0, display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.8)",
              color:"#f00", fontFamily:"'Courier New',monospace", fontSize:14, gap:10,
            }}>
              <div style={{fontSize:22}}>💀 GAME OVER</div>
              <div style={{color:"#fff"}}>Score: {score}</div>
              <button onClick={reset} style={{
                marginTop:4, background:"#008000", color:"#fff", border:"2px solid", borderColor:"#fff #404040 #404040 #fff",
                padding:"4px 16px", cursor:"pointer", fontFamily:"inherit", fontSize:14,
              }}>▶ Play Again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const dpadBtn = {
  width:32, height:32, background:"#c0c0c0", border:"2px solid",
  borderColor:"#fff #808080 #808080 #fff", cursor:"pointer",
  display:"flex", alignItems:"center", justifyContent:"center",
  fontFamily:"var(--font-system)", fontSize:14,
};

export default SnakeGame;
