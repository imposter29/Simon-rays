import { useState } from "react";
import "/Users/rithwikkuchana/Documents/SimonSays/simon-says/src/App.css";

export default function App() {
  const colors = ["red", "blue", "green", "yellow"];
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState("Press Start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const generateSequence = (length) => {
    return Array.from(
      { length },
      () => colors[Math.floor(Math.random() * colors.length)]
    );
  };

  const startGame = () => {
    const newSequence = generateSequence(1);
    setSequence(newSequence);
    setPlayerSequence([]);
    setGameStarted(true);
    setMessage("Watch the pattern");
    setScore(0);
    playSequence(newSequence);
  };

  const playSequence = (seq) => {
    let i = 0;
    const interval = setInterval(() => {
      setActiveColor(seq[i]);
      setTimeout(() => setActiveColor(null), 500);
      i++;
      if (i >= seq.length) {
        clearInterval(interval);
        setMessage("Your turn");
      }
    }, 800);
  };

  const handleClick = (color) => {
    if (!gameStarted || activeColor) return;

    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 200);

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (sequence[newPlayerSequence.length - 1] !== color) {
      setMessage("Wrong! Game Over");
      setScore(0);
      setGameStarted(false);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) setHighScore(newScore);
      setMessage("Good! Next level");
      const newSequence = [
        ...sequence,
        colors[Math.floor(Math.random() * colors.length)],
      ];
      setSequence(newSequence);
      setPlayerSequence([]);
      setTimeout(() => playSequence(newSequence), 1000);
    }
  };

  return (
    <div className="game">
      <h1>SIMON SAYS</h1>

      <div className="score-box">
        <div>
          Score: <span>{score}</span>
        </div>
        <div>
          Best: <span>{highScore}</span>
        </div>
      </div>

      <div className="message">{message}</div>

      <div className="board">
        {colors.map((color) => (
          <button
            key={color}
            className={`btn ${color} ${activeColor === color ? "active" : ""}`}
            onClick={() => handleClick(color)}
            disabled={!gameStarted || !!activeColor}
          />
        ))}
      </div>

      <button className="start-btn" onClick={startGame}>
        {gameStarted ? "Restart" : "Start"}
      </button>
      <div>
        <p>By Rithwik Kuchana</p>
      </div>
    </div>
  );
}
