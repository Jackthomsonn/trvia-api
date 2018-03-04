import { games, players } from '../config/world'

import { IOptions } from '../interfaces/IOptions'

const SubmitAnswer = (socket: SocketIO.Socket, io: SocketIO.Server, options: IOptions) => {
  if (options.isAnswerCorrect) {
    players[socket.id].score = players[socket.id].score + 1 * 100
  }

  games[options.gameId].answers = games[options.gameId].answers + 1

  if (games[options.gameId].answers === Object.keys(io.sockets.adapter.rooms[options.gameId].sockets).length) {
    io.in(options.gameId).emit('everyoneAnswered')
    games[options.gameId].answers = 0
  }
}

export { SubmitAnswer }