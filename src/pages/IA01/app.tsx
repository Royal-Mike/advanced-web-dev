import { useState } from 'react';
import './app.css';

function Square({ value, win, onSquareClick } : { value: string, win: boolean, onSquareClick: React.MouseEventHandler }) {
  return (
    <button className={`square ${win ? "win" : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay } : { xIsNext: boolean, squares: string[], onPlay: any }) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner.winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const rowsArray = [];

  for (let i = 0; i < 3; i++) {
    const squaresArray = [];

    for (let j = 0; j < 3; j++) {
      const value = i * 3 + j;
      const win = winner ? winner.line.indexOf(value) > -1 : false;
      squaresArray.push(
        <Square key={`square_${value}`} value={squares[value]} win={win} onSquareClick={() => handleClick(value)} />
      )
    }

    rowsArray.push(
      <div key={`row_${i}`} className="board-row">
        {squaresArray}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rowsArray}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{board: Array(9).fill(null), location: Array(2).fill(null)}]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].board;

  const [sortAscending, setSortAscending] = useState(true);

  function handlePlay(nextSquares: string[], i: number) {
    const nextLocation = [Math.floor(i / 3) + 1, (i % 3) + 1];
    const nextHistory = [...history.slice(0, currentMove + 1), {board: nextSquares, location: nextLocation}];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const location = `(row: ${squares.location[0]}, col: ${squares.location[1]})`;
    let description;
    if (move > 0) {
      description = `Go to move #${move} ${location}`
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {
          move === history.length - 1
          ? <>You are at move #{move} {move > 0 ? location : ''}</>
          : <button onClick={() => jumpTo(move)}>{description}</button>
        }
      </li>
    );
  });

  if (!sortAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setSortAscending(!sortAscending)}>Sort {sortAscending ? 'Descending' : 'Ascending'}</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c]};
    }
  }

  let flagTied = true;
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      flagTied = false;
      break;
    }
  }
  if (flagTied) return { winner: 'Draw', line: [] }

  return null;
}