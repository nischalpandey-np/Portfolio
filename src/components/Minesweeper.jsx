import { useEffect, useRef, useState } from "react";
import ScaleToFit from "./ScaleToFit";

const ROWS = 9, COLS = 9, MINES = 10;
const ADJ_COLORS = ["", "#1a1aff", "#008200", "#e01010", "#00007f", "#820000", "#008282", "#820082", "#000"];

const makeGrid = () =>
  Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => ({ r, c, mine: false, revealed: false, flagged: false, adj: 0 })),
  );

const neighbours = (r, c) => {
  const out = [];
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      const nr = r + dr, nc = c + dc;
      if ((dr || dc) && nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push([nr, nc]);
    }
  return out;
};

// Mines are placed after the first click, never on or around it,
// so the opening move always clears a patch of board.
const placeMines = (grid, firstR, firstC) => {
  const safe = new Set([`${firstR},${firstC}`, ...neighbours(firstR, firstC).map(([r, c]) => `${r},${c}`)]);
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (grid[r][c].mine || safe.has(`${r},${c}`)) continue;
    grid[r][c].mine = true;
    placed++;
  }
  for (const row of grid)
    for (const cell of row)
      cell.adj = neighbours(cell.r, cell.c).filter(([r, c]) => grid[r][c].mine).length;
};

const flood = (grid, r, c) => {
  const stack = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop();
    const cell = grid[cr][cc];
    if (cell.revealed || cell.flagged || cell.mine) continue;
    cell.revealed = true;
    if (cell.adj === 0) stack.push(...neighbours(cr, cc));
  }
};

const cellLabel = (cell) => {
  const pos = `Row ${cell.r + 1}, column ${cell.c + 1}`;
  if (cell.flagged && !cell.revealed) return `${pos}, flagged`;
  if (!cell.revealed) return `${pos}, hidden`;
  if (cell.mine) return `${pos}, mine`;
  return cell.adj ? `${pos}, ${cell.adj}` : `${pos}, empty`;
};

const lcd = (n) => String(Math.max(0, Math.min(999, n))).padStart(3, "0");

const Minesweeper = () => {
  const [grid, setGrid] = useState(makeGrid);
  const [status, setStatus] = useState("idle"); // idle | playing | won | lost
  const [time, setTime] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [focus, setFocus] = useState([0, 0]);
  const cellRefs = useRef([]);

  const over = status === "won" || status === "lost";
  const flags = grid.flat().filter((c) => c.flagged).length;

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => setTime((t) => Math.min(t + 1, 999)), 1000);
    return () => clearInterval(id);
  }, [status]);

  const reset = () => {
    setGrid(makeGrid());
    setStatus("idle");
    setTime(0);
  };

  const reveal = (r, c) => {
    if (over) return;
    const g = grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = g[r][c];
    if (cell.revealed || cell.flagged) return;

    if (status === "idle") {
      placeMines(g, r, c);
      setStatus("playing");
    }

    if (cell.mine) {
      g.flat().forEach((cl) => { if (cl.mine) cl.revealed = true; });
      cell.exploded = true;
      setStatus("lost");
      setGrid(g);
      return;
    }

    flood(g, r, c);
    if (g.flat().every((cl) => cl.revealed || cl.mine)) {
      g.flat().forEach((cl) => { if (cl.mine) cl.flagged = true; });
      setStatus("won");
    }
    setGrid(g);
  };

  const toggleFlag = (r, c) => {
    if (over || status === "idle") return;
    const g = grid.map((row) => row.map((cell) => ({ ...cell })));
    if (g[r][c].revealed) return;
    g[r][c].flagged = !g[r][c].flagged;
    setGrid(g);
  };

  const onCellKeyDown = (e, r, c) => {
    const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    if (moves[e.key]) {
      e.preventDefault();
      const nr = Math.min(ROWS - 1, Math.max(0, r + moves[e.key][0]));
      const nc = Math.min(COLS - 1, Math.max(0, c + moves[e.key][1]));
      setFocus([nr, nc]);
      cellRefs.current[nr * COLS + nc]?.focus();
    } else if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      toggleFlag(r, c);
    }
  };

  const face = status === "lost" ? "😵" : status === "won" ? "😎" : pressing ? "😮" : "🙂";

  return (
    <ScaleToFit max={1.5}>
      <div className="mines">
        <div className="mines__bar">
          <span className="mines__lcd" aria-label={`${MINES - flags} mines left`}>{lcd(MINES - flags)}</span>
          <button type="button" className="mines__face" onClick={reset} aria-label="New game">
            {face}
          </button>
          <span className="mines__lcd" aria-label={`${time} seconds`}>{lcd(time)}</span>
        </div>

        <div className="mines__grid" role="grid" aria-label="Minesweeper board" onContextMenu={(e) => e.preventDefault()}>
          {grid.map((row, r) => (
            <div key={r} role="row" className="mines__row">
              {row.map((cell, c) => {
                const content = cell.revealed
                  ? cell.mine ? "💣" : cell.adj || ""
                  : cell.flagged ? "🚩" : "";
                return (
                  <span role="gridcell" key={c}>
                    <button
                      type="button"
                      ref={(el) => { cellRefs.current[r * COLS + c] = el; }}
                      tabIndex={focus[0] === r && focus[1] === c ? 0 : -1}
                      className={[
                        "mines__cell",
                        cell.revealed && "mines__cell--open",
                        cell.exploded && "mines__cell--boom",
                      ].filter(Boolean).join(" ")}
                      style={{ color: ADJ_COLORS[cell.adj] }}
                      aria-label={cellLabel(cell)}
                      onFocus={() => setFocus([r, c])}
                      onClick={() => (flagMode ? toggleFlag(r, c) : reveal(r, c))}
                      onContextMenu={(e) => { e.preventDefault(); toggleFlag(r, c); }}
                      onPointerDown={() => !cell.revealed && !over && setPressing(true)}
                      onPointerUp={() => setPressing(false)}
                      onPointerLeave={() => setPressing(false)}
                      onKeyDown={(e) => onCellKeyDown(e, r, c)}
                    >
                      {content}
                    </button>
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mines__foot">
          <button
            type="button"
            className="mines__flag"
            aria-pressed={flagMode}
            onClick={() => setFlagMode((f) => !f)}
          >
            🚩 Flag mode
          </button>
          <span className="mines__hint">Right-click or F to flag</span>
        </div>
        <p className="sr-only" aria-live="polite">
          {status === "won" ? "Cleared. You win." : status === "lost" ? "You hit a mine. Game over." : ""}
        </p>
      </div>
    </ScaleToFit>
  );
};

export default Minesweeper;
