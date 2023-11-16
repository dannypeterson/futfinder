import PlayerCard from './PlayerCard'
import UserSearchBox from './UserSearchBox'
import Scoreboard from './Scoreboard'
import { useState } from 'react'

const Game = ({ playerData, playerClub, playerImage, playerNation }) => {
    // game functionality
    const [remainingAttempts, setRemainingAttempts] = useState(3)
    const [gameOver, setGameOver] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    // handling user guess
    // const [userGuess, setUserGuess] = useState('')
    const [query, setQuery] = useState('');

    const handleGuess = () => {
        if (query != playerData.name && remainingAttempts > 0) {
            setRemainingAttempts(remainingAttempts - 1)
            console.log('got it wrong')
        } else {
            console.log('Player revealed')
            setGameOver(true)
        }
    }

    return (
        <>
            {playerData && <PlayerCard playerData={playerData} playerImage={playerImage} playerClub={playerClub} playerNation={playerNation} remainingAttempts={remainingAttempts} gameOver={gameOver} />}
            <UserSearchBox query={query} setQuery={setQuery} handleGuess={handleGuess} />
            <Scoreboard remainingAttempts={remainingAttempts} />
        </>
    )
}

export default Game
