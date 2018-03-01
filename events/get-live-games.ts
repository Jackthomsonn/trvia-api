import { getLiveGames } from '../utilities/utils'
import { games } from '../config/world'

const GetLiveGames = (socket) => {
  socket.emit('listOfLiveGames', {
    list: getLiveGames(games)
  })
}

export { GetLiveGames }