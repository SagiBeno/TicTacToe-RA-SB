import React, { useState, useEffect } from 'react';
// npm install express cors react-toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // with custom childish styles

function TicTacToe() {
  const emptyBoard = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  const [board, setBoard] = useState(emptyBoard);
  const [nextPlayer, setNextPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    console.log('Board changed:', board);
  }, [board]); 

  const postResult = async (result) => {
    // TODO - implement backend POST
    await fetch('http://localhost:3333/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result })
    });
  };
  // TODO - implement backend GET: query previous match results

  const calculateWinner = function(board) {/* TODO - implement */}

  const handleClick = (idx) => {
    console.log('handleClick idx: ', idx)
    //TODO - if (board[idx] || winner) return;
    const newBoard = board.slice()
    console.log('newBoard: ', newBoard[idx[0], idx[1]])
   
    
    setBoard(newBoard);
    setNextPlayer('O'); // TODO
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      toast(`${win} wins!`);
      postResult(`${win} wins`);
    } else if (!newBoard.includes(null)) {
      toast('Draw!');
      postResult('Draw');
    }
  };

  const handleRestart = e => {
    e.preventDefault()
    setBoard(emptyBoard);
    setNextPlayer('X');
    setWinner(null);
    toast('Game restarted!');

  };

  const handleSurrender = () => {
    if (!winner) {
      setWinner(nextPlayer == 'X' ? 'O' : 'X');
      toast(nextPlayer == 'X' ? 'O wins!' : 'X wins!');
      postResult(nextPlayer == 'X' ? 'O wins' : 'X wins');
    }
  };

return (
  <div className="gameContainer">
    <h1>TicTacToe!</h1>
    <div className="grid">
      {
        [0,1,2].map(row => (
          <div className="board-row" key={row}>
            {[0,1,2].map(col => {
              const idx = [row, col] // TODO - recalculate button address index
              return (
                <button 
                  key={col}
                  className="square" 
                  onClick={() => handleClick(idx)}
                >
                  {board?.idx} {/* TODO */}
                </button>
              );
            })}
          </div>
        ))
      }
    </div>
    <div className="controls">
      <button onClick={handleRestart}>Restart</button>
      <button onClick={handleSurrender}>Surrender</button>
    </div>
    <ToastContainer position="top-center" />
  </div>
);
}

export default TicTacToe;
