const { deleteGame, getLiveGames } = require('../utils')
const { players, games } = require('../world')

const Disconnect = (socket, io) => {
  if (players[socket.id] && players[socket.id].isHost) {
    io.in(players[socket.id].gameId).emit('hostLeft')
    deleteGame(players[socket.id].gameId)
    delete games[players[socket.id].gameId]
    io.emit('updateLiveGames', {
      list: getLiveGames(games)
    })
  } else if (players[socket.id] && !players[socket.id].isHost) {
    io.in(players[socket.id].gameId).emit('playerLeft', players[socket.id].playerName)
  } else {
    return
  }

  delete players[socket.id]
}

module.exports = {
  Disconnect: Disconnect
}