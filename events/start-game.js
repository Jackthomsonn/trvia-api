const { getQuestionsForGame, getLiveGames } = require('../utils')
const { games } = require('../world')

const StartGame = (io, options) => {
  getQuestionsForGame(options.gameId).then(questions => {
    io.in(options.gameId).emit('startTheGame', questions)
    games[options.gameId].isInPlay = true

    io.emit('updateLiveGames', {
      list: getLiveGames(games)
    })
  })
}

module.exports = {
  StartGame: StartGame
}