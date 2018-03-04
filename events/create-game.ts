import { games, players } from '../config/world'
import { createGame, getLiveGames, getQuestions } from '../utilities/utils'

import { IOptions } from '../interfaces/IOptions'

const CreateGame = (socket: SocketIO.Socket, io: SocketIO.Server, options: IOptions) => {
  getQuestions(options).then((questions: Array<any>) => {
    createGame(options.gameName, questions).then((gameId: string) => {
      socket.emit('gameId', gameId)
      socket.join(gameId)

      games[gameId] = {
        answers: 0,
        gameId,
        gameName: options.gameName,
        isInPlay: false,
        private: options.private
      }

      players[socket.id] = {
        gameId,
        isHost: options.isHost,
        name: options.playerName,
        score: 0,
      }

      io.in(gameId).emit('playerJoined', options.playerName)

      io.emit('updateLiveGames', {
        list: getLiveGames(games)
      })
    })
  })
}

export { CreateGame }