import { useEffect, useState } from 'react'
import './App.css'
import PlayerCard from './components/PlayerCard'
import UserSearchBox from './components/UserSearchBox'
import axios from 'axios'

function App() {

  const [playerData, setPlayerData] = useState(null)

  const get_random_player = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/player/',)
      console.log(response.data[0])
      setPlayerData(response.data[0])
  } catch(error) {
      console.log(error)
  }
  }

  useEffect(() => {
    get_random_player()
  }, [])

  const submitGuess = (guess) => {
    // post guess to url
  }


  return (
    <>
    {playerData && <PlayerCard playerData = {playerData}/>}
    <UserSearchBox />
    </>
  )
}

export default App
