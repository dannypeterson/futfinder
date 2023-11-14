import { useEffect, useState } from 'react'
import './App.css'
import PlayerCard from './components/PlayerCard'
import SearchBox from './components/SearchBox'
import axios from 'axios'

function App() {
  const [playerData, setPlayerData] = useState(null)
  const [playerImage, setPlayerImage] = useState(null)
  const [playerNation, setPlayerNation] = useState(null)
  const [playerClub, setPlayerClub] = useState(null)
  const [remainingAttempts, setRemainingAttempts] = useState(3)
  const [userGuess, setUserGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const getPlayerFromDB = async () => {
    try {
      // player data
      const response = await axios.get('http://127.0.0.1:8000/player/')
      setPlayerData(response.data[0])
      const futdbID = response.data[0].futdb_id
      const nationID = response.data[0].nationality
      const clubID = response.data[0].club
      console.log(clubID)

      // player image
      const imageResponse = await axios.get(`https://futdb.app/api/players/${futdbID}/image`, {
        headers: {
          'accept': 'image/png',
          'X-AUTH-TOKEN': import.meta.env.VITE_FUTDB_KEY
        },
        responseType: 'arraybuffer'
      })
      const imageBlob = new Blob([imageResponse.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setPlayerImage(imageUrl)

      // nation image
      const nationResponse = await axios.get(`https://futdb.app/api/nations/${nationID}/image`, {
        headers: {
          'accept': 'image/png',
          'X-AUTH-TOKEN': import.meta.env.VITE_FUTDB_KEY
        },
        responseType: 'arraybuffer'
      })
      const nationBlob = new Blob([nationResponse.data], { type: 'image/png' });
      const nationUrl = URL.createObjectURL(nationBlob);
      setPlayerNation(nationUrl)

      // club image
      const clubResponse = await axios.get(`https://futdb.app/api/clubs/${clubID}/image`, {
        headers: {
          'accept': 'image/png',
          'X-AUTH-TOKEN': import.meta.env.VITE_FUTDB_KEY
        },
        responseType: 'arraybuffer'
      })
      const clubBlob = new Blob([clubResponse.data], { type: 'image/png' });
      const clubUrl = URL.createObjectURL(clubBlob);
      setPlayerClub(clubUrl)

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
    getPlayerFromDB()
  }, [])

  return (
    <>
      {playerData && <PlayerCard playerData={playerData} remainingAttempts={remainingAttempts} gameOver={gameOver} playerImage={playerImage} playerClub={playerClub} playerNation={playerNation} />}
      <div className="user-input">
        {/* <input
          type="text"
          placeholder="Enter a player's name here"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
        /> */}
        {/* {playerData && <button onClick={handleGuess} type="button">
          Enter
        </button>} */}
        <SearchBox handleGuess={handleGuess} />
      </div>
      <p>Remaining Attempts: {remainingAttempts}</p>
    </>
  )
}

export default App
