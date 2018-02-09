const { players, scores } = require('../world')

const EndOfGame = (socket, io, options) => {
  if (players[socket.id].gameId === options.gameId) {
    socket.emit('getPlayersScore', {
      score: players[socket.id].score
    })
  }
}

module.exports = {
  EndOfGame: EndOfGame
}