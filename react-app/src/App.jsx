import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TicTacToe from './TicTacToe';

/**
 * @task TODO - track version control with Git.
 * Branching logic:
 * production: prod (= renamed or created from main or master)
 * development: dev
 * - common feature branch: feature/tictactoe
 * - individual dev branch: feature/tictactoe/SajatNev
 * Merge logic:
 * feature/tictactoe/SajatNev -> feature/tictactoe -> dev -> prod
 */

function App() { 
  return (
    <>
      <div className="card">
        <TicTacToe />
      </div>
    </> 
  )
}

export default App
