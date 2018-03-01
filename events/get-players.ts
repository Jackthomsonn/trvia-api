import { games, players }  from '../config/world'

const GetPlayers = (socket, io, options) => {
  if (!io.sockets.adapter.rooms[options.gameId]) {
    return
  }

  const playersInRoom = io.sockets.adapter.rooms[options.gameId].sockets
  const updatedPlayersList = []
  const playersInGameCount = Object.keys(playersInRoom).length

  for (let key in playersInRoom) {
    if (players[key]) {
      updatedPlayersList.push(players[key])

      if (playersInGameCount === updatedPlayersList.length) {
        socket.emit('updatePlayersInGame', updatedPlayersList)
      }
    }
  }
}

export { GetPlayers }