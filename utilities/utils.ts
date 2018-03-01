import request from 'request'
import shortid from 'shortid'
import { NODE_ENV, PORT } from '../config/env'
import { winningScore } from '../config/world'

export const getBaseUri = () => {
  return NODE_ENV === 'development'
    ? `http://localhost:${PORT}/api/games`
    : 'https://trvia.herokuapp.com/api/games'
}

export const findWinner = (scores, players, options) => {
  winningScore[options.gameId] = Math.max(...scores[options.gameId])

  for (let key in players) {
    if (players[key].gameId === options.gameId) {
      if (players[key].score === winningScore[options.gameId]) {
        return players[key].name
      }
    }
  }
}

export const doesGameExist = gameId => {
  return new Promise((resolve) => {
    request(getBaseUri(), (error, response) => {
      const games = JSON.parse(response.body);

      resolve(games.some(game => game.gameId === gameId))
    })
  })
}

export const getQuestionsForGame = gameId => {
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

export const getQuestions = (options) => {
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

export const createGame = (gameName: string, questions: Array<any>) => {
  const gameId = shortid.generate()

  return new Promise(resolve => {
    request.post({
      url: getBaseUri(),
      json: {
        name: gameName,
        gameId: gameId,
        questions: (<any>JSON.parse)(questions)
      }
    })
    resolve(gameId)
  })
}

export const getGame = gameId => {
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

export const deleteGame = gameId => {
  getGame(gameId).then((id) => {
    request.delete({
      url: `${getBaseUri()}/${id}`
    })
  })
}

export const getLiveGames = games => {
  const gamesAsArray = []
  for (let key in games) {
    if (!games[key].private && !games[key].isInPlay) {
      gamesAsArray.push(games[key])
    }
  }

  return gamesAsArray
}