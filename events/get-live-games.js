const { getLiveGames } = require('../utils')
const { games } = require('../world')

const GetLiveGames = (socket) => {
  socket.emit('listOfLiveGames', {
    list: getLiveGames(games)
  })
}

module.exports = {
  GetLiveGames: GetLiveGames
}