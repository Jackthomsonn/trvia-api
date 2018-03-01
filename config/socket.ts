import { JoinGame } from '../events/join-game'
import { CreateGame } from '../events/create-game'
import { StartGame } from '../events/start-game'
import { GetLiveGames } from '../events/get-live-games'
import { GetPlayers } from '../events/get-players'
import { SubmitAnswer } from '../events/submit-answer'
import { ResetAnswerCount } from '../events/reset-answer-count'
import { EndOfGame } from '../events/end-of-game'
import { LeaveGame } from '../events/leave-game'
import { Disconnect } from '../events/disconnect'
import { GetWinner } from '../events/get-winner'

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

export { socket }