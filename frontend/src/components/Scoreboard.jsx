const Scoreboard = ({ remainingAttempts, currentGuess, }) => {

    const remaining_attempts = 5 - currentGuess

    return (
        <>
            <p>Attempts remaining: {remaining_attempts}</p>
        </>
    )
}

export default Scoreboard
