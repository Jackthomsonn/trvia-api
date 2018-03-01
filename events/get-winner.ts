import { findWinner } from '../utilities/utils'
import { players, scores } from '../config/world'

const GetWinner = (io, options) => {
  scores[options.gameId] = []

  for (let key in players) {
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