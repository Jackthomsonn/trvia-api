const request = require('request')
const shortid = require('shortid')
const uri = process.env.NODE_ENV = 'development'
  ? 'http://localhost:' + process.env.PORT + '/api/games'
  : 'https://trvia.herokuapp.com/api/games'

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
    request(uri, (error, response) => {
      const games = JSON.parse(response.body);

      resolve(games.some(game => game.gameId === gameId))
    })
  })
}

const getQuestionsForGame = (gameId) => {
  return new Promise((resolve) => {
    request(uri, (error, response) => {
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
      url: uri,
      json: {
        name: gameName,
        gameId: gameId,
        questions: JSON.parse(questions)
      }
    })
    resolve(gameId)
  })
}

const getGame = (gameId) => {
  return new Promise((resolve) => {
    request(uri, (error, response, body) => {
      const parsedBody = JSON.parse(body)

      parsedBody.find(game => {
        if (game.gameId === gameId) {
          resolve(game._id)
        }
      })
    })
  })
}

const deleteGame = (gameId) => {
  getGame(gameId).then((id) => {
    request.delete({
      url: `${uri}/${id}`
    })
  })
}

const getLiveGames = (games) => {
  const gamesAsArray = []
  for (let key in games) {
    if (!games[key].private && !games[key].isInPlay) {
      gamesAsArray.push(games[key])
    }
  }

  return gamesAsArray
}

module.exports = {
  findWinner: findWinner,
  doesGameExist: doesGameExist,
  getQuestionsForGame: getQuestionsForGame,
  getQuestions: getQuestions,
  createGame: createGame,
  deleteGame: deleteGame,
  getLiveGames: getLiveGames
}