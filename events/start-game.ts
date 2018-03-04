import { games } from '../config/world'
import { getLiveGames, getQuestionsForGame } from '../utilities/utils'

import { IOptions } from '../interfaces/IOptions'

const StartGame = (io: SocketIO.Server, options: IOptions) => {
  getQuestionsForGame(options.gameId).then(questions => {
    io.in(options.gameId).emit('startTheGame', questions)
    games[options.gameId].isInPlay = true

    io.emit('updateLiveGames', {
      list: getLiveGames(games)
    })
  })
}

export { StartGame }