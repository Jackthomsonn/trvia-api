const request = require('request')
const shortid = require('shortid')
const env = require('./env')
const { winningScore } = require('./world')

const getBaseUri = () => {
  return env.NODE_ENV === 'development'
    ? `http://localhost:${env.PORT}/api/games`
    : 'https://trvia.herokuapp.com/api/games'
}

const findWinner = (scores, players, options) => {
  console.log(winningScore)
  winningScore[options.gameId] = Math.max(...scores[options.gameId])

  for (let key in players) {
    if (players[key].gameId === options.gameId) {
      if (players[key].score === winningScore[options.gameId]) {
        return players[key].name
      }
    }
  }
}

const doesGameExist = gameId => {
  return new Promise((resolve) => {
    request(getBaseUri(), (error, response) => {
      const games = JSON.parse(response.body);

      resolve(games.some(game => game.gameId === gameId))
    })
  })
}

const getQuestionsForGame = gameId => {
  return new Promise((resolve) => {
    request(getBaseUri(), (error, response) => {
      const games = JSON.parse(response.body);

      games.forEach(game => {
        if (game.gameId === gameId) {
          resolve(game.questions[0].results)
        }
      })
    })
  })
}

const getQuestions = (options) => {
  console.log('Request looks like..')
  console.log(`https://opentdb.com/api.php?amount=${options.amount}&difficulty=${options.difficulty}`)
  return new Promise((resolve, reject) => {
    request(`https://opentdb.com/api.php?amount=${options.amount}&difficulty=${options.difficulty}`, (error, response, body) => {
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
      url: getBaseUri(),
      json: {
        name: gameName,
        gameId: gameId,
        questions: JSON.parse(questions)
      }
    })
    resolve(gameId)
  })
}

const getGame = gameId => {
  return new Promise((resolve) => {
    request(getBaseUri(), (error, response, body) => {
      const parsedBody = JSON.parse(body)

      parsedBody.find(game => {
        if (game.gameId === gameId) {
          resolve(game._id)
        }
      })
    })
  })
}

const deleteGame = gameId => {
  getGame(gameId).then((id) => {
    request.delete({
      url: `${getBaseUri() + '/api/games'}/${id}`
    })
  })
}

const getLiveGames = games => {
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