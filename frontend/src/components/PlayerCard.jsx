import { useEffect, useState } from 'react'
import fifaCard from '../assets/fifa-card.png'
import axios from 'axios'

const PlayerCard = ({userStrikes, playerData, playerImage}) => {
    userStrikes = 2
    playerImage = 'https://selimdoyranli.com/cdn/fut-player-card/img/messi.png'

    return(
        <>
        <div className="fut-player-card">
            <div className="player-card-top">
                <div className="player-master-info">
                    <div className="player-rating">
                        <span>{playerData.rating}</span>
                    </div>
                    <div className="player-position">
                        <span>{playerData.position}</span>
                    </div>
                    <div className="player-nation">
                        <img src={playerData.nationality} alt="player nation" draggable="false"/>
                    </div>
                    <div className="player-club">
                        <img src={playerData.club} alt="player club" draggable="false"/>
                    </div>
                </div>
                <div className="player-picture">
                    <img src={playerImage} alt="player img" draggable="false"/>
                </div>
            </div>
            <div className="player-card-bottom">
                <div className="player-info">
                    <div className="player-name">
                        <span>{playerData.name}</span>
                    </div>
                    <div className="player-features">
                        <div className="player-features-col">
                            <span>
                                <div className="player-feature-value">{playerData.pace}</div>
                                <div className="player-feature-title">PAC</div>
                            </span>
                            <span>
                                <div className="player-feature-value">{playerData.shooting}</div>
                                <div className="player-feature-title">SHO</div>
                            </span>
                            <span>
                                <div className="player-feature-value">{playerData.passing}</div>
                                <div className="player-feature-title">PAS</div>
                            </span>
                        </div>
                        <div className="player-features-col">
                            <span>
                                <div className="player-feature-value">{playerData.dribbling}</div>
                                <div className="player-feature-title">DRI</div>
                            </span>
                            <span>
                                <div className="player-feature-value">{playerData.defending}</div>
                                <div className="player-feature-title">DEF</div>
                            </span>
                            <span>
                                <div className="player-feature-value">{playerData.physicality}</div>
                                <div className="player-feature-title">PHY</div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PlayerCard
