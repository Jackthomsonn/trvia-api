const {
  findWinner,
  doesGameExist,
  getQuestionsForGame,
  getQuestions,
  createGame,
  deleteGame,
  getLiveGames } = require('./utils')

const players = {}
const scores = []
const games = {}

const socket = (io) => {
  io.on('connection', (socket) => {
    const _id = socket.id

    socket.on('joinGame', (options) => {
      doesGameExist(options.gameId).then(exists => {
        if (exists) {
          if (games[options.gameId].isInPlay) {
            socket.emit('gameHasStarted', { message: 'That game has already started' })
            return
          }
          socket.join(options.gameId)

          players[_id] = {
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
    })

    socket.on('createGame', (options) => {
      getQuestions().then(questions => {
        createGame(options.gameName, questions).then(gameId => {
          socket.emit('gameId', gameId)
          socket.join(gameId)

          games[gameId] = {
            gameId: gameId,
            gameName: options.gameName,
            answers: 0,
            isInPlay: false,
            private: options.private
          }

          players[_id] = {
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
      }).catch(error => {
        return error
      })
    })

    socket.on('startGame', (options) => {
      getQuestionsForGame(options.gameId).then(questions => {
        io.in(options.gameId).emit('startTheGame', questions)
        games[options.gameId].isInPlay = true

        io.emit('updateLiveGames', {
          list: getLiveGames(games)
        })
      })
    })

    socket.on('getLiveGames', () => {
      socket.emit('listOfLiveGames', {
        list: getLiveGames(games)
      })
    })

    socket.on('getPlayers', (options) => {
      if (!io.sockets.adapter.rooms[options.gameId]) {
        return
      }

      const playersInRoom = io.sockets.adapter.rooms[options.gameId].sockets
      const updatedPlayersList = []
      const playersInGameCount = Object.keys(playersInRoom).length

      for (let key in playersInRoom) {
        if (players[key]) {
          updatedPlayersList.push(players[key])

          if (playersInGameCount === updatedPlayersList.length) {
            socket.emit('updatePlayersInGame', updatedPlayersList)
          }
        }
      }
    })

    socket.on('submitAnswer', (options) => {
      if (options.isAnswerCorrect) {
        players[_id].score = (players[_id].score + 1) * 100
      }

      games[options.gameId].answers = games[options.gameId].answers + 1

      if (games[options.gameId].answers === Object.keys(io.sockets.adapter.rooms[options.gameId].sockets).length) {
        io.in(options.gameId).emit('everyoneAnswered')
        games[options.gameId].answers = 0
      }
    })

    socket.on('resetAnswerCount', (options) => {
      if (games[options.gameId]) {
        games[options.gameId].answers = 0
      } else {
        games[options.gameId] = {
          answers: 0
        }
      }
    })

    socket.on('endOfGame', (options) => {
      for (let key in players) {
        scores.push(players[key].score)
      }

      io.in(options.gameId).emit('theWinner', {
        name: findWinner(scores, players),
        playerScore: players[_id].score
      })
    })

    socket.on('leaveGame', (options) => {
      if (players[_id] && players[_id].isHost) {
        io.in(options.gameId).emit('hostLeft')
        delete games[options.gameId]
        deleteGame(options.gameId)

        io.emit('updateLiveGames', {
          list: getLiveGames(games)
        })
      }

      io.in(options.gameId).emit('playerLeft', options.playerName)

      socket.leave(options.gameId)
    })

    socket.on('disconnect', () => {
      if (players[_id] && players[_id].isHost) {
        io.in(players[_id].gameId).emit('hostLeft')
        deleteGame(players[_id].gameId)
        delete games[players[_id].gameId]
        io.emit('updateLiveGames', {
          list: getLiveGames(games)
        })
      } else if (players[_id] && !players[_id].isHost) {
        io.in(players[_id].gameId).emit('playerLeft', players[_id].playerName)
      } else {
        return
      }

      delete players[_id]
    })
  })
}

module.exports = socket