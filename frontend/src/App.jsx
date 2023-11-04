import { useState } from 'react'
import './App.css'
import PlayerCard from './components/PlayerCard'
import UserSearchBox from './components/UserSearchBox'

function App() {
  // // grab players info
  // const [playerId, setPlayerId] = useState(undefined)

  return (
    <>
    <PlayerCard />
    {/* <UserSearchBox /> */}
    </>
  )
}

export default App
