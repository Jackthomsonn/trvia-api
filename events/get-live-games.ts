import { games } from '../config/world'
import { getLiveGames } from '../utilities/utils'

const GetLiveGames = (socket: SocketIO.Socket) => {
  socket.emit('listOfLiveGames', {
    list: getLiveGames(games)
  })
}

export { GetLiveGames }