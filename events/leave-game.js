const { deleteGame, getLiveGames } = require('../utils')
const { players, games } = require('../world')

const LeaveGame = (socket, io, options) => {
  if (players[socket.id] && players[socket.id].isHost) {
    io.in(options.gameId).emit('hostLeft')
    delete games[options.gameId]
    deleteGame(options.gameId)

    io.emit('updateLiveGames', {
      list: getLiveGames(games)
    })
  }

  io.in(options.gameId).emit('playerLeft', options.playerName)

  socket.leave(options.gameId)
}

module.exports = {
  LeaveGame: LeaveGame
}