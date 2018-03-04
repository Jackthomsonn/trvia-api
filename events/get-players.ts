import { games, players } from '../config/world'

import { IOptions } from '../interfaces/IOptions'

const GetPlayers = (socket: SocketIO.Socket, io: SocketIO.Server, options: IOptions) => {
  if (!io.sockets.adapter.rooms[options.gameId]) {
    return
  }

  const playersInRoom = io.sockets.adapter.rooms[options.gameId].sockets
  const updatedPlayersList = []
  const playersInGameCount = Object.keys(playersInRoom).length

  for (const key in playersInRoom) {
    if (players[key]) {
      updatedPlayersList.push(players[key])

      if (playersInGameCount === updatedPlayersList.length) {
        socket.emit('updatePlayersInGame', updatedPlayersList)
      }
    }
  }
}

export { GetPlayers }