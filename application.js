const socket = require('./socket')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const application = {
  instantiateApplicationDefaults: (app) => {
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/trvia')

    app.use(bodyParser.json())
    app.use(cors())
  },
  setupApi: app => app.use('/api', require('./routes/games/games')),
  setupSocket: io => socket(io),
  start: server => server.listen(process.env.PORT || 9000)
}

module.exports = application