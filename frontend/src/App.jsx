import { useEffect, useState } from 'react'
import './App.css'
import PlayerCard from './components/PlayerCard'
import SearchBox from './components/SearchBox'
import axios from 'axios'

function App() {
  const [playerData, setPlayerData] = useState(null)
  const [remainingAttempts, setRemainingAttempts] = useState(3)
  const [userGuess, setUserGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const get_random_player = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/player/')
      setPlayerData(response.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const handleGuess = () => {
    if (userGuess != playerData.name && remainingAttempts > 0) {
      setRemainingAttempts(remainingAttempts - 1)
    } else {
      console.log('Player revealed')
      setGameOver(true)
    }
  }

  useEffect(() => {
    get_random_player()
  }, [])

  return (
    <>
      {playerData && <PlayerCard playerData={playerData} remainingAttempts={remainingAttempts} gameOver={gameOver} />}
      <div className="user-input">
        {/* <input
          type="text"
          placeholder="Enter a player's name here"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
        /> */}
        <SearchBox />
        {playerData && <button onClick={handleGuess} type="button">
          Enter
        </button>}
      </div>
      <p>Remaining Attempts: {remainingAttempts}</p>
    </>
  )
}

export default App
