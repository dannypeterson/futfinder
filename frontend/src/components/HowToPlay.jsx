import NUMBER_OF_GUESSES from "../axios.config"

const HowToPlay = ({ setShowHowToPlay }) => {

    const handleModal = () => {
        setShowHowToPlay(false)
        window.localStorage.setItem('HOW_TO_PLAY_FUTFINDER', false)
    }

    return (
        <div className="how-to-play">
            <button className="close-modal" onClick={handleModal}>x</button>
            <h2>FutFinder</h2>
            <p>Test your ball knowledge.</p>
            <h4>Rules</h4>
            <p>You have {NUMBER_OF_GUESSES} attempts to guess the correct soccer player.</p>
            <p>1. Analyze the player's FIFA card ratings.</p>
            <p>2. Type into the search box and make a guess (Premier League players only).</p>
            <p>3. If your guess and the correct player share any attributes (club team, nationality, or position), they will appear on the screen. </p>
            <button className="lets-play" onClick={handleModal}>Lets Play ⚽</button>
        </div>
    )
}

export default HowToPlay
