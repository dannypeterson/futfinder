import PlayerCard from './PlayerCard'
import UserSearchBox from './UserSearchBox'
import Scoreboard from './Scoreboard'
import Result from './Result'
import { useEffect, useState } from 'react'

const Game = ({
    playerData,
    playerClub,
    playerImage,
    playerNation,
    guessList,
    setGuessList,
}) => {


    // game functionality
    // const [remainingAttempts, setRemainingAttempts] = useState(3)
    const [gameOver, setGameOver] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [userGuess, setUserGuess] = useState({})
    const [currentGuess, setCurrentGuess] = useState(0)

    const [revealAttribute, setRevealAttribute] = useState({
        position: false,
        club: false,
        nation: false
    })

    // UPDATE LOCAL STORAGE
    useEffect(() => {
        const attributesObject = window.localStorage.getItem('REVEAL_ATTRIBUTES')
        if (attributesObject) {
            setRevealAttribute(JSON.parse(attributesObject))
        }
        const guessLocalStorage = window.localStorage.getItem('CURRENT_GUESS')
        if (guessLocalStorage) {
            setCurrentGuess(JSON.parse(guessLocalStorage))
        }
    }, [])

    const updateGuessList = () => {
        let updatedUserGuess = {
            ...userGuess,
            is_correct: playerData.futdb_id === userGuess.futdb_id
        }
        setUserGuess(updatedUserGuess)

        let updatedGuessList = [
            ...guessList, updatedUserGuess
        ]
        setGuessList(updatedGuessList)
        window.localStorage.setItem('USER_GUESS_LIST', JSON.stringify(updatedGuessList))
    }

    const checkCorrectGuess = () => {
        if (playerData.futdb_id === userGuess.futdb_id) {
            setIsCorrect(true)
            setGameOver(true)
            return true
        }
        return false
    }

    const revealAttributeIfCorrect = (
        attribute,
        playerAttribute,
        guessAttribute
    ) => {
        if (playerAttribute === guessAttribute) {
            setRevealAttribute((prevState) => {
                const updatedState = { ...prevState, [attribute]: true }
                window.localStorage.setItem('REVEAL_ATTRIBUTES', JSON.stringify(updatedState))
                return updatedState
            })
        }
    }

    const decrementGuess = () => {
        setCurrentGuess((prevGuess) => {
            const updatedGuess = prevGuess + 1
            window.localStorage.setItem('CURRENT_GUESS', JSON.stringify(updatedGuess))
            return updatedGuess
        })
        if (currentGuess >= 5) {
            setGameOver(true)
        }
    }

    const handleGuess = () => {
        decrementGuess()
        updateGuessList()
        revealAttributeIfCorrect(
            'position',
            playerData.position,
            userGuess.position
        )
        revealAttributeIfCorrect('club', playerData.club.futdb_id, userGuess.club)
        revealAttributeIfCorrect(
            'nation',
            playerData.nationality.futdb_id,
            userGuess.nation
        )
        if (checkCorrectGuess()) {
            return
        }
        setSearchQuery('')
    }

    return (
        <>
            {playerData && (
                <PlayerCard
                    playerData={playerData}
                    playerImage={playerImage}
                    playerClub={playerClub}
                    playerNation={playerNation}
                    currentGuess={currentGuess}
                    gameOver={gameOver}
                    isCorrect={isCorrect}
                    revealAttribute={revealAttribute}
                />
            )}
            <UserSearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleGuess={handleGuess}
                setUserGuess={setUserGuess}
            />
            <Scoreboard currentGuess={currentGuess} />
            <Result
                playerData={playerData}
                userGuess={userGuess}
                guessList={guessList}
                playerClub={playerClub}
                playerNation={playerNation}
                revealAttribute={revealAttribute}
                setRevealAttribute={setRevealAttribute}
            />
        </>
    )
}

export default Game
