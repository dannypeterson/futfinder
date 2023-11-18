

const Result = ({ playerData, userGuess, guessList, playerClub, playerNation, revealAttribute }) => {



    return (
        <ul className="guesses-list">
            {guessList.length > 0 && guessList.reverse().map((player) => (
                <li key={player.futdb_id}>{player.name}
                    {player.is_correct && <span>✔️</span>}
                    {playerData.position === player.position && !player.is_correct && <span>{playerData.position}</span>}
                    {playerData.club.futdb_id === player.club && !player.is_correct && <img style={{ 'width': '2rem', 'height': '2rem' }} src={playerClub} alt="club" />}
                    {playerData.nationality.futdb_id === player.nation && !player.is_correct && <img src={playerNation} style={{ 'width': '2rem', 'height': '2rem' }} alt="nation" />}
                    {!player.is_correct && playerData.position !== player.position && playerData.club.futdb_id !== player.club && playerData.nationality.futdb_id !== player.nation && <span>❌</span>}
                </li>
            ))}
        </ul>
    )
}
export default Result
