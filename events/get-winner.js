const { findWinner } = require('../utils')
const { players, scores } = require('../world')

const GetWinner = (io, options) => {
  let playerScore;
  scores[options.gameId] = []

  for (let key in players) {
    scores[options.gameId].push(players[key].score)
  }

  io.in(options.gameId).emit('theWinner', {
    name: findWinner(scores, players, options)
  })

  delete scores[options.gameId]
}

module.exports = {
  GetWinner: GetWinner
}