const express = require('express')
const router = express.Router()
const Projects = require('../../models/game/game.model')

Projects.methods(['get', 'post', 'delete'])

Projects.register(router, '/games')

module.exports = router