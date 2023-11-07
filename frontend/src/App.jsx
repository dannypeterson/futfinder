import { useState } from 'react'
import './App.css'
import PlayerCard from './components/PlayerCard'
import UserSearchBox from './components/UserSearchBox'

function App() {
  // // grab players info
  // const [playerId, setPlayerId] = useState(undefined)

  // NEED:
  // player img
  // age info -> d.o.b if no age
  // position info
  // nationality pic
  // club pic

  // ratings ???

  // store player API id in models
  // django send api player id in headers
  // api is gonna get all the stuff
  // when the player


  // i only need to get this information once right?


  return (
    <>
    <PlayerCard />
    <UserSearchBox />
    </>
  )
}

export default App
