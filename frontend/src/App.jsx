import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Game from './components/Game'
import HowToPlay from './components/HowToPlay'

function App() {
  // player data
  const [playerData, setPlayerData] = useState(null)
  const [playerImage, setPlayerImage] = useState(null)
  const [playerNation, setPlayerNation] = useState(null)
  const [playerClub, setPlayerClub] = useState(null)

  const [showHowToPlay, setShowHowToPlay] = useState(true)

  // axios.defaults.baseURL = 'http://localhost:8000/api/';
  axios.defaults.baseURL = 'https://futfinder-d2b9385f217b.herokuapp.com/api/';


  const getPlayerFromDB = async () => {
    // this func should only run once every 24hr, so need to cache it and check cache before running this func
    try {
      // player data
      const response = await axios.get(`/player/`)
      setPlayerData(response.data[0])
      const futdbID = response.data[0].futdb_id
      const nationID = response.data[0].nationality.futdb_id
      const clubID = response.data[0].club.futdb_id

      // player image
      const imageResponse = await axios.get(
        `https://futdb.app/api/players/${futdbID}/image`,
        {
          headers: {
            accept: 'image/png',
            'X-AUTH-TOKEN': import.meta.env.VITE_FUTDB_KEY
          },
          responseType: 'arraybuffer'
        }
      )
      const imageBlob = new Blob([imageResponse.data], { type: 'image/png' })
      const imageUrl = URL.createObjectURL(imageBlob)
      setPlayerImage(imageUrl)

      // nation image
      const nationResponse = await axios.get(
        `https://futdb.app/api/nations/${nationID}/image`,
        {
          headers: {
            accept: 'image/png',
            'X-AUTH-TOKEN': import.meta.env.VITE_FUTDB_KEY
          },
          responseType: 'arraybuffer'
        }
      )
      const nationBlob = new Blob([nationResponse.data], { type: 'image/png' })
      const nationUrl = URL.createObjectURL(nationBlob)
      setPlayerNation(nationUrl)

      // club image
      const clubResponse = await axios.get(
        `https://futdb.app/api/clubs/${clubID}/image`,
        {
          headers: {
            accept: 'image/png',
            'X-AUTH-TOKEN': import.meta.env.VITE_FUTDB_KEY
          },
          responseType: 'arraybuffer'
        }
      )
      const clubBlob = new Blob([clubResponse.data], { type: 'image/png' })
      const clubUrl = URL.createObjectURL(clubBlob)
      setPlayerClub(clubUrl)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPlayerFromDB()
  }, [])


  return (
    <>
      <h2 className='title'>FUTFINDER</h2>
      {showHowToPlay && <HowToPlay showHowToPlay={showHowToPlay} setShowHowToPlay={setShowHowToPlay} />}
      <Game
        playerData={playerData}
        playerImage={playerImage}
        playerClub={playerClub}
        playerNation={playerNation}
        getPlayerFromDB={getPlayerFromDB}
      />
    </>
  )
}

export default App
