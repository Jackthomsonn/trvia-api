import { games, players } from '../config/world'
import { doesGameExist, getQuestionsForGame } from '../utilities/utils'

import { IOptions } from '../interfaces/IOptions'

const JoinGame = (socket: SocketIO.Socket, io: SocketIO.Server, options: IOptions) => {
  doesGameExist(options.gameId).then((exists: boolean) => {
    if (exists) {
      if (games[options.gameId].isInPlay) {
        socket.emit('gameHasStarted', { message: 'That game has already started' })
        return
      }
      socket.join(options.gameId)

      players[socket.id] = {
        gameId: options.gameId,
        isHost: options.isHost,
        name: options.playerName,
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

export { JoinGame }