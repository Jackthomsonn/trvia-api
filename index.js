const express = require('express')
const app = new express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const application = require('./application')

application.instantiateApplicationDefaults(app)

application.setupApi(app)

application.setupSocket(io)

application.start(server)