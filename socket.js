const { JoinGame } = require('./events/join-game')
const { CreateGame } = require('./events/create-game')
const { StartGame } = require('./events/start-game')
const { GetLiveGames } = require('./events/get-live-games')
const { GetPlayers } = require('./events/get-players')
const { SubmitAnswer } = require('./events/submit-answer')
const { ResetAnswerCount } = require('./events/reset-answer-count')
const { EndOfGame } = require('./events/end-of-game')
const { LeaveGame } = require('./events/leave-game')
const { Disconnect } = require('./events/disconnect')
const { GetWinner } = require('./events/get-winner')

const socket = io => {
  io.on('connection', socket => {

    socket.on('joinGame', JoinGame.bind(null, socket, io))

    socket.on('createGame', CreateGame.bind(null, socket, io))

    socket.on('startGame', StartGame.bind(null, io))

    socket.on('getLiveGames', GetLiveGames.bind(null, socket))

    socket.on('getPlayers', GetPlayers.bind(null, socket, io))

    socket.on('submitAnswer', SubmitAnswer.bind(null, socket, io))

    socket.on('resetAnswerCount', ResetAnswerCount)

    socket.on('endOfGame', EndOfGame.bind(null, socket, io))

    socket.on('leaveGame', LeaveGame.bind(null, socket, io))

    socket.on('disconnect', Disconnect.bind(null, socket, io))

    socket.on('getTheOverallWinner', GetWinner.bind(null, io))
  })
}

module.exports = socket