import { players, scores } from '../config/world'

import { IOptions } from '../interfaces/IOptions'

const EndOfGame = (socket: SocketIO.Socket, io: SocketIO.Server, options: IOptions) => {
  if (players[socket.id].gameId === options.gameId) {
    socket.emit('getPlayersScore', {
      score: players[socket.id].score
    })
  }
}

export { EndOfGame }