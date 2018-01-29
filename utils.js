const request = require('request')
const shortid = require('shortid')

const findWinner = (scores, players) => {
  const winningScore = Math.max(...scores)

  for (let key in players) {
    if (players[key].score === winningScore) {
      return players[key].name
    }
  }
}

const doesGameExist = (gameId) => {
  return new Promise((resolve) => {
    request('http://localhost:9000/api/games', (error, response) => {
      const games = JSON.parse(response.body);

      resolve(games.some(game => game.gameId === gameId))
    })
  })
}

const getQuestionsForGame = (gameId) => {
  return new Promise((resolve) => {
    request('http://localhost:9000/api/games', (error, response) => {
      const games = JSON.parse(response.body);

      games.forEach(game => {
        if (game.gameId === gameId) {
          resolve(game.questions[0].results)
        }
      })
    })
  })
}

const getQuestions = () => {
  return new Promise((resolve, reject) => {
    request('https://opentdb.com/api.php?amount=20', (error, response, body) => {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    })
  })
}

const createGame = (gameName, questions) => {
  const gameId = shortid.generate()

  return new Promise(resolve => {
    request.post({
      url: 'http://localhost:9000/api/games',
      json: {
        name: gameName,
        gameId: gameId,
        questions: JSON.parse(questions)
      }
    })
    resolve(gameId)
  })
}

module.exports = {
  findWinner: findWinner,
  doesGameExist: doesGameExist,
  getQuestionsForGame: getQuestionsForGame,
  getQuestions: getQuestions,
  createGame: createGame
}