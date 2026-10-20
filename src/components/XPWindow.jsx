import { useEffect, useId, useRef, useState } from "react";
import { useScrollLock } from "../lib/motion";

/**
 * XPWindow — a Windows XP-style window rendered in a native modal <dialog>.
 * The dialog gives us focus trapping, Escape-to-close and an inert page
 * for free. On mouse/pen devices the title bar can be dragged.
 */
const XPWindow = ({ title, icon, onClose, className = "", status, children }) => {
  const dialogRef = useRef(null);
  const drag = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const titleId = useId();
  useScrollLock();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const onPointerDown = (e) => {
    if (e.pointerType === "touch" || e.button !== 0 || e.target.closest("button")) return;
    drag.current = { startX: e.clientX - offset.x, startY: e.clientY - offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current) return;
    setOffset({ x: e.clientX - drag.current.startX, y: e.clientY - drag.current.startY });
  };

  const endDrag = () => {
    drag.current = null;
  };

  return (
    <dialog
      ref={dialogRef}
      className="xp-dialog"
      aria-labelledby={titleId}
      style={{ translate: `${offset.x}px ${offset.y}px` }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`xp-window ${className}`}>
        <div
          className="xp-titlebar xp-titlebar--draggable"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {icon && <span aria-hidden="true">{icon}</span>}
          <h2 id={titleId} className="xp-titlebar__title">{title}</h2>
          <button type="button" className="xp-close" onClick={onClose} aria-label={`Close ${title}`}>
            ✕
          </button>
        </div>
        <div className="xp-body">{children}</div>
        {status && <div className="xp-statusbar">{status}</div>}
      </div>
    </dialog>
  );
};

export default XPWindow;
