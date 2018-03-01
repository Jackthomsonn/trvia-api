import { getQuestionsForGame, getLiveGames } from '../utilities/utils'
import { games } from '../config/world'

const StartGame = (io, options) => {
  getQuestionsForGame(options.gameId).then(questions => {
    io.in(options.gameId).emit('startTheGame', questions)
    games[options.gameId].isInPlay = true

    io.emit('updateLiveGames', {
      list: getLiveGames(games)
    })
  })
}

export { StartGame }