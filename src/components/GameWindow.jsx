import XPWindow from "./XPWindow";
import SnakeGame from "./SnakeGame";
import Minesweeper from "./Minesweeper";

/** Full-size window for the games, used on small screens or via "Full size". */
const GameWindow = ({ game, onClose }) => (
  <XPWindow
    title={game === "snake" ? "Snake" : "Minesweeper"}
    icon={game === "snake" ? "🐍" : "💣"}
    onClose={onClose}
    className="game-window"
  >
    <div className="game-window__stage">
      {game === "snake" ? <SnakeGame mode="window" /> : <Minesweeper />}
    </div>
  </XPWindow>
);

export default GameWindow;
