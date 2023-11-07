import { useEffect, useState } from 'react'
import fifaCard from '../assets/fifa-card.png'
import axios from 'axios'

const PlayerCard = ({userStrikes, playerPosition, playerClub, playerNationality, playerName}) => {
    userStrikes = 2
    playerName = 'MESSI'
    playerPosition = 'RW'
    playerClub = 'https://media.api-sports.io/football/teams/33.png'
    playerNationality = "https://media.api-sports.io/flags/BR.svg"

    const [playerImage, setPlayerImage] = useState(undefined)

    // const get_ratings = async () => {
    //     // const response = await axios.get('https://futdb.app/api/players/25')
    //     try {
    //         const response = await axios.get('https://futdb.app/api/players/25/image', {
    //             headers: {
    //                 'accept': 'image/png',
    //                 'X-AUTH-TOKEN': import.meta.env.VITE_FUTDB_KEY,
    //             }
    //         })
    //         console.log(response.data)
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }
    // useEffect(() => {
    //     get_ratings()
    // }, [])




    return(
        <>
        <div className="fut-player-card">
            <div className="player-card-top">
                <div className="player-master-info">
                    <div className="player-rating">
                        <span>97</span>
                    </div>
                    <div className="player-position">
                        <span>{playerPosition}</span>
                    </div>
                    <div className="player-nation">
                        <img src={playerNationality} alt="player nation" draggable="false"/>
                    </div>
                    <div className="player-club">
                        <img src={playerClub} alt="player club" draggable="false"/>
                    </div>
                </div>
                <div className="player-picture">
                    <img src={playerImage} alt="player name" draggable="false"/>
                    {/* <img src="https://selimdoyranli.com/cdn/fut-player-card/img/messi.png" alt="player name" draggable="false"/> */}
                </div>
            </div>
            <div className="player-card-bottom">
                <div className="player-info">
                    <div className="player-name">
                        <span>{playerName}</span>
                    </div>
                    <div className="player-features">
                        <div className="player-features-col">
                            <span>
                                <div className="player-feature-value">97</div>
                                <div className="player-feature-title">PAC</div>
                            </span>
                            <span>
                                <div className="player-feature-value">95</div>
                                <div className="player-feature-title">SHO</div>
                            </span>
                            <span>
                                <div className="player-feature-value">94</div>
                                <div className="player-feature-title">PAS</div>
                            </span>
                        </div>
                        <div className="player-features-col">
                            <span>
                                <div className="player-feature-value">99</div>
                                <div className="player-feature-title">DRI</div>
                            </span>
                            <span>
                                <div className="player-feature-value">35</div>
                                <div className="player-feature-title">DEF</div>
                            </span>
                            <span>
                                <div className="player-feature-value">68</div>
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
