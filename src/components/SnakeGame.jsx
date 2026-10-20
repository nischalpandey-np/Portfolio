import { useEffect, useReducer, useRef } from "react";
import ScaleToFit from "./ScaleToFit";
import { readJSON, writeJSON } from "../lib/storage";

const COLS = 20, ROWS = 16, CELL = 18;
const TICK_MS = 120;
const BEST_KEY = "np_snake_best";

const KEYS = {
  ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
  w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
};

const randomFood = (snake) => {
  let pos;
  do pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
};

const initialState = (best = 0) => ({
  best,
  snake: [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }],
  food: { x: 15, y: 5 },
  dir: { x: 1, y: 0 },  // direction applied on the last tick
  next: { x: 1, y: 0 }, // direction queued for the next tick
  status: "idle",       // idle | playing | paused | dead
  score: 0,
});

function reducer(state, action) {
  switch (action.type) {
    case "turn": {
      if (state.status === "dead") return state;
      const [x, y] = action.dir;
      // Compare against the applied direction so two quick presses can't reverse into yourself.
      const reverse = x === -state.dir.x && y === -state.dir.y;
      return {
        ...state,
        next: reverse ? state.next : { x, y },
        status: "playing",
      };
    }
    case "start":
      if (state.status === "dead") return { ...initialState(state.best), status: "playing" };
      return { ...state, status: "playing" };
    case "pause":
      return state.status === "playing" ? { ...state, status: "paused" } : state;
    case "tick": {
      if (state.status !== "playing") return state;
      const dir = state.next;
      const head = { x: state.snake[0].x + dir.x, y: state.snake[0].y + dir.y };
      const ate = head.x === state.food.x && head.y === state.food.y;
      const body = ate ? state.snake : state.snake.slice(0, -1);
      const hitWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
      if (hitWall || body.some((s) => s.x === head.x && s.y === head.y)) {
        return { ...state, dir, status: "dead" };
      }
      const snake = [head, ...body];
      const score = state.score + (ate ? 10 : 0);
      return {
        ...state,
        dir,
        snake,
        food: ate ? randomFood(snake) : state.food,
        score,
        best: Math.max(state.best, score),
      };
    }
    default:
      return state;
  }
}

const pad = (n) => String(n).padStart(5, "0");

const SnakeGame = ({ mode = "tv" }) => {
  const [state, dispatch] = useReducer(reducer, undefined, () => initialState(Number(readJSON(BEST_KEY, 0)) || 0));
  const boardRef = useRef(null);
  const swipe = useRef(null);
  const { snake, food, status, score, best } = state;

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => dispatch({ type: "tick" }), TICK_MS);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (best > 0) writeJSON(BEST_KEY, best);
  }, [best]);

  const onKeyDown = (e) => {
    const dir = KEYS[e.key];
    if (dir) {
      e.preventDefault();
      dispatch({ type: "turn", dir });
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      dispatch({ type: "start" });
    }
  };

  const turn = (dir) => {
    boardRef.current?.focus({ preventScroll: true });
    dispatch({ type: "turn", dir });
  };

  const start = () => {
    boardRef.current?.focus({ preventScroll: true });
    dispatch({ type: "start" });
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e) => {
    if (!swipe.current) return;
    const dx = e.clientX - swipe.current.x;
    const dy = e.clientY - swipe.current.y;
    swipe.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
    turn(Math.abs(dx) > Math.abs(dy) ? [Math.sign(dx), 0] : [0, Math.sign(dy)]);
  };

  const board = (
    <div className="snake">
      <div className="snake__score" aria-hidden="true">
        <span>SCORE <b className="snake__num">{pad(score)}</b></span>
        <span>BEST <b className="snake__num snake__num--best">{pad(best)}</b></span>
      </div>
      <div
        ref={boardRef}
        className="snake__board"
        style={{ width: COLS * CELL, height: ROWS * CELL }}
        tabIndex={0}
        role="application"
        aria-label={`Snake. Score ${score}. Use the arrow keys to steer; Space to start.`}
        onKeyDown={onKeyDown}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) dispatch({ type: "pause" });
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className="snake__food"
          style={{ left: food.x * CELL + 3, top: food.y * CELL + 3, width: CELL - 6, height: CELL - 6 }}
        />
        {snake.map((s, i) => (
          <div
            key={i}
            className={i === 0 ? "snake__seg snake__seg--head" : "snake__seg"}
            style={{ left: s.x * CELL + 1, top: s.y * CELL + 1, width: CELL - 2, height: CELL - 2 }}
          />
        ))}

        {status !== "playing" && (
          <div className="snake__overlay">
            {status === "dead" ? (
              <>
                <p className="snake__overlay-title snake__overlay-title--dead">GAME OVER</p>
                <p>Score {score}</p>
              </>
            ) : (
              <>
                <p className="snake__overlay-title">{status === "paused" ? "PAUSED" : "SNAKE"}</p>
                <p>{mode === "window" ? "Arrow keys, swipe or the pad below" : "Arrow keys or WASD to steer"}</p>
              </>
            )}
            <button type="button" className="snake__start" onClick={start}>
              {status === "dead" ? "Play again" : status === "paused" ? "Resume" : "Start"}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`snake-wrap snake-wrap--${mode}`}>
      <div className="snake-wrap__stage">
        <ScaleToFit max={mode === "window" ? 1.4 : 1.6}>{board}</ScaleToFit>
      </div>
      {mode === "window" && (
        <div className="snake-pad" role="group" aria-label="Direction pad">
          <button type="button" className="xp-button snake-pad__up" onClick={() => turn([0, -1])} aria-label="Up">▲</button>
          <button type="button" className="xp-button snake-pad__left" onClick={() => turn([-1, 0])} aria-label="Left">◀</button>
          <button type="button" className="xp-button snake-pad__down" onClick={() => turn([0, 1])} aria-label="Down">▼</button>
          <button type="button" className="xp-button snake-pad__right" onClick={() => turn([1, 0])} aria-label="Right">▶</button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {status === "dead" ? `Game over. Score ${score}.` : ""}
      </p>
    </div>
  );
};

export default SnakeGame;
