const GameOver = ({ playerData, guessList }) => {
    return (
        <div className="game-over-screen">
            <div className="go-player-section">
                <p className="text-muted">The player was:</p>
                <h3>{playerData.name}</h3>
            </div>
            <div className="go-guesses">
                {guessList.length > 0 && guessList.reverse().map((guess) => (
                    <span key={guess.futdb_id} style={{ 'marginRight': '2px' }}>
                        {guess.is_correct ? '✔' : '✘'}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default GameOver
