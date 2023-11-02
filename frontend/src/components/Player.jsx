import sil from '../assets/silhouette.jpeg'
import axios from 'axios'

import React, { useEffect, useState } from "react"
const Player = ({playerGuess}) => {


    playerGuess = true
    if (playerGuess) {
        return <img src='https://media.api-sports.io/football/players/276.png' alt="player img" className="player-image" />
    } else {
        return <img src='https://media.api-sports.io/football/players/276.png' alt="player img blurred" className="player-image-blurred" />
    }
}

export default Player
