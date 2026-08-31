import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Constants ─────────────────────────────────────────────── */
const ROWS = 9, COLS = 9, MINES = 10;

const makeGrid = () =>
  Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => ({
      r, c, mine: false, revealed: false, flagged: false, adj: 0,
    }))
  );

const placeMines = (grid, firstR, firstC) => {
  const flat = grid.flat();
  let placed = 0;
  while (placed < MINES) {
    const i = Math.floor(Math.random() * flat.length);
    const cell = flat[i];
    if (!cell.mine && !(cell.r === firstR && cell.c === firstC)) {
      cell.mine = true;
      placed++;
    }
  }
  // Count adjacents
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc].mine) n++;
        }
      grid[r][c].adj = n;
    }
  return grid;
};

const flood = (grid, r, c) => {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
  const cell = grid[r][c];
  if (cell.revealed || cell.flagged || cell.mine) return;
  cell.revealed = true;
  if (cell.adj === 0)
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++)
        flood(grid, r + dr, c + dc);
};

const ADJ_COLORS = ["","#1a1aff","#008200","#ff1a1a","#00007f","#820000","#008282","#820082","#000"];

/* ─── Minesweeper Component (TV Version) ──────────────────────── */
const Minesweeper = () => {
  const [grid, setGrid]       = useState(makeGrid);
  const [status, setStatus]   = useState("idle"); // idle | playing | won | lost
  const [minesLeft, setMinesLeft] = useState(MINES);
  const [time, setTime]       = useState(0);
  const [face, setFace]       = useState("😊");
  const timerRef  = useRef(null);

  // Timer
  useEffect(() => {
    if (status === "playing") {
      timerRef.current = setInterval(() => setTime(t => Math.min(t + 1, 999)), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [status]);

  const reset = useCallback(() => {
    setGrid(makeGrid());
    setStatus("idle");
    setMinesLeft(MINES);
    setTime(0);
    setFace("😊");
  }, []);

  const reveal = (r, c) => {
    if (status === "won" || status === "lost") return;
    const g = grid.map(row => row.map(cell => ({ ...cell })));
    const cell = g[r][c];
    if (cell.revealed || cell.flagged) return;

    let newStatus = status;
    if (status === "idle") {
      placeMines(g, r, c);
      newStatus = "playing";
      setStatus("playing");
    }

    if (cell.mine) {
      g.flat().forEach(cl => { if (cl.mine) cl.revealed = true; });
      cell.exploded = true;
      setStatus("lost");
      setFace("😵");
      setGrid(g);
      return;
    }

    flood(g, r, c);
    const unrevealed = g.flat().filter(cl => !cl.revealed && !cl.mine).length;
    if (unrevealed === 0) {
      setStatus("won");
      setFace("😎");
      g.flat().forEach(cl => { if (cl.mine) cl.flagged = true; });
      setMinesLeft(0);
    }
    setGrid(g);
    if (newStatus === "playing" && status === "idle") setStatus("playing");
  };

  const flag = (e, r, c) => {
    e.preventDefault();
    if (status === "won" || status === "lost" || status === "idle") return;
    const g = grid.map(row => row.map(cell => ({ ...cell })));
    const cell = g[r][c];
    if (cell.revealed) return;
    cell.flagged = !cell.flagged;
    setMinesLeft(m => cell.flagged ? m - 1 : m + 1);
    setGrid(g);
  };

  const lcd = (n, digits = 3) => String(Math.max(0, Math.min(999, n))).padStart(digits, "0");

  return (
    <div style={{
      width:"100%", height:"100%", background:"#c0c0c0", userSelect:"none",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    }}>
      <div style={{
        background:"#c0c0c0", padding:"8px",
        border:"3px solid", borderColor:"#fff #808080 #808080 #fff",
        boxShadow:"0 10px 30px rgba(0,0,0,0.5)"
      }}>
        {/* Control bar */}
        <div style={{
          background:"#c0c0c0", border:"3px solid", borderColor:"#808080 #fff #fff #808080",
          padding:"6px 8px", display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:6,
        }}>
          <div style={{
            background:"#000", color:"#f00", fontFamily:"'Courier New',monospace",
            fontSize:24, fontWeight:"bold", padding:"2px 6px", letterSpacing:2,
            border:"2px inset #808080", minWidth:48, textAlign:"right",
          }}>{lcd(minesLeft)}</div>

          <button onClick={reset} style={{
            fontSize:20, background:"#c0c0c0", border:"2px solid",
            borderColor:"#fff #808080 #808080 #fff",
            cursor:"pointer", padding:"2px 6px", lineHeight:1,
          }}
          onMouseDown={e=>e.currentTarget.style.borderColor="#808080 #fff #fff #808080"}
          onMouseUp={e=>e.currentTarget.style.borderColor="#fff #808080 #808080 #fff"}
          >{face}</button>

          <div style={{
            background:"#000", color:"#f00", fontFamily:"'Courier New',monospace",
            fontSize:24, fontWeight:"bold", padding:"2px 6px", letterSpacing:2,
            border:"2px inset #808080", minWidth:48, textAlign:"right",
          }}>{lcd(time)}</div>
        </div>

        {/* Grid */}
        <div style={{ border:"3px solid", borderColor:"#808080 #fff #fff #808080", display:"inline-block" }}>
          {grid.map((row, r) => (
            <div key={r} style={{display:"flex"}}>
              {row.map((cell, c) => {
                let content = "";
                let bg = "#c0c0c0", border = "2px solid", borderColor = "#fff #808080 #808080 #fff";
                let color = ADJ_COLORS[cell.adj] || "#000", fontSize = 14;

                if (cell.revealed) {
                  border = "1px solid #808080"; borderColor = "#808080"; bg = "#c0c0c0";
                  if (cell.mine) { content = "💣"; bg = cell.exploded ? "#f00" : "#c0c0c0"; fontSize = 12; }
                  else if (cell.adj > 0) content = cell.adj;
                } else if (cell.flagged) {
                  content = "🚩"; fontSize = 12;
                }

                return (
                  <div key={c}
                    onClick={() => reveal(r, c)}
                    onContextMenu={(e) => flag(e, r, c)}
                    onMouseDown={() => { if (!cell.revealed && !cell.flagged) setFace("😮"); }}
                    onMouseUp={() => { if (status !== "won" && status !== "lost") setFace("😊"); }}
                    style={{
                      width:24, height:24, display:"flex", alignItems:"center", justifyContent:"center",
                      cursor: status === "won" || status === "lost" ? "default" : "pointer",
                      background:bg, border, borderColor, color, fontSize,
                      fontFamily:"'Courier New',monospace", fontWeight:"bold", boxSizing:"border-box", flexShrink:0,
                    }}
                  >{content}</div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
