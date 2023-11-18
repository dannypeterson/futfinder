import PlayerCard from './PlayerCard'
import UserSearchBox from './UserSearchBox'
import Scoreboard from './Scoreboard'
import { useState } from 'react'

const Game = ({ playerData, playerClub, playerImage, playerNation }) => {
    // game functionality
    const [remainingAttempts, setRemainingAttempts] = useState(3)
    const [gameOver, setGameOver] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [userGuess, setUserGuess] = useState({})
    const [revealAttribute, setRevealAttribute] = useState({
        'position': false,
        'club': false,
        'nation': false
    })

    // user submits guess, check attributes
    const handleGuess = () => {
        if (playerData.futdb_id == userGuess.futdb_id) {
            console.log('correct guess')
            setGameOver(true)
        }
        if (playerData.position == userGuess.position) {
            setRevealAttribute(prevState => ({ ...prevState, 'position': true }))
        }
        if (playerData.club.futdb_id == userGuess.club) {
            setRevealAttribute(prevState => ({ ...prevState, 'club': true }))
        }
        if (playerData.nationality.futdb_id == userGuess.nation) {
            setRevealAttribute(prevState => ({ ...prevState, 'nation': true }))
        }
        else {
            console.log('nothing correct, decrement user attempts')
        }
        setSearchQuery('')

        // if (query != playerData.name && remainingAttempts > 0) {
        //     setRemainingAttempts(remainingAttempts - 1)
        //     console.log('got it wrong')
        // } else {
        //     console.log('Player revealed')
        //     setGameOver(true)
        // }
    }

    return (
        <>
            {playerData && <PlayerCard playerData={playerData} playerImage={playerImage} playerClub={playerClub} playerNation={playerNation} remainingAttempts={remainingAttempts} gameOver={gameOver} revealAttribute={revealAttribute} />}
            <UserSearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleGuess={handleGuess} setUserGuess={setUserGuess} />
            <Scoreboard remainingAttempts={remainingAttempts} />
        </>
    )
}

export default Game
