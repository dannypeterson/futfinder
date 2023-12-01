import PlayerCard from './PlayerCard'
import UserSearchBox from './UserSearchBox'
import Scoreboard from './Scoreboard'
import Result from './Result'
import { useEffect, useState } from 'react'
import GameOver from './GameOver'

const Game = ({
    playerData,
    playerClub,
    playerImage,
    playerNation,
    getPlayerFromDB
}) => {


    // game functionality
    const [gameOver, setGameOver] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [guessList, setGuessList] = useState([])
    const [userGuess, setUserGuess] = useState({})
    const [currentGuess, setCurrentGuess] = useState(1)
    const [duplicatePlayer, setDuplicatePlayer] = useState(false)
    const [revealAttribute, setRevealAttribute] = useState({
        position: false,
        club: false,
        nation: false
    })

    // // CHECK LOCAL STORAGE FOR CORRECT ATTRIBUTES AND GUESS NUMBER
    // useEffect(() => {
    //     const attributesObject = window.localStorage.getItem('REVEAL_ATTRIBUTES')
    //     if (attributesObject) {
    //         setRevealAttribute(JSON.parse(attributesObject))
    //     }
    //     const guessLocalStorage = window.localStorage.getItem('CURRENT_GUESS')
    //     if (guessLocalStorage) {
    //         setCurrentGuess(JSON.parse(guessLocalStorage))
    //     }
    // }, [])

    // // CHECK LOCAL STORAGE IF ANY GUESSES HAVE ALREADY BEEN MADE
    // useEffect(() => {
    //     const userGuessList = window.localStorage.getItem('USER_GUESS_LIST')
    //     if (playerData) {
    //         if (userGuessList) {
    //             setGuessList(JSON.parse(userGuessList))
    //         }
    //     }
    // }, [playerData])


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

    const incrementGuess = () => {
        setCurrentGuess((prevGuess) => {
            const updatedGuess = prevGuess + 1
            window.localStorage.setItem('CURRENT_GUESS', JSON.stringify(updatedGuess))
            return updatedGuess
        })
        if (currentGuess >= 5) {
            setGameOver(true)
        }
    }

    const checkGuessForDuplicate = () => {
        if (!userGuess.futdb_id) {
            return false // if empty guess, dont check for dupe
        }
        for (const _guess of guessList) {
            if (_guess.futdb_id === userGuess.futdb_id) {
                setDuplicatePlayer(true)
                setTimeout(() => {
                    setDuplicatePlayer(false)
                }, 3000)
                setSearchQuery('')
                setUserGuess({})
                return true // duplicate found, exit loop and handleGuess()
            }
        }
        return false // no dupe found
    }

    const handleEmptyGuess = () => {
        if (!searchQuery.trim()) {
            setUserGuess()
        }
    }


    const handleGuess = () => {
        if (checkGuessForDuplicate()) {
            return; // if dupe is found, stop func
        }
        // handleEmptyGuess()
        incrementGuess()
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
        // reset guess
        setUserGuess({})
        setDuplicatePlayer(false)
        setSearchQuery('')
    }

    // RESTART GAME
    const resetGameStorage = () => {
        const localStorageKeys = ['REVEAL_ATTRIBUTES', 'CURRENT_GUESS', 'USER_GUESS_LIST']
        localStorageKeys.forEach((key) => { window.localStorage.removeItem(key) })
    }

    const resetState = () => {
        setGameOver(false)
        setIsCorrect(false)
        setUserGuess({})
        setGuessList([])
        setCurrentGuess(1)
        setRevealAttribute({
            position: false,
            club: false,
            nation: false
        })
        setSearchQuery('')
    }

    const restartGame = () => {
        resetGameStorage()
        resetState()
        getPlayerFromDB()
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
            <Scoreboard currentGuess={currentGuess} />
            <UserSearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleGuess={handleGuess}
                setUserGuess={setUserGuess}
                duplicatePlayer={duplicatePlayer}
            />
            <Result
                playerData={playerData}
                userGuess={userGuess}
                guessList={guessList}
                playerClub={playerClub}
                playerNation={playerNation}
                revealAttribute={revealAttribute}
            />
            {gameOver && <GameOver playerData={playerData} guessList={guessList} restartGame={restartGame} isCorrect={isCorrect} currentGuess={currentGuess} />}
        </>
    )
}

export default Game
