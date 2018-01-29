const socket = require('./socket')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const application = {
  instantiateApplicationDefaults: (app) => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/trvia')

    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
    app.use(cors())
  },
  setupApi: (app) => {
    app.use('/api', require('./routes/games/games'))
  },
  setupSocket: (io) => {
    socket(io)
  },
  start: (server) => {
    server.listen(9000)
  }
}

module.exports = application