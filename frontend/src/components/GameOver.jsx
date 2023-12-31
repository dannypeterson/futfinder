import { useState } from "react"
import NUMBER_OF_GUESSES from "../axios.config"
import Timer from "./Timer"

const GameOver = ({ playerData, guessList, isCorrect, currentGuess }) => {

    const [showClipboardMsg, setShowClipboardMsg] = useState(false)

    const showCopiedToClipboard = () => {
        setShowClipboardMsg(true)
    }

    const resultsList = guessList.map((guess) => (guess.is_correct ? '✔' : '✘'))
    const shareResults = guessList.map((guess) => (guess.is_correct ? '✅' : '❌')).join('')


    const handleShare = async () => {
        let currentDate = new Date()
        let formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear().toString().slice(-2)}`;

        if (navigator.canShare) {
            try {
                await navigator.share({ title: 'Futfinder', text: `Futfinder ${formattedDate}, ${currentGuess - 1}/${NUMBER_OF_GUESSES} \n ${shareResults} \n https://futfinder.vercel.app/` })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await navigator.clipboard.writeText(`FutFinder ${formattedDate}, ${currentGuess - 1}/${NUMBER_OF_GUESSES} \n ${shareResults} \n https://futfinder.vercel.app/`)
                setShowClipboardMsg(true)
                setTimeout(() => {
                    setShowClipboardMsg(false)
                }, 3000)
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className="game-over-screen">
            {isCorrect ? <h4 style={{ 'color': 'green' }}>Congratulations!</h4> : <h4 style={{ 'color': 'red' }}>Sorry, better luck next time.</h4>}
            <div className="go-player-section">
                <p className="text-muted">The player was:</p>
                <h3>{playerData.name}</h3>
            </div>
            <div className="go-guesses mb-3">
                {resultsList.length > 0 && resultsList.map((guess, index) => (
                    <span key={index} style={{ 'marginRight': '1rem' }}>
                        {guess}
                    </span>
                ))}
            </div>
            <button className="share-game mb-3" onClick={handleShare}>Share</button>
            {showClipboardMsg && <div className="copy-message">Copied results to clipboard</div>}
            <Timer />
        </div>
    )
}

export default GameOver
