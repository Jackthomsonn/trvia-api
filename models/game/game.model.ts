import * as restful from 'node-restful'

const mongoose = restful.mongoose

const gameSchema = new mongoose.Schema({
  gameId: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  questions: {
    required: true,
    type: Array
  }
})

const GamesModel = restful.model('Game', gameSchema)

export { GamesModel }