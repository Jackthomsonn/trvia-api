const { findWinner, doesGameExist, getQuestionsForGame, getQuestions, createGame } = require('./utils')

const players = {}
const scores = []
let answers = 0

const socket = (io) => {
  io.on('connection', (socket) => {
    const _id = socket.id

    socket.on('joinGame', (options) => {
      doesGameExist(options.gameId).then(exists => {
        if (exists) {
          socket.join(options.gameId)

          players[_id] = {
            gameId: options.gameId,
            name: options.playerName,
            isHost: options.isHost,
            score: 0
          }

          getQuestionsForGame(options.gameId).then(questions => {
            socket.emit('joinedGame', questions)
            io.sockets.in(options.gameId).emit('playerJoined', options.playerName)
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

          players[_id] = {
            roomName: gameId,
            name: options.playerName,
            isHost: options.isHost,
            score: 0
          }

          io.sockets.in(gameId).emit('playerJoined', options.playerName)
        })
      }).catch(error => {
        return error
      })
    })

    socket.on('startGame', (options) => {
      getQuestionsForGame(options.gameId).then(questions => {
        io.sockets.in(options.gameId).emit('startTheGame', questions)
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

          if (playersInGameCount - 1 === updatedPlayersList.length) {
            socket.emit('updatePlayersInGame', updatedPlayersList)
          }
        }
      }
    })

    socket.on('submitAnswer', (options) => {
      if (options.isAnswerCorrect) {
        players[_id].score = players[_id].score + 1
      }

      answers++

      if (answers === Object.keys(io.sockets.adapter.rooms[options.gameId].sockets).length) {
        io.sockets.in(options.gameId).emit('everyoneAnswered')
        answers = 0
      }
    })

    socket.on('resetAnswerCount', () => {
      answers = 0
    })

    socket.on('endOfGame', (options) => {
      for (let key in players) {
        scores.push(players[key].score)
      }

      io.sockets.in(options.gameId).emit('theWinner', `The winner is ${findWinner(scores, players)}`)
    })

    socket.on('leaveGame', (options) => {
      if (players[_id] && players[_id].isHost) {
        io.sockets.in(options.gameId).emit('hostLeft')
      }

      io.sockets.in(options.gameId).emit('playerLeft', options.playerName)

      socket.leave(options.gameId)
    })
  })
}

module.exports = socket