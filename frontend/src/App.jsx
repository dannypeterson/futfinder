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

  const [loading, setLoading] = useState(true)

  const [showHowToPlay, setShowHowToPlay] = useState(true)

  const baseURL = import.meta.env.VITE_BASE_URL

  const fetchImage = async (url) => {
    const imageResponse = await axios.get(url, {
      headers: {
        accept: 'image/png',
        'X-AUTH-TOKEN': import.meta.env.VITE_FUTDB_KEY,
      },
      responseType: 'arraybuffer',
    });
    const imageBlob = new Blob([imageResponse.data], { type: 'image/png' });
    return URL.createObjectURL(imageBlob);
  };


  const getPlayerFromDB = async () => {
    // this func should only run once every 24hr, so need to cache it and check cache before running this func
    try {
      setLoading(true)
      const response = await axios.get(`${baseURL}/api/player/`)
      const futdbID = response.data[0].futdb_id
      const nationID = response.data[0].nationality.futdb_id
      const clubID = response.data[0].club.futdb_id

      setPlayerData(response.data[0])
      setPlayerImage(await fetchImage(`https://futdb.app/api/players/${futdbID}/image`))
      setPlayerNation(await fetchImage(`https://futdb.app/api/nations/${nationID}/image`))
      setPlayerClub(await fetchImage(`https://futdb.app/api/clubs/${clubID}/image`))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
