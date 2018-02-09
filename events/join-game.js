const { doesGameExist, getQuestionsForGame } = require('../utils')
const { players, games } = require('../world')

const JoinGame = (socket, io, options) => {
  doesGameExist(options.gameId).then(exists => {
    if (exists) {
      if (games[options.gameId].isInPlay) {
        socket.emit('gameHasStarted', { message: 'That game has already started' })
        return
      }
      socket.join(options.gameId)

      players[socket.id] = {
        gameId: options.gameId,
        name: options.playerName,
        isHost: options.isHost,
        score: 0
      }

      getQuestionsForGame(options.gameId).then(questions => {
        socket.emit('joinedGame', questions)
        io.in(options.gameId).emit('playerJoined', options.playerName)
      })
    } else {
      socket.emit('gameDoesNotExist', { message: 'That game does not exist' })
    }
  })
}

module.exports = {
  JoinGame: JoinGame
}