const PlayerCard = ({ remainingAttempts, playerData, playerImage, playerClub, playerNation, gameOver, isCorrect, revealAttribute }) => {

  return (
    <>
      <div className="fut-player-card">
        <div className="player-card-top">
          <div className="player-master-info">
            <div className="player-rating">
              <span>{playerData.rating}</span>
            </div>
            <div className="player-position">
              {revealAttribute.position || gameOver || isCorrect ? (
                <span className='reveal-position'>{playerData.position}</span>
              ) : <span style={{ 'opacity': 0 }}>POS</span>}
            </div>
            <div className="player-nation">
              {revealAttribute.nation || gameOver || isCorrect ? (
                <img className='reveal-nation'
                  src={playerNation}
                  alt="nation"
                  draggable="false"
                />
              ) : null}
            </div>
            <div className="player-club">
              {revealAttribute.club || gameOver || isCorrect ? (
                <img src={playerClub} alt="club" draggable="false" className='reveal-club' />
              ) : null}
            </div>
          </div>
          <div className="player-picture">
            {gameOver || isCorrect ? (
              <img src={playerImage} alt="player img" draggable="false" className='reveal-player' />
            ) : (
              <img src={playerImage} style={{ filter: 'brightness(0)' }} alt="silouette" draggable="false" />
            )}
          </div>
        </div>
        <div className="player-card-bottom">
          <div className="player-info">
            <div className="player-name">
              {gameOver ? (
                <span className='reveal-name'>{playerData.name}</span>
              ) : (
                <span style={{ opacity: 0 }}>UNKNOWN PLAYER</span>
              )}
            </div>
            <div className="player-features">
              <div className="player-features-col">
                <span>
                  <div className="player-feature-value">{playerData.pace}</div>
                  <div className="player-feature-title">PAC</div>
                </span>
                <span>
                  <div className="player-feature-value">
                    {playerData.shooting}
                  </div>
                  <div className="player-feature-title">SHO</div>
                </span>
                <span>
                  <div className="player-feature-value">
                    {playerData.passing}
                  </div>
                  <div className="player-feature-title">PAS</div>
                </span>
              </div>
              <div className="player-features-col">
                <span>
                  <div className="player-feature-value">
                    {playerData.dribbling}
                  </div>
                  <div className="player-feature-title">DRI</div>
                </span>
                <span>
                  <div className="player-feature-value">
                    {playerData.defending}
                  </div>
                  <div className="player-feature-title">DEF</div>
                </span>
                <span>
                  <div className="player-feature-value">
                    {playerData.physicality}
                  </div>
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
