const { getQuestions, createGame, getLiveGames } = require('../utils')
const { games, players } = require('../world')

const CreateGame = (socket, io, options) => {
  getQuestions().then(questions => {
    createGame(options.gameName, questions).then(gameId => {
      socket.emit('gameId', gameId)
      socket.join(gameId)

      games[gameId] = {
        gameId: gameId,
        gameName: options.gameName,
        answers: 0,
        isInPlay: false,
        private: options.private
      }

      players[socket.id] = {
        gameId: gameId,
        name: options.playerName,
        isHost: options.isHost,
        score: 0
      }

      io.in(gameId).emit('playerJoined', options.playerName)

      io.emit('updateLiveGames', {
        list: getLiveGames(games)
      })
    })
  })
}

module.exports = {
  CreateGame: CreateGame
}