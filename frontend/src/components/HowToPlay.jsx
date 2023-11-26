const HowToPlay = ({ setShowHowToPlay }) => {

    const handleModal = () => {
        setShowHowToPlay(false)
        window.localStorage.setItem('HOW_TO_PLAY_FUTFINDER', false)
    }

    return (
        <div className="how-to-play">
            <button onClick={handleModal}>x</button>
            <h2>FutFinder</h2>
            <p>Test your ball knowledge.</p>
            <h4>Rules</h4>
            <p>You have 5 attempts to guess the correct soccer player.</p>
            <p>1. Analyze the player's FIFA card ratings.</p>
            <p>2. Type into the search box and make a guess (Premier League players only).</p>
            <p>3. If your guess and the correct player share any attributes (club team, nationality, or position), they will appear on the screen. </p>
        </div>
    )
}

export default HowToPlay
