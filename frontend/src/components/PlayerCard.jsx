import fifaCard from '../assets/fifa-card.png'
import Player from './Player'
import Position from './Position'
import Age from './Age'
import Team from './Team'

const PlayerCard = ({playerStrikes}) => {
    playerStrikes = 2
    return(
        <>
        <img className='fifa-card' src={fifaCard}></img>
        <Player />
        {playerStrikes > 0 ? <Position /> : null}
        {playerStrikes > 1 ? <Age /> : null}
        {playerStrikes > 1 ? <Team /> : null}
        </>
    )
}

export default PlayerCard
