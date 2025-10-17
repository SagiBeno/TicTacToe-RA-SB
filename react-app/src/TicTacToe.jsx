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
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameEnded, setGameEnded] = useState(false);
  const [matchHistory, setMatchHistory] = useState([]);

  useEffect(() => {
    getResults(); //get match history on startup
  }, []); 
  
  const postResult = async (result) => {

    await fetch('http://localhost:3333/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result })
    });
    getResults();
  };

  const getResults = async (e) => {

    await fetch('http://localhost:3333/api/results', {
      method: 'GET'
    })
    .then(async res => {
      const data = await res.json();
      setMatchHistory(data)
    })
    .catch(console.warn)
  }

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
    if(gameEnded) return;

    const newBoard = board.slice()

    newBoard[idx[0]][idx[1]] = currentPlayer;

    setBoard(newBoard);
    
    const win = calculateWinner(newBoard);
    if (win) {
      setGameEnded(true)
      toast(`${currentPlayer} wins!`);
      postResult(`${currentPlayer} wins`);
      return;
    } 
    else if (!newBoard.flat().includes(null)) {
      toast('Draw!');
      postResult('Draw');
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleRestart = e => {
    e.preventDefault()

    if(gameEnded) setGameEnded(false);

    setBoard(emptyBoard);
    setCurrentPlayer('X');
    toast('Game restarted!');
  };

  const handleSurrender = e => {
    e.preventDefault();

    setGameEnded(true);

    toast(currentPlayer == 'X' ? 'X wins!' : 'O wins!');
    postResult(currentPlayer == 'X' ? 'X wins' : 'O wins');
    
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

    <div className="matchHistory">
      {
        matchHistory.length > 0 ? 
          <ol>
            {
              matchHistory.map((data, key) => (
                <li key={key}>{data}</li>
              ))
            }
          </ol>
          :
          "No match history"
      }
    </div>
    <ToastContainer position="top-center" />
  </div>
);
}

export default TicTacToe;
