import { useCallback, useEffect, useRef, useState } from "react";
import XPWindow from "./XPWindow";
import { GALLERY_KEY, readJSON, writeJSON } from "../lib/storage";

const MAX_SAVED = 30;
const W = 500, H = 340;

const COLORS = [
  "#000000", "#808080", "#C0C0C0", "#FFFFFF",
  "#800000", "#FF0000", "#FF8040", "#FF8000",
  "#808000", "#FFFF00", "#00FF00", "#008000",
  "#008080", "#00FFFF", "#0000FF", "#000080",
  "#800080", "#FF00FF", "#FF69B4", "#FFA500",
];

const TOOLS = [
  { id: "pencil", icon: "✏️", label: "Pencil" },
  { id: "eraser", icon: "🧽", label: "Eraser" },
  { id: "fill", icon: "🪣", label: "Fill" },
];

function floodFill(ctx, startX, startY, hex) {
  const img = ctx.getImageData(0, 0, W, H);
  const data = img.data;
  const x0 = Math.floor(startX), y0 = Math.floor(startY);
  const at = (x, y) => (y * W + x) * 4;
  const s = at(x0, y0);
  const [sr, sg, sb] = [data[s], data[s + 1], data[s + 2]];
  const fr = parseInt(hex.slice(1, 3), 16);
  const fg = parseInt(hex.slice(3, 5), 16);
  const fb = parseInt(hex.slice(5, 7), 16);
  if (sr === fr && sg === fg && sb === fb) return;

  const matches = (i) =>
    Math.abs(data[i] - sr) < 24 && Math.abs(data[i + 1] - sg) < 24 && Math.abs(data[i + 2] - sb) < 24;
  const seen = new Uint8Array(W * H);
  const stack = [[x0, y0]];
  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || x >= W || y < 0 || y >= H || seen[y * W + x]) continue;
    const i = at(x, y);
    if (!matches(i)) continue;
    seen[y * W + x] = 1;
    data[i] = fr; data[i + 1] = fg; data[i + 2] = fb; data[i + 3] = 255;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
  ctx.putImageData(img, 0, 0);
}

/** Paint — draw something and save it to the gallery in this browser. */
const PaintApp = ({ onClose, onSaved }) => {
  const canvasRef = useRef(null);
  const last = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);
  const [pos, setPos] = useState(null);
  const [message, setMessage] = useState("");

  const clear = useCallback(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);
  }, []);

  useEffect(clear, [clear]);

  const point = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * W) / rect.width,
      y: ((e.clientY - rect.top) * H) / rect.height,
    };
  };

  const strokeStyle = (ctx) => {
    const width = tool === "eraser" ? size * 3 : size;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = ctx.fillStyle = tool === "eraser" ? "#FFFFFF" : color;
    return width;
  };

  const onPointerDown = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    const pt = point(e);
    if (tool === "fill") {
      floodFill(ctx, pt.x, pt.y, color);
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    const width = strokeStyle(ctx);
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, width / 2, 0, Math.PI * 2);
    ctx.fill();
    last.current = pt;
  };

  const onPointerMove = (e) => {
    const pt = point(e);
    setPos({ x: Math.round(pt.x), y: Math.round(pt.y) });
    if (!last.current) return;
    const ctx = canvasRef.current.getContext("2d");
    strokeStyle(ctx);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    last.current = pt;
  };

  const endStroke = () => {
    last.current = null;
  };

  const save = () => {
    const url = canvasRef.current.toDataURL("image/png");
    const saved = readJSON(GALLERY_KEY, []);
    const ok = writeJSON(GALLERY_KEY, [{ id: Date.now(), url }, ...saved].slice(0, MAX_SAVED));
    if (ok) onSaved();
    else setMessage("Couldn't save — this browser is blocking storage.");
  };

  const toolLabel = TOOLS.find((t) => t.id === tool).label;

  return (
    <XPWindow
      title="Paint — leave a drawing"
      icon="🎨"
      onClose={onClose}
      className="paint"
      status={
        <>
          <span>{toolLabel} · {size}px</span>
          <span>{pos ? `${pos.x}, ${pos.y}` : "—"}</span>
          <span role="status" style={{ marginLeft: "auto" }}>{message || "Saves to the gallery in this browser"}</span>
        </>
      }
    >
      <div className="paint__toolbar">
        <div className="paint__tools" role="group" aria-label="Tools">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              className="paint-tool"
              aria-pressed={tool === t.id}
              aria-label={t.label}
              title={t.label}
              onClick={() => setTool(t.id)}
            >
              <span aria-hidden="true">{t.icon}</span>
            </button>
          ))}
        </div>
        <label className="paint__size">
          Size
          <input type="range" min="1" max="20" value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <div className="paint__actions">
          <button type="button" className="xp-button" onClick={clear}>Clear</button>
          <button type="button" className="xp-button xp-button--primary" onClick={save}>Save to gallery</button>
        </div>
      </div>

      <div className="paint__canvas-wrap">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="paint__canvas"
          aria-label="Drawing canvas"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
          onPointerLeave={() => setPos(null)}
        />
      </div>

      <div className="paint__palette" role="group" aria-label="Colours">
        <span className="paint__current" style={{ background: color }} aria-hidden="true" />
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className="paint-swatch"
            style={{ background: c }}
            aria-pressed={color === c}
            aria-label={`Colour ${c}`}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
    </XPWindow>
  );
};

export default PaintApp;
