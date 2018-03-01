import { deleteGame, getLiveGames } from '../utilities/utils'
import { players, games } from '../config//world'

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

export { LeaveGame }