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
    const [remainingAttempts, setRemainingAttempts] = useState(3)
    const [gameOver, setGameOver] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [userGuess, setUserGuess] = useState({})

    const [revealAttribute, setRevealAttribute] = useState({
        position: false,
        club: false,
        nation: false
    })

    useEffect(() => {
        const attributesObject = window.localStorage.getItem('REVEAL_ATTRIBUTES')
        if (attributesObject) {
            setRevealAttribute(JSON.parse(attributesObject))
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
            // setRevealAttribute((prevState) => ({ ...prevState, [attribute]: true }))
            setRevealAttribute((prevState) => {
                const updatedState = { ...prevState, [attribute]: true }
                window.localStorage.setItem('REVEAL_ATTRIBUTES', JSON.stringify(updatedState))
                return updatedState
            })
            // set attribute to local storage
            // window.localStorage.setItem('REVEAL_ATTRIBUTES', JSON.stringify(updatedAttributeList))
        }
    }

    // user submits guess, check attributes
    const handleGuess = () => {
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

        console.log('nothing correct, decrement user attempts')

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
                    remainingAttempts={remainingAttempts}
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
            <Scoreboard remainingAttempts={remainingAttempts} />
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
