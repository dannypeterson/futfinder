const GameOver = ({ playerData, guessList, restartGame, isCorrect }) => {


    return (
        <div className="game-over-screen">
            {isCorrect ? <h4 style={{ 'color': 'green' }}>Congradulations!</h4> : <h4 style={{ 'color': 'red' }}>Sorry, guess you don't know ball.</h4>}
            <div className="go-player-section">
                <p className="text-muted">The player was:</p>
                <h3>{playerData.name}</h3>
            </div>
            <div className="go-guesses mb-3">
                {guessList.length > 0 && guessList.reverse().map((guess) => (
                    <span key={guess.futdb_id} style={{ 'marginRight': '1rem' }}>
                        {guess.is_correct ? '✔' : '✘'}
                    </span>
                ))}
            </div>
            <button className="share-game mb-3">Share</button>
            <button onClick={restartGame}>Play again (Beta only)</button>
        </div>
    )
}

export default GameOver
