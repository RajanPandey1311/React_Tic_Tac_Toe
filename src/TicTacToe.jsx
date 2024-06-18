import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const getInitialScore = () => {
    const savedScore = localStorage.getItem('tic-tac-toe-score');
    return savedScore ? JSON.parse(savedScore) : { X: 0, O: 0 };
  };

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState(getInitialScore);

  useEffect(() => {
    localStorage.setItem('tic-tac-toe-score', JSON.stringify(score));
  }, [score]);

  const calculateWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(board) || newBoard[index]) {
      return;
    }
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    const winner = calculateWinner(newBoard);
    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
    }
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    return (
      <button
        onClick={() => handleClick(index)}
        className={`w-16 h-16 flex items-center justify-center border ${board[index] === 'X' ? 'text-blue-500' : 'text-red-500'}`}
      >
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next move of player: ${isXNext ? 'X (Blue)' : 'O (Red)'}`;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-teal-300 rounded shadow">
      <h1 className="text-2xl text-center font-bold mb-4">Tic-Tac-Toe</h1>
      <div className="mb-4">
        <div className="flex justify-between mb-2 gap-6">
          <span className="text-blue-500">Player X (Blue): {score.X}</span>
          <span className="text-red-500">Player O (Red): {score.O}</span>
        </div>
        <div className="text-lg font-semibold mb-2">{status}</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <div className='flex justify-center'>
      <button
        onClick={resetGame}
        className="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-900"
      >
        Reset Game
      </button>
      </div>
    </div>
  );
};

export default TicTacToe;