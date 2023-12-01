const Scoreboard = ({ currentGuess, }) => {

    const remainingAttempts = 6 - currentGuess

    const attemptsArray = Array.from({ length: remainingAttempts }, (_, index) => (
        <span key={index}>⚽</span>
    ));

    return (
        <>
            <p style={{ 'color': '#e9cc74', 'fontWeight': 'bold' }}>Attempts remaining: {attemptsArray}</p>
        </>
    )
}

export default Scoreboard
