function Score({currentScore, bestScore}) {

  return (
    <div className="score-container">
      <h1>Memory Card Game</h1>

      <div className="score-box">
        <div className="score-item">
          <h2>Current score</h2>
          <h3> {currentScore} </h3>
        </div>

        <div className="score-item">
          <h2>Best score</h2>
          <h3> {bestScore} </h3>
        </div>
      </div>
    </div>
  )
}

export default Score