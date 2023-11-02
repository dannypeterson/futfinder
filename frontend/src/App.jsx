import { useState } from 'react'
import './App.css'
import PlayerCard from './components/PlayerCard'

function App() {
  // // grab players info
  // const [playerId, setPlayerId] = useState(undefined)

  return (
    <div className='game-container'>
    <PlayerCard />
    </div>
  )
}

export default App
