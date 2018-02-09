const express = require('express')
const app = new express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const application = require('./setup')

application.instantiateApplicationDefaults(app)

application.setupAPI(app)

application.setupSocket(io)

application.start(server)