import * as restful from 'node-restful'

const mongoose = restful.mongoose

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: true
  }
})

const GamesModel = restful.model('Game', gameSchema)

export { GamesModel }