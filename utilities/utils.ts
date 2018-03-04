import * as request from 'request'
import * as shortid from 'shortid'

import { winningScore } from '../config/world'
import { IOptions } from '../interfaces/IOptions'
import { IGame } from './../interfaces/IGame'
import { IPlayer } from './../interfaces/IPlayer'

import { NODE_ENV, PORT } from '../config/env'

export const getBaseUri = (): string => {
  return NODE_ENV === 'development'
    ? `http://localhost:${PORT}/api/games`
    : 'https://trvia.herokuapp.com/api/games'
}

export const findWinner = (scores: Array<Set<number>>, players: IPlayer, options: IOptions): string => {
  winningScore[options.gameId] = Math.max(...scores[options.gameId])

  for (const key in players) {
    if (players[key].gameId === options.gameId) {
      if (players[key].score === winningScore[options.gameId]) {
        return players[key].name
      }
    }
  }
}

export const doesGameExist = (gameId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    request(getBaseUri(), (error: string, response: request.Response) => {
      const games: Array<IGame> = JSON.parse(response.body);

      resolve(games.some(game => game.gameId === gameId))
    })
  })
}

export const getQuestionsForGame = (gameId: string): Promise<Array<any>> => {
  return new Promise(resolve => {
    request(getBaseUri(), (error: string, response: request.Response) => {
      const games: Array<IGame> = JSON.parse(response.body);

      games.forEach(game => {
        if (game.gameId === gameId) {
          resolve(game.questions[0].results);
        }
      })
    })
  })
}

export const getQuestions = (options: IOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uri = `https://opentdb.com/api.php?amount=${options.amount}&difficulty=${options.difficulty}`

    request(uri, (error: string, response: request.Response, body: Body) => {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    })
  })
}

export const createGame = (gameName: string, questions: Array<any>): Promise<string> => {
  const gameId = shortid.generate()

  return new Promise(resolve => {
    request.post({
      json: {
        gameId,
        name: gameName,
        questions: (JSON.parse as any)(questions)
      },
      url: getBaseUri()
    })
    resolve(gameId)
  })
}

export const getGame = (gameId: string): Promise<string> => {
  return new Promise(resolve => {
    request(getBaseUri(), (error: string, response: request.Response, body: string) => {
      const parsedBody: IGame = JSON.parse(body)

      parsedBody.find((game: IGame) => {
        if (game.gameId === gameId) {
          resolve(game._id)
        }
      })
    })
  })
}

export const deleteGame = (gameId: string) => {
  getGame(gameId).then((id) => {
    request.delete({
      url: `${getBaseUri()}/${id}`
    })
  })
}

export const getLiveGames = (games: Array<IGame>): Array<IGame> => {
  const gamesAsArray = []

  for (const key in games) {
    if (!games[key].private && !games[key].isInPlay) {
      gamesAsArray.push(games[key])
    }
  }

  return gamesAsArray
}