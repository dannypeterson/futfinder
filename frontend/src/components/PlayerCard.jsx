import fifaCard from '../assets/fifa-card.png'
import Player from './Player'
import Position from './Position'
import Age from './Age'
import Team from './Team'
import Nationality from './Nationality'

const PlayerCard = ({playerStrikes}) => {
    playerStrikes = 2
    return(
        <div className='card-container'>
            {playerStrikes > 0 ? <Position /> : null}
            <img className='fifa-card' src={fifaCard}></img>
            <Player />
            {/* {playerStrikes > 1 ? <Age /> : null} */}
            {/* {playerStrikes > 1 ? <Team /> : null} */}
            {/* {playerStrikes > 1 ? <Nationality /> : null} */}
        </div>
    )
}

export default PlayerCard
