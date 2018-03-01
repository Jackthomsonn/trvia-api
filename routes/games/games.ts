import * as express from 'express'
import { GamesModel } from '../../models/game/game.model'

const gamesRoute = express.Router()

GamesModel.methods(['get', 'post', 'delete'])

GamesModel.register(gamesRoute, '/games')

export { gamesRoute }