import { players, scores } from '../config/world'
import { findWinner } from '../utilities/utils'

import { IOptions } from '../interfaces/IOptions'

const GetWinner = (io: SocketIO.Server, options: IOptions) => {
  scores[options.gameId] = []

  for (const key in players) {
    if (players[key].gameId === options.gameId) {
      scores[options.gameId].push(players[key].score)
    }
  }

  io.in(options.gameId).emit('theWinner', {
    name: findWinner(scores, players, options)
  })

  delete scores[options.gameId]
}

export { GetWinner }