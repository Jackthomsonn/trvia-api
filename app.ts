import * as Express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import * as io from 'socket.io'
import * as cors from 'cors'
import * as mongoose from 'mongoose'

import { PORT, NODE_ENV, MONGO_URI } from './config/env'
import { socket } from './config/socket'

import { gamesRoute } from './routes/games/games'

class App {
  private app: Express.Application
  private server: http.Server
  private io: SocketIO.Server

  constructor() {
    this.app = Express()
    this.server = new http.Server(this.app)
    this.io = io(this.server)

    this.instantiateApplicationDefaults()
    this.setupAPI()
    this.setupSocket()
    this.start()
  }

  private instantiateApplicationDefaults = () => {
    (<any>mongoose).Promise = global.Promise
    mongoose.connect(MONGO_URI)
    this.app.use(bodyParser.json())
    this.app.use(cors())
  }

  private setupAPI = () => {
    this.app.use('/api', gamesRoute)
  }

  private setupSocket = () => {
    socket(this.io)
  }

  private start = () => {
    this.server.listen(PORT)
    process.stdout.write(`Listening on port ${PORT} in ${NODE_ENV} mode`)
  }
}

export { App }