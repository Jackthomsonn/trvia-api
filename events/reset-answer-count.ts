import { games } from '../config/world'

import { IOptions } from '../interfaces/IOptions'

const ResetAnswerCount = (options: IOptions) => {
  if (games[options.gameId]) {
    games[options.gameId].answers = 0
  } else {
    games[options.gameId] = {
      answers: 0
    }
  }
}

export { ResetAnswerCount }