import { CreateGame } from '../events/create-game'
import { Disconnect } from '../events/disconnect'
import { EndOfGame } from '../events/end-of-game'
import { GetLiveGames } from '../events/get-live-games'
import { GetPlayers } from '../events/get-players'
import { GetWinner } from '../events/get-winner'
import { JoinGame } from '../events/join-game'
import { LeaveGame } from '../events/leave-game'
import { ResetAnswerCount } from '../events/reset-answer-count'
import { StartGame } from '../events/start-game'
import { SubmitAnswer } from '../events/submit-answer'

const socket = (io: SocketIO.Server) => {
  io.on('connection', (socketInstance: SocketIO.Socket) => {

    socketInstance.on('joinGame', JoinGame.bind(null, socketInstance, io))

    socketInstance.on('createGame', CreateGame.bind(null, socketInstance, io))

    socketInstance.on('startGame', StartGame.bind(null, io))

    socketInstance.on('getLiveGames', GetLiveGames.bind(null, socketInstance))

    socketInstance.on('getPlayers', GetPlayers.bind(null, socketInstance, io))

    socketInstance.on('submitAnswer', SubmitAnswer.bind(null, socketInstance, io))

    socketInstance.on('resetAnswerCount', ResetAnswerCount)

    socketInstance.on('endOfGame', EndOfGame.bind(null, socketInstance, io))

    socketInstance.on('leaveGame', LeaveGame.bind(null, socketInstance, io))

    socketInstance.on('disconnect', Disconnect.bind(null, socketInstance, io))

    socketInstance.on('getTheOverallWinner', GetWinner.bind(null, io))
  })
}

export { socket }