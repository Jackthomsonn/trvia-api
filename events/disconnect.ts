import { games, players } from '../config/world'
import { deleteGame, getLiveGames } from '../utilities/utils'

const Disconnect = (socket: SocketIO.Socket, io: SocketIO.Server) => {
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

export { Disconnect }