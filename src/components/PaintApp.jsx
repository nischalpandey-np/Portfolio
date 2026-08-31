import { useEffect, useRef, useState, useCallback } from "react";

const COLORS = [
  "#000000", "#808080", "#C0C0C0", "#FFFFFF",
  "#800000", "#FF0000", "#FF8040", "#FF8000",
  "#808000", "#FFFF00", "#00FF00", "#008000",
  "#008080", "#00FFFF", "#0000FF", "#000080",
  "#800080", "#FF00FF", "#FF69B4", "#FFA500",
];

const TOOLS = [
  { id: "pencil", emoji: "✏️", label: "Pencil" },
  { id: "eraser", emoji: "⬜", label: "Eraser" },
  { id: "fill",   emoji: "🪣", label: "Fill" },
];

/**
 * PaintApp — MS Paint-style canvas app displayed in an XP window.
 * Lets visitors draw and save their artwork to the Gallery.
 */
const PaintApp = ({ onClose, onSave }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const painting = useRef(false);
  const lastPt = useRef(null);
  const winRef = useRef(null);
  const dragging = useRef(false);
  const winOffset = useRef({ x: 0, y: 0 });
  const [winPos, setWinPos] = useState({ x: 60, y: 40 });

  // Canvas dimensions
  const W = 500, H = 340;

  // Fill canvas with white on mount
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);
  }, []);

  // Keyboard close
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const getPoint = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Flood fill algorithm
  const floodFill = useCallback((ctx, startX, startY, fillColor) => {
    const imgData = ctx.getImageData(0, 0, W, H);
    const data = imgData.data;
    const idx = (y, x) => (y * W + x) * 4;
    const start = idx(Math.floor(startY), Math.floor(startX));
    const sr = data[start], sg = data[start+1], sb = data[start+2], sa = data[start+3];

    // Parse fill color
    const fr = parseInt(fillColor.slice(1,3), 16);
    const fg = parseInt(fillColor.slice(3,5), 16);
    const fb = parseInt(fillColor.slice(5,7), 16);
    if (sr===fr && sg===fg && sb===fb) return;

    const match = (i) =>
      Math.abs(data[i]-sr)<20 && Math.abs(data[i+1]-sg)<20 &&
      Math.abs(data[i+2]-sb)<20 && Math.abs(data[i+3]-sa)<20;

    const stack = [[Math.floor(startX), Math.floor(startY)]];
    const visited = new Uint8Array(W * H);

    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= W || y < 0 || y >= H) continue;
      const i = idx(y, x);
      if (visited[y*W+x] || !match(i)) continue;
      visited[y*W+x] = 1;
      data[i]=fr; data[i+1]=fg; data[i+2]=fb; data[i+3]=255;
      stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
    }
    ctx.putImageData(imgData, 0, 0);
  }, []);

  const draw = useCallback((e) => {
    if (!painting.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pt = getPoint(e, canvas);

    ctx.lineWidth = tool === "eraser" ? size * 3 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;

    if (lastPt.current) {
      ctx.beginPath();
      ctx.moveTo(lastPt.current.x, lastPt.current.y);
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
    }
    lastPt.current = pt;
    setPos({ x: Math.round(pt.x), y: Math.round(pt.y) });
  }, [tool, color, size]);

  const startDraw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pt = getPoint(e, canvas);

    if (tool === "fill") {
      floodFill(ctx, pt.x, pt.y, color);
      return;
    }
    painting.current = true;
    lastPt.current = pt;
    // Draw a dot on mousedown
    ctx.fillStyle = tool === "eraser" ? "#FFFFFF" : color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, (tool === "eraser" ? size * 3 : size) / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const endDraw = () => {
    painting.current = false;
    lastPt.current = null;
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);
  };

  const saveToGallery = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const saved = JSON.parse(localStorage.getItem("np_gallery") || "[]");
    saved.unshift({ id: Date.now(), url: dataUrl });
    localStorage.setItem("np_gallery", JSON.stringify(saved.slice(0, 30)));
    onSave?.();
    // Flash feedback
    const ctx = canvasRef.current.getContext("2d");
    ctx.save();
    ctx.fillStyle = "rgba(0,200,100,0.3)";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
    setTimeout(() => {
      const c2 = canvasRef.current.getContext("2d");
      c2.save();
      c2.clearRect(0,0,W,H);
      c2.restore();
      const img = new Image();
      img.onload = () => c2.drawImage(img, 0, 0);
      img.src = dataUrl;
    }, 200);
  };

  // Window dragging
  const onWinDragStart = (e) => {
    if (e.target.closest(".xp-btn")) return;
    dragging.current = true;
    const rect = winRef.current.getBoundingClientRect();
    winOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    window.addEventListener("mousemove", onWinDrag);
    window.addEventListener("mouseup", onWinDragEnd);
  };
  const onWinDrag = (e) => {
    if (!dragging.current) return;
    setWinPos({
      x: Math.max(0, e.clientX - winOffset.current.x),
      y: Math.max(0, e.clientY - winOffset.current.y),
    });
  };
  const onWinDragEnd = () => {
    dragging.current = false;
    window.removeEventListener("mousemove", onWinDrag);
    window.removeEventListener("mouseup", onWinDragEnd);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={winRef}
        className="xp-window"
        style={{
          position: "absolute",
          left: winPos.x,
          top: winPos.y,
          width: "min(600px, 95vw)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "4px 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title Bar */}
        <div className="xp-titlebar" onMouseDown={onWinDragStart} style={{cursor:"move"}}>
          <span className="xp-titlebar-icon">🎨</span>
          <span className="xp-titlebar-title">Paint — Leave your mark!</span>
          <div className="xp-titlebar-btns">
            <button className="xp-btn" title="Minimize" onClick={onClose}>─</button>
            <button className="xp-btn close" title="Close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Menu bar */}
        <div style={{
          background: "#f0f0f0",
          borderBottom: "1px solid #aaa",
          padding: "2px 6px",
          display: "flex",
          gap: "12px",
          flexShrink: 0,
        }}>
          {["File","Edit","View","Image","Colors","Help"].map(m => (
            <span key={m} style={{
              fontSize: 12,
              fontFamily: "var(--font-system)",
              cursor: "default",
              padding: "1px 4px",
              color: "#000",
            }}
              onMouseEnter={e=>e.target.style.background="#316ac5"}
              onMouseLeave={e=>e.target.style.background=""}
            >{m}</span>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{
          background: "linear-gradient(180deg,#f8f8f8 0%,#e8e8e8 100%)",
          borderBottom: "1px solid #aaa",
          padding: "3px 6px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexShrink: 0,
          flexWrap: "wrap",
        }}>
          {TOOLS.map(t => (
            <button
              key={t.id}
              className={`paint-tool-btn ${tool === t.id ? "active" : ""}`}
              title={t.label}
              onClick={() => setTool(t.id)}
            >
              {t.emoji}
            </button>
          ))}
          <div style={{width:1,height:24,background:"#aaa",margin:"0 2px"}} />
          <label style={{fontSize:11,fontFamily:"var(--font-system)",color:"#444"}}>Size:</label>
          <input
            type="range" min="1" max="20" value={size}
            className="paint-size-slider"
            onChange={e => setSize(+e.target.value)}
          />
          <span style={{fontSize:11,fontFamily:"var(--font-system)",color:"#444",minWidth:16}}>{size}px</span>
          <div style={{width:1,height:24,background:"#aaa",margin:"0 2px"}} />
          <button className="retro-button" style={{fontSize:10,padding:"2px 8px"}} onClick={clearCanvas}>🗑 Clear</button>
          <button
            className="retro-button"
            style={{fontSize:10,padding:"2px 8px",background:"linear-gradient(180deg,#60c060,#3a9a3a)",color:"#fff",border:"2px outset #80e080"}}
            onClick={saveToGallery}
          >
            💾 Save to Gallery
          </button>
        </div>

        {/* Canvas area */}
        <div style={{display:"flex",flex:1,overflow:"hidden",minHeight:0}}>
          {/* Toolbox side */}
          <div className="paint-toolbox">
            {TOOLS.map(t => (
              <button
                key={t.id}
                className={`paint-tool-btn ${tool===t.id?"active":""}`}
                title={t.label}
                onClick={() => setTool(t.id)}
                style={{width:28,height:28,fontSize:14}}
              >{t.emoji}</button>
            ))}
          </div>

          {/* Canvas */}
          <div className="paint-canvas-wrap">
            <canvas
              ref={canvasRef}
              width={W}
              height={H}
              className="paint-canvas"
              style={{
                cursor: tool==="eraser"?"cell":tool==="fill"?"crosshair":"crosshair",
                maxWidth:"100%",
                height:"auto",
              }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
            />
          </div>
        </div>

        {/* Color palette */}
        <div className="paint-palette">
          {/* Current color preview */}
          <div style={{
            width:36,height:36,
            background:`linear-gradient(135deg,${color} 60%,#fff 60%)`,
            border:"2px inset #888",
            borderRadius:2,
            marginRight:4,
            flexShrink:0,
            boxShadow:"inset 0 0 4px rgba(0,0,0,0.3)",
          }} title={`Active: ${color}`}/>
          {COLORS.map(c => (
            <button
              key={c}
              className={`paint-color-btn ${color===c?"selected":""}`}
              style={{background:c}}
              title={c}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        {/* Status bar */}
        <div className="paint-status">
          <span>Tool: {TOOLS.find(t=>t.id===tool)?.label}</span>
          <span>Color: {color}</span>
          <span>Size: {size}px</span>
          <span>{pos.x}, {pos.y}px</span>
          <span style={{marginLeft:"auto",color:"#4a4a"}}>💾 Saves to Gallery</span>
        </div>
      </div>
    </div>
  );
};

export default PaintApp;
