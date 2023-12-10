import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Game from './components/Game'
import HowToPlay from './components/HowToPlay'
import Spinner from './components/Spinner'

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

    try {
      setLoading(true)
      const response = await axios.get(`${baseURL}/api/player/`)
      const player = response.data[0]['player']
      const futdbID = player.futdb_id
      const nationID = player.nationality.futdb_id
      const clubID = player.club.futdb_id

      setPlayerData(player)
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
      {loading ? <Spinner /> :
        <Game
          playerData={playerData}
          playerImage={playerImage}
          playerClub={playerClub}
          playerNation={playerNation}
          getPlayerFromDB={getPlayerFromDB}
        />
      }
    </>
  )
}

export default App
