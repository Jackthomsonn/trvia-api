const socket = require('./socket')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const env = require('./env')

const application = {
  instantiateApplicationDefaults: app => {
    mongoose.Promise = global.Promise
    mongoose.connect(env.MONGO_URI)

    app.use(bodyParser.json())
    app.use(cors())
  },
  setupAPI: app => {
    app.use('/api', require('./routes/games/games'))
  },
  setupSocket: io => {
    socket(io)
  },
  start: server => {
    server.listen(env.PORT)
    process.stdout.write(`Listening on port ${env.PORT} in ${env.NODE_ENV} mode`)
  }
}

module.exports = application