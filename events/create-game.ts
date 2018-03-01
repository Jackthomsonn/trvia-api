import { getQuestions, createGame, getLiveGames } from '../utilities/utils'
import { games, players } from '../config/world'

const CreateGame = (socket, io, options) => {
  getQuestions(options).then((questions: any) => {
    createGame(options.gameName, questions).then((gameId: any) => {
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

export { CreateGame }