const { games } = require('../world')

const ResetAnswerCount = (options) => {
  if (games[options.gameId]) {
    games[options.gameId].answers = 0
  } else {
    games[options.gameId] = {
      answers: 0
    }
  }
}

module.exports = {
  ResetAnswerCount: ResetAnswerCount
}