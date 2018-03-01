import { games } from '../config/world'

const ResetAnswerCount = (options) => {
  if (games[options.gameId]) {
    games[options.gameId].answers = 0
  } else {
    games[options.gameId] = {
      answers: 0
    }
  }
}

export { ResetAnswerCount }