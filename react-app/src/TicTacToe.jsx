import React, { useState, useEffect,Fragment } from 'react';
// npm install express cors react-toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // with custom childish styles

function TicTacToe() {

  const emptyBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
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

  const calculateWinner = function(board) {
    let win = false;

    for (let i = 0; i < 3; i++) {
      //row
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        win = true;
      } //column
      else if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        win = true;
      }
    }
    //diagonal
    if (board[0][0] && board[1][1] && board[2][2] //check not null
      && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      win = true;
    }
    else if (board[0][2] && board[1][1] && board[2][0] //check not null
      && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      win = true;
    }

    return win;
  }

  const handleClick = (idx) => {
    const newBoard = board.slice()

    newBoard[idx[0]][idx[1]] = nextPlayer;

    console.log('New board: ', newBoard);

    setBoard(newBoard);
    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(nextPlayer);
      toast(`${nextPlayer} wins!`);
      postResult(`${nextPlayer} wins`);
    } 
    else if (!newBoard.flat().includes(null)) {
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
              const idx = [row, col];
              return <Fragment key={row + col / 10}>
                  {board[row][col] != null ? <button className={`square ${board[row][col] == "X" ? "playerX" : "playerO"}`}>{board[row][col]}</button> 
                      :
                      <button 
                        key={row + col / 10}
                        className="square" 
                        onClick={() => handleClick(idx)}
                      />
                    }
                </Fragment>;
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
