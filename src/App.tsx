import { Option } from 'effect';
import { constVoid } from 'effect/Function';
import { useState } from 'react';
import { match } from 'ts-pattern';

interface SquareProps {
  value: Option.Option<string>;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {Option.getOrNull(value)}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<readonly Option.Option<string>[]>(
    Array(9).fill(Option.none())
  );

  function handleClick(i: number) {
    Option.match(squares[i], {
      onNone: () => {
        const nextSquares = [...squares];
        nextSquares[i] = match(xIsNext)
          .with(true, () => Option.some('X'))
          .otherwise(() => Option.some('O'));
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
      },
      onSome: constVoid,
    });
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
