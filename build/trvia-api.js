/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssmbly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
const cors = __webpack_require__(/*! cors */ "cors");
const Express = __webpack_require__(/*! express */ "express");
const http = __webpack_require__(/*! http */ "http");
const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const io = __webpack_require__(/*! socket.io */ "socket.io");
const env_1 = __webpack_require__(/*! ./config/env */ "./config/env.ts");
const socket_1 = __webpack_require__(/*! ./config/socket */ "./config/socket.ts");
const games_1 = __webpack_require__(/*! ./routes/games/games */ "./routes/games/games.ts");
class App {
    constructor() {
        this.instantiateApplicationDefaults = () => {
            mongoose.Promise = global.Promise;
            mongoose.connect(env_1.MONGO_URI);
            this.app.use(bodyParser.json());
            this.app.use(cors());
        };
        this.setupAPI = () => {
            this.app.use('/api', games_1.gamesRoute);
        };
        this.setupSocket = () => {
            socket_1.socket(this.io);
        };
        this.start = () => {
            this.server.listen(env_1.PORT);
            process.stdout.write(`Listening on port ${env_1.PORT} in ${env_1.NODE_ENV} mode`);
        };
        this.app = Express();
        this.server = new http.Server(this.app);
        this.io = io(this.server);
        this.instantiateApplicationDefaults();
        this.setupAPI();
        this.setupSocket();
        this.start();
    }
}
exports.App = App;


/***/ }),

/***/ "./config/env.ts":
/*!***********************!*\
  !*** ./config/env.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = process.env.PORT || 9000;
exports.NODE_ENV = "development" || 'development';
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/trvia';


/***/ }),

/***/ "./config/socket.ts":
/*!**************************!*\
  !*** ./config/socket.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const create_game_1 = __webpack_require__(/*! ../events/create-game */ "./events/create-game.ts");
const disconnect_1 = __webpack_require__(/*! ../events/disconnect */ "./events/disconnect.ts");
const end_of_game_1 = __webpack_require__(/*! ../events/end-of-game */ "./events/end-of-game.ts");
const get_live_games_1 = __webpack_require__(/*! ../events/get-live-games */ "./events/get-live-games.ts");
const get_players_1 = __webpack_require__(/*! ../events/get-players */ "./events/get-players.ts");
const get_winner_1 = __webpack_require__(/*! ../events/get-winner */ "./events/get-winner.ts");
const join_game_1 = __webpack_require__(/*! ../events/join-game */ "./events/join-game.ts");
const leave_game_1 = __webpack_require__(/*! ../events/leave-game */ "./events/leave-game.ts");
const reset_answer_count_1 = __webpack_require__(/*! ../events/reset-answer-count */ "./events/reset-answer-count.ts");
const start_game_1 = __webpack_require__(/*! ../events/start-game */ "./events/start-game.ts");
const submit_answer_1 = __webpack_require__(/*! ../events/submit-answer */ "./events/submit-answer.ts");
const socket = (io) => {
    io.on('connection', (socketInstance) => {
        socketInstance.on('joinGame', join_game_1.JoinGame.bind(null, socketInstance, io));
        socketInstance.on('createGame', create_game_1.CreateGame.bind(null, socketInstance, io));
        socketInstance.on('startGame', start_game_1.StartGame.bind(null, io));
        socketInstance.on('getLiveGames', get_live_games_1.GetLiveGames.bind(null, socketInstance));
        socketInstance.on('getPlayers', get_players_1.GetPlayers.bind(null, socketInstance, io));
        socketInstance.on('submitAnswer', submit_answer_1.SubmitAnswer.bind(null, socketInstance, io));
        socketInstance.on('resetAnswerCount', reset_answer_count_1.ResetAnswerCount);
        socketInstance.on('endOfGame', end_of_game_1.EndOfGame.bind(null, socketInstance, io));
        socketInstance.on('leaveGame', leave_game_1.LeaveGame.bind(null, socketInstance, io));
        socketInstance.on('disconnect', disconnect_1.Disconnect.bind(null, socketInstance, io));
        socketInstance.on('getTheOverallWinner', get_winner_1.GetWinner.bind(null, io));
    });
};
exports.socket = socket;


/***/ }),

/***/ "./config/world.ts":
/*!*************************!*\
  !*** ./config/world.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.players = {};
exports.scores = [];
exports.games = {};
exports.winningScore = {};


/***/ }),

/***/ "./events/create-game.ts":
/*!*******************************!*\
  !*** ./events/create-game.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const CreateGame = (socket, io, options) => {
    utils_1.getQuestions(options).then((questions) => {
        utils_1.createGame(options.gameName, questions).then((gameId) => {
            socket.emit('gameId', gameId);
            socket.join(gameId);
            world_1.games[gameId] = {
                answers: 0,
                gameId,
                gameName: options.gameName,
                isInPlay: false,
                private: options.private
            };
            world_1.players[socket.id] = {
                gameId,
                isHost: options.isHost,
                name: options.playerName,
                score: 0,
            };
            io.in(gameId).emit('playerJoined', options.playerName);
            io.emit('updateLiveGames', {
                list: utils_1.getLiveGames(world_1.games)
            });
        });
    });
};
exports.CreateGame = CreateGame;


/***/ }),

/***/ "./events/disconnect.ts":
/*!******************************!*\
  !*** ./events/disconnect.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const Disconnect = (socket, io) => {
    if (world_1.players[socket.id] && world_1.players[socket.id].isHost) {
        io.in(world_1.players[socket.id].gameId).emit('hostLeft');
        utils_1.deleteGame(world_1.players[socket.id].gameId);
        delete world_1.games[world_1.players[socket.id].gameId];
        io.emit('updateLiveGames', {
            list: utils_1.getLiveGames(world_1.games)
        });
    }
    else if (world_1.players[socket.id] && !world_1.players[socket.id].isHost) {
        io.in(world_1.players[socket.id].gameId).emit('playerLeft', world_1.players[socket.id].playerName);
    }
    else {
        return;
    }
    delete world_1.players[socket.id];
};
exports.Disconnect = Disconnect;


/***/ }),

/***/ "./events/end-of-game.ts":
/*!*******************************!*\
  !*** ./events/end-of-game.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const EndOfGame = (socket, io, options) => {
    if (world_1.players[socket.id].gameId === options.gameId) {
        socket.emit('getPlayersScore', {
            score: world_1.players[socket.id].score
        });
    }
};
exports.EndOfGame = EndOfGame;


/***/ }),

/***/ "./events/get-live-games.ts":
/*!**********************************!*\
  !*** ./events/get-live-games.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const GetLiveGames = (socket) => {
    socket.emit('listOfLiveGames', {
        list: utils_1.getLiveGames(world_1.games)
    });
};
exports.GetLiveGames = GetLiveGames;


/***/ }),

/***/ "./events/get-players.ts":
/*!*******************************!*\
  !*** ./events/get-players.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const GetPlayers = (socket, io, options) => {
    if (!io.sockets.adapter.rooms[options.gameId]) {
        return;
    }
    const playersInRoom = io.sockets.adapter.rooms[options.gameId].sockets;
    const updatedPlayersList = [];
    const playersInGameCount = Object.keys(playersInRoom).length;
    for (const key in playersInRoom) {
        if (world_1.players[key]) {
            updatedPlayersList.push(world_1.players[key]);
            if (playersInGameCount === updatedPlayersList.length) {
                socket.emit('updatePlayersInGame', updatedPlayersList);
            }
        }
    }
};
exports.GetPlayers = GetPlayers;


/***/ }),

/***/ "./events/get-winner.ts":
/*!******************************!*\
  !*** ./events/get-winner.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const GetWinner = (io, options) => {
    world_1.scores[options.gameId] = [];
    for (const key in world_1.players) {
        if (world_1.players[key].gameId === options.gameId) {
            world_1.scores[options.gameId].push(world_1.players[key].score);
        }
    }
    io.in(options.gameId).emit('theWinner', {
        name: utils_1.findWinner(world_1.scores, world_1.players, options)
    });
    delete world_1.scores[options.gameId];
};
exports.GetWinner = GetWinner;


/***/ }),

/***/ "./events/join-game.ts":
/*!*****************************!*\
  !*** ./events/join-game.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const JoinGame = (socket, io, options) => {
    utils_1.doesGameExist(options.gameId).then((exists) => {
        if (exists) {
            if (world_1.games[options.gameId].isInPlay) {
                socket.emit('gameHasStarted', { message: 'That game has already started' });
                return;
            }
            socket.join(options.gameId);
            world_1.players[socket.id] = {
                gameId: options.gameId,
                isHost: options.isHost,
                name: options.playerName,
                score: 0
            };
            utils_1.getQuestionsForGame(options.gameId).then(questions => {
                socket.emit('joinedGame', questions);
                io.in(options.gameId).emit('playerJoined', options.playerName);
            });
        }
        else {
            socket.emit('gameDoesNotExist', { message: 'That game does not exist' });
        }
    });
};
exports.JoinGame = JoinGame;


/***/ }),

/***/ "./events/leave-game.ts":
/*!******************************!*\
  !*** ./events/leave-game.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config//world */ "./config/world.ts");
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const LeaveGame = (socket, io, options) => {
    if (world_1.players[socket.id] && world_1.players[socket.id].isHost) {
        io.in(options.gameId).emit('hostLeft');
        delete world_1.games[options.gameId];
        utils_1.deleteGame(options.gameId);
        io.emit('updateLiveGames', {
            list: utils_1.getLiveGames(world_1.games)
        });
    }
    io.in(options.gameId).emit('playerLeft', options.playerName);
    socket.leave(options.gameId);
};
exports.LeaveGame = LeaveGame;


/***/ }),

/***/ "./events/reset-answer-count.ts":
/*!**************************************!*\
  !*** ./events/reset-answer-count.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const ResetAnswerCount = (options) => {
    if (world_1.games[options.gameId]) {
        world_1.games[options.gameId].answers = 0;
    }
    else {
        world_1.games[options.gameId] = {
            answers: 0
        };
    }
};
exports.ResetAnswerCount = ResetAnswerCount;


/***/ }),

/***/ "./events/start-game.ts":
/*!******************************!*\
  !*** ./events/start-game.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const StartGame = (io, options) => {
    utils_1.getQuestionsForGame(options.gameId).then(questions => {
        io.in(options.gameId).emit('startTheGame', questions);
        world_1.games[options.gameId].isInPlay = true;
        io.emit('updateLiveGames', {
            list: utils_1.getLiveGames(world_1.games)
        });
    });
};
exports.StartGame = StartGame;


/***/ }),

/***/ "./events/submit-answer.ts":
/*!*********************************!*\
  !*** ./events/submit-answer.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const SubmitAnswer = (socket, io, options) => {
    if (options.isAnswerCorrect) {
        world_1.players[socket.id].score = world_1.players[socket.id].score + 1 * 100;
    }
    world_1.games[options.gameId].answers = world_1.games[options.gameId].answers + 1;
    if (world_1.games[options.gameId].answers === Object.keys(io.sockets.adapter.rooms[options.gameId].sockets).length) {
        io.in(options.gameId).emit('everyoneAnswered');
        world_1.games[options.gameId].answers = 0;
    }
};
exports.SubmitAnswer = SubmitAnswer;


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(/*! ./app */ "./app.ts");
new app_1.App();


/***/ }),

/***/ "./models/game/game.model.ts":
/*!***********************************!*\
  !*** ./models/game/game.model.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const restful = __webpack_require__(/*! node-restful */ "node-restful");
const mongoose = restful.mongoose;
const gameSchema = new mongoose.Schema({
    gameId: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    questions: {
        required: true,
        type: Array
    }
});
const GamesModel = restful.model('Game', gameSchema);
exports.GamesModel = GamesModel;


/***/ }),

/***/ "./routes/games/games.ts":
/*!*******************************!*\
  !*** ./routes/games/games.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
const game_model_1 = __webpack_require__(/*! ../../models/game/game.model */ "./models/game/game.model.ts");
const gamesRoute = express.Router();
exports.gamesRoute = gamesRoute;
game_model_1.GamesModel.methods(['get', 'post', 'delete']);
game_model_1.GamesModel.register(gamesRoute, '/games');


/***/ }),

/***/ "./utilities/utils.ts":
/*!****************************!*\
  !*** ./utilities/utils.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const request = __webpack_require__(/*! request */ "request");
const shortid = __webpack_require__(/*! shortid */ "shortid");
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const env_1 = __webpack_require__(/*! ../config/env */ "./config/env.ts");
exports.getBaseUri = () => {
    return env_1.NODE_ENV === 'development'
        ? `http://localhost:${env_1.PORT}/api/games`
        : 'https://trvia.herokuapp.com/api/games';
};
exports.findWinner = (scores, players, options) => {
    world_1.winningScore[options.gameId] = Math.max(...scores[options.gameId]);
    for (const key in players) {
        if (players[key].gameId === options.gameId) {
            if (players[key].score === world_1.winningScore[options.gameId]) {
                return players[key].name;
            }
        }
    }
};
exports.doesGameExist = (gameId) => {
    return new Promise((resolve) => {
        request(exports.getBaseUri(), (error, response) => {
            const games = JSON.parse(response.body);
            resolve(games.some(game => game.gameId === gameId));
        });
    });
};
exports.getQuestionsForGame = (gameId) => {
    return new Promise(resolve => {
        request(exports.getBaseUri(), (error, response) => {
            const games = JSON.parse(response.body);
            games.forEach(game => {
                if (game.gameId === gameId) {
                    resolve(game.questions[0].results);
                }
            });
        });
    });
};
exports.getQuestions = (options) => {
    return new Promise((resolve, reject) => {
        const uri = `https://opentdb.com/api.php?amount=${options.amount}&difficulty=${options.difficulty}`;
        request(uri, (error, response, body) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(body);
            }
        });
    });
};
exports.createGame = (gameName, questions) => {
    const gameId = shortid.generate();
    return new Promise(resolve => {
        request.post({
            json: {
                gameId,
                name: gameName,
                questions: JSON.parse(questions)
            },
            url: exports.getBaseUri()
        });
        resolve(gameId);
    });
};
exports.getGame = (gameId) => {
    return new Promise(resolve => {
        request(exports.getBaseUri(), (error, response, body) => {
            const parsedBody = JSON.parse(body);
            parsedBody.find((game) => {
                if (game.gameId === gameId) {
                    resolve(game._id);
                }
            });
        });
    });
};
exports.deleteGame = (gameId) => {
    exports.getGame(gameId).then((id) => {
        request.delete({
            url: `${exports.getBaseUri()}/${id}`
        });
    });
};
exports.getLiveGames = (games) => {
    const gamesAsArray = [];
    for (const key in games) {
        if (!games[key].private && !games[key].isInPlay) {
            gamesAsArray.push(games[key]);
        }
    }
    return gamesAsArray;
};


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "node-restful":
/*!*******************************!*\
  !*** external "node-restful" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-restful");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),

/***/ "shortid":
/*!**************************!*\
  !*** external "shortid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL2NvbmZpZy9lbnYudHMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL3NvY2tldC50cyIsIndlYnBhY2s6Ly8vLi9jb25maWcvd29ybGQudHMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzL2NyZWF0ZS1nYW1lLnRzIiwid2VicGFjazovLy8uL2V2ZW50cy9kaXNjb25uZWN0LnRzIiwid2VicGFjazovLy8uL2V2ZW50cy9lbmQtb2YtZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9ldmVudHMvZ2V0LWxpdmUtZ2FtZXMudHMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzL2dldC1wbGF5ZXJzLnRzIiwid2VicGFjazovLy8uL2V2ZW50cy9nZXQtd2lubmVyLnRzIiwid2VicGFjazovLy8uL2V2ZW50cy9qb2luLWdhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzL2xlYXZlLWdhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzL3Jlc2V0LWFuc3dlci1jb3VudC50cyIsIndlYnBhY2s6Ly8vLi9ldmVudHMvc3RhcnQtZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9ldmVudHMvc3VibWl0LWFuc3dlci50cyIsIndlYnBhY2s6Ly8vLi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvZ2FtZS9nYW1lLm1vZGVsLnRzIiwid2VicGFjazovLy8uL3JvdXRlcy9nYW1lcy9nYW1lcy50cyIsIndlYnBhY2s6Ly8vLi91dGlsaXRpZXMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtcmVzdGZ1bFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlcXVlc3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzaG9ydGlkXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic29ja2V0LmlvXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekVBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsV0FBVyxNQUFNLGVBQWU7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQywyQ0FBMkM7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSw2Q0FBNkMsc0NBQXNDO0FBQ25GO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixXQUFXO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxlQUFlLGNBQWMsbUJBQW1CO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IscUJBQXFCLEdBQUcsR0FBRztBQUMvQyxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvRkEsd0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoidHJ2aWEtYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyB3YXNtIG1vZHVsZXNcbiBcdHZhciBpbnN0YWxsZWRXYXNtTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb2JqZWN0IHdpdGggYWxsIGNvbXBpbGVkIFdlYkFzc21ibHkuTW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy53ID0ge307XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXgudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5jb25zdCBjb3JzID0gcmVxdWlyZShcImNvcnNcIik7XG5jb25zdCBFeHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5jb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbmNvbnN0IGlvID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTtcbmNvbnN0IGVudl8xID0gcmVxdWlyZShcIi4vY29uZmlnL2VudlwiKTtcbmNvbnN0IHNvY2tldF8xID0gcmVxdWlyZShcIi4vY29uZmlnL3NvY2tldFwiKTtcbmNvbnN0IGdhbWVzXzEgPSByZXF1aXJlKFwiLi9yb3V0ZXMvZ2FtZXMvZ2FtZXNcIik7XG5jbGFzcyBBcHAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlQXBwbGljYXRpb25EZWZhdWx0cyA9ICgpID0+IHtcbiAgICAgICAgICAgIG1vbmdvb3NlLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbiAgICAgICAgICAgIG1vbmdvb3NlLmNvbm5lY3QoZW52XzEuTU9OR09fVVJJKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gICAgICAgICAgICB0aGlzLmFwcC51c2UoY29ycygpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXR1cEFQSSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwLnVzZSgnL2FwaScsIGdhbWVzXzEuZ2FtZXNSb3V0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0dXBTb2NrZXQgPSAoKSA9PiB7XG4gICAgICAgICAgICBzb2NrZXRfMS5zb2NrZXQodGhpcy5pbyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlcnZlci5saXN0ZW4oZW52XzEuUE9SVCk7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgTGlzdGVuaW5nIG9uIHBvcnQgJHtlbnZfMS5QT1JUfSBpbiAke2Vudl8xLk5PREVfRU5WfSBtb2RlYCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYXBwID0gRXhwcmVzcygpO1xuICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBodHRwLlNlcnZlcih0aGlzLmFwcCk7XG4gICAgICAgIHRoaXMuaW8gPSBpbyh0aGlzLnNlcnZlcik7XG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGVBcHBsaWNhdGlvbkRlZmF1bHRzKCk7XG4gICAgICAgIHRoaXMuc2V0dXBBUEkoKTtcbiAgICAgICAgdGhpcy5zZXR1cFNvY2tldCgpO1xuICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgfVxufVxuZXhwb3J0cy5BcHAgPSBBcHA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgOTAwMDtcbmV4cG9ydHMuTk9ERV9FTlYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuZXhwb3J0cy5NT05HT19VUkkgPSBwcm9jZXNzLmVudi5NT05HT19VUkkgfHwgJ21vbmdvZGI6Ly9sb2NhbGhvc3QvdHJ2aWEnO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjcmVhdGVfZ2FtZV8xID0gcmVxdWlyZShcIi4uL2V2ZW50cy9jcmVhdGUtZ2FtZVwiKTtcbmNvbnN0IGRpc2Nvbm5lY3RfMSA9IHJlcXVpcmUoXCIuLi9ldmVudHMvZGlzY29ubmVjdFwiKTtcbmNvbnN0IGVuZF9vZl9nYW1lXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRzL2VuZC1vZi1nYW1lXCIpO1xuY29uc3QgZ2V0X2xpdmVfZ2FtZXNfMSA9IHJlcXVpcmUoXCIuLi9ldmVudHMvZ2V0LWxpdmUtZ2FtZXNcIik7XG5jb25zdCBnZXRfcGxheWVyc18xID0gcmVxdWlyZShcIi4uL2V2ZW50cy9nZXQtcGxheWVyc1wiKTtcbmNvbnN0IGdldF93aW5uZXJfMSA9IHJlcXVpcmUoXCIuLi9ldmVudHMvZ2V0LXdpbm5lclwiKTtcbmNvbnN0IGpvaW5fZ2FtZV8xID0gcmVxdWlyZShcIi4uL2V2ZW50cy9qb2luLWdhbWVcIik7XG5jb25zdCBsZWF2ZV9nYW1lXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRzL2xlYXZlLWdhbWVcIik7XG5jb25zdCByZXNldF9hbnN3ZXJfY291bnRfMSA9IHJlcXVpcmUoXCIuLi9ldmVudHMvcmVzZXQtYW5zd2VyLWNvdW50XCIpO1xuY29uc3Qgc3RhcnRfZ2FtZV8xID0gcmVxdWlyZShcIi4uL2V2ZW50cy9zdGFydC1nYW1lXCIpO1xuY29uc3Qgc3VibWl0X2Fuc3dlcl8xID0gcmVxdWlyZShcIi4uL2V2ZW50cy9zdWJtaXQtYW5zd2VyXCIpO1xuY29uc3Qgc29ja2V0ID0gKGlvKSA9PiB7XG4gICAgaW8ub24oJ2Nvbm5lY3Rpb24nLCAoc29ja2V0SW5zdGFuY2UpID0+IHtcbiAgICAgICAgc29ja2V0SW5zdGFuY2Uub24oJ2pvaW5HYW1lJywgam9pbl9nYW1lXzEuSm9pbkdhbWUuYmluZChudWxsLCBzb2NrZXRJbnN0YW5jZSwgaW8pKTtcbiAgICAgICAgc29ja2V0SW5zdGFuY2Uub24oJ2NyZWF0ZUdhbWUnLCBjcmVhdGVfZ2FtZV8xLkNyZWF0ZUdhbWUuYmluZChudWxsLCBzb2NrZXRJbnN0YW5jZSwgaW8pKTtcbiAgICAgICAgc29ja2V0SW5zdGFuY2Uub24oJ3N0YXJ0R2FtZScsIHN0YXJ0X2dhbWVfMS5TdGFydEdhbWUuYmluZChudWxsLCBpbykpO1xuICAgICAgICBzb2NrZXRJbnN0YW5jZS5vbignZ2V0TGl2ZUdhbWVzJywgZ2V0X2xpdmVfZ2FtZXNfMS5HZXRMaXZlR2FtZXMuYmluZChudWxsLCBzb2NrZXRJbnN0YW5jZSkpO1xuICAgICAgICBzb2NrZXRJbnN0YW5jZS5vbignZ2V0UGxheWVycycsIGdldF9wbGF5ZXJzXzEuR2V0UGxheWVycy5iaW5kKG51bGwsIHNvY2tldEluc3RhbmNlLCBpbykpO1xuICAgICAgICBzb2NrZXRJbnN0YW5jZS5vbignc3VibWl0QW5zd2VyJywgc3VibWl0X2Fuc3dlcl8xLlN1Ym1pdEFuc3dlci5iaW5kKG51bGwsIHNvY2tldEluc3RhbmNlLCBpbykpO1xuICAgICAgICBzb2NrZXRJbnN0YW5jZS5vbigncmVzZXRBbnN3ZXJDb3VudCcsIHJlc2V0X2Fuc3dlcl9jb3VudF8xLlJlc2V0QW5zd2VyQ291bnQpO1xuICAgICAgICBzb2NrZXRJbnN0YW5jZS5vbignZW5kT2ZHYW1lJywgZW5kX29mX2dhbWVfMS5FbmRPZkdhbWUuYmluZChudWxsLCBzb2NrZXRJbnN0YW5jZSwgaW8pKTtcbiAgICAgICAgc29ja2V0SW5zdGFuY2Uub24oJ2xlYXZlR2FtZScsIGxlYXZlX2dhbWVfMS5MZWF2ZUdhbWUuYmluZChudWxsLCBzb2NrZXRJbnN0YW5jZSwgaW8pKTtcbiAgICAgICAgc29ja2V0SW5zdGFuY2Uub24oJ2Rpc2Nvbm5lY3QnLCBkaXNjb25uZWN0XzEuRGlzY29ubmVjdC5iaW5kKG51bGwsIHNvY2tldEluc3RhbmNlLCBpbykpO1xuICAgICAgICBzb2NrZXRJbnN0YW5jZS5vbignZ2V0VGhlT3ZlcmFsbFdpbm5lcicsIGdldF93aW5uZXJfMS5HZXRXaW5uZXIuYmluZChudWxsLCBpbykpO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuc29ja2V0ID0gc29ja2V0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBsYXllcnMgPSB7fTtcbmV4cG9ydHMuc2NvcmVzID0gW107XG5leHBvcnRzLmdhbWVzID0ge307XG5leHBvcnRzLndpbm5pbmdTY29yZSA9IHt9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB3b3JsZF8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy93b3JsZFwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL3V0aWxzXCIpO1xuY29uc3QgQ3JlYXRlR2FtZSA9IChzb2NrZXQsIGlvLCBvcHRpb25zKSA9PiB7XG4gICAgdXRpbHNfMS5nZXRRdWVzdGlvbnMob3B0aW9ucykudGhlbigocXVlc3Rpb25zKSA9PiB7XG4gICAgICAgIHV0aWxzXzEuY3JlYXRlR2FtZShvcHRpb25zLmdhbWVOYW1lLCBxdWVzdGlvbnMpLnRoZW4oKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2dhbWVJZCcsIGdhbWVJZCk7XG4gICAgICAgICAgICBzb2NrZXQuam9pbihnYW1lSWQpO1xuICAgICAgICAgICAgd29ybGRfMS5nYW1lc1tnYW1lSWRdID0ge1xuICAgICAgICAgICAgICAgIGFuc3dlcnM6IDAsXG4gICAgICAgICAgICAgICAgZ2FtZUlkLFxuICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBvcHRpb25zLmdhbWVOYW1lLFxuICAgICAgICAgICAgICAgIGlzSW5QbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlOiBvcHRpb25zLnByaXZhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXSA9IHtcbiAgICAgICAgICAgICAgICBnYW1lSWQsXG4gICAgICAgICAgICAgICAgaXNIb3N0OiBvcHRpb25zLmlzSG9zdCxcbiAgICAgICAgICAgICAgICBuYW1lOiBvcHRpb25zLnBsYXllck5hbWUsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaW8uaW4oZ2FtZUlkKS5lbWl0KCdwbGF5ZXJKb2luZWQnLCBvcHRpb25zLnBsYXllck5hbWUpO1xuICAgICAgICAgICAgaW8uZW1pdCgndXBkYXRlTGl2ZUdhbWVzJywge1xuICAgICAgICAgICAgICAgIGxpc3Q6IHV0aWxzXzEuZ2V0TGl2ZUdhbWVzKHdvcmxkXzEuZ2FtZXMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5DcmVhdGVHYW1lID0gQ3JlYXRlR2FtZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgd29ybGRfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvd29ybGRcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy91dGlsc1wiKTtcbmNvbnN0IERpc2Nvbm5lY3QgPSAoc29ja2V0LCBpbykgPT4ge1xuICAgIGlmICh3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXSAmJiB3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXS5pc0hvc3QpIHtcbiAgICAgICAgaW8uaW4od29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uZ2FtZUlkKS5lbWl0KCdob3N0TGVmdCcpO1xuICAgICAgICB1dGlsc18xLmRlbGV0ZUdhbWUod29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uZ2FtZUlkKTtcbiAgICAgICAgZGVsZXRlIHdvcmxkXzEuZ2FtZXNbd29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uZ2FtZUlkXTtcbiAgICAgICAgaW8uZW1pdCgndXBkYXRlTGl2ZUdhbWVzJywge1xuICAgICAgICAgICAgbGlzdDogdXRpbHNfMS5nZXRMaXZlR2FtZXMod29ybGRfMS5nYW1lcylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdvcmxkXzEucGxheWVyc1tzb2NrZXQuaWRdICYmICF3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXS5pc0hvc3QpIHtcbiAgICAgICAgaW8uaW4od29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uZ2FtZUlkKS5lbWl0KCdwbGF5ZXJMZWZ0Jywgd29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0ucGxheWVyTmFtZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlbGV0ZSB3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXTtcbn07XG5leHBvcnRzLkRpc2Nvbm5lY3QgPSBEaXNjb25uZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB3b3JsZF8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy93b3JsZFwiKTtcbmNvbnN0IEVuZE9mR2FtZSA9IChzb2NrZXQsIGlvLCBvcHRpb25zKSA9PiB7XG4gICAgaWYgKHdvcmxkXzEucGxheWVyc1tzb2NrZXQuaWRdLmdhbWVJZCA9PT0gb3B0aW9ucy5nYW1lSWQpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoJ2dldFBsYXllcnNTY29yZScsIHtcbiAgICAgICAgICAgIHNjb3JlOiB3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXS5zY29yZVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0cy5FbmRPZkdhbWUgPSBFbmRPZkdhbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL3dvcmxkXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvdXRpbHNcIik7XG5jb25zdCBHZXRMaXZlR2FtZXMgPSAoc29ja2V0KSA9PiB7XG4gICAgc29ja2V0LmVtaXQoJ2xpc3RPZkxpdmVHYW1lcycsIHtcbiAgICAgICAgbGlzdDogdXRpbHNfMS5nZXRMaXZlR2FtZXMod29ybGRfMS5nYW1lcylcbiAgICB9KTtcbn07XG5leHBvcnRzLkdldExpdmVHYW1lcyA9IEdldExpdmVHYW1lcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgd29ybGRfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvd29ybGRcIik7XG5jb25zdCBHZXRQbGF5ZXJzID0gKHNvY2tldCwgaW8sIG9wdGlvbnMpID0+IHtcbiAgICBpZiAoIWlvLnNvY2tldHMuYWRhcHRlci5yb29tc1tvcHRpb25zLmdhbWVJZF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwbGF5ZXJzSW5Sb29tID0gaW8uc29ja2V0cy5hZGFwdGVyLnJvb21zW29wdGlvbnMuZ2FtZUlkXS5zb2NrZXRzO1xuICAgIGNvbnN0IHVwZGF0ZWRQbGF5ZXJzTGlzdCA9IFtdO1xuICAgIGNvbnN0IHBsYXllcnNJbkdhbWVDb3VudCA9IE9iamVjdC5rZXlzKHBsYXllcnNJblJvb20pLmxlbmd0aDtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwbGF5ZXJzSW5Sb29tKSB7XG4gICAgICAgIGlmICh3b3JsZF8xLnBsYXllcnNba2V5XSkge1xuICAgICAgICAgICAgdXBkYXRlZFBsYXllcnNMaXN0LnB1c2god29ybGRfMS5wbGF5ZXJzW2tleV0pO1xuICAgICAgICAgICAgaWYgKHBsYXllcnNJbkdhbWVDb3VudCA9PT0gdXBkYXRlZFBsYXllcnNMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd1cGRhdGVQbGF5ZXJzSW5HYW1lJywgdXBkYXRlZFBsYXllcnNMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnRzLkdldFBsYXllcnMgPSBHZXRQbGF5ZXJzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB3b3JsZF8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy93b3JsZFwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL3V0aWxzXCIpO1xuY29uc3QgR2V0V2lubmVyID0gKGlvLCBvcHRpb25zKSA9PiB7XG4gICAgd29ybGRfMS5zY29yZXNbb3B0aW9ucy5nYW1lSWRdID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgaW4gd29ybGRfMS5wbGF5ZXJzKSB7XG4gICAgICAgIGlmICh3b3JsZF8xLnBsYXllcnNba2V5XS5nYW1lSWQgPT09IG9wdGlvbnMuZ2FtZUlkKSB7XG4gICAgICAgICAgICB3b3JsZF8xLnNjb3Jlc1tvcHRpb25zLmdhbWVJZF0ucHVzaCh3b3JsZF8xLnBsYXllcnNba2V5XS5zY29yZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW8uaW4ob3B0aW9ucy5nYW1lSWQpLmVtaXQoJ3RoZVdpbm5lcicsIHtcbiAgICAgICAgbmFtZTogdXRpbHNfMS5maW5kV2lubmVyKHdvcmxkXzEuc2NvcmVzLCB3b3JsZF8xLnBsYXllcnMsIG9wdGlvbnMpXG4gICAgfSk7XG4gICAgZGVsZXRlIHdvcmxkXzEuc2NvcmVzW29wdGlvbnMuZ2FtZUlkXTtcbn07XG5leHBvcnRzLkdldFdpbm5lciA9IEdldFdpbm5lcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgd29ybGRfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvd29ybGRcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy91dGlsc1wiKTtcbmNvbnN0IEpvaW5HYW1lID0gKHNvY2tldCwgaW8sIG9wdGlvbnMpID0+IHtcbiAgICB1dGlsc18xLmRvZXNHYW1lRXhpc3Qob3B0aW9ucy5nYW1lSWQpLnRoZW4oKGV4aXN0cykgPT4ge1xuICAgICAgICBpZiAoZXhpc3RzKSB7XG4gICAgICAgICAgICBpZiAod29ybGRfMS5nYW1lc1tvcHRpb25zLmdhbWVJZF0uaXNJblBsYXkpIHtcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnZ2FtZUhhc1N0YXJ0ZWQnLCB7IG1lc3NhZ2U6ICdUaGF0IGdhbWUgaGFzIGFscmVhZHkgc3RhcnRlZCcgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc29ja2V0LmpvaW4ob3B0aW9ucy5nYW1lSWQpO1xuICAgICAgICAgICAgd29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0gPSB7XG4gICAgICAgICAgICAgICAgZ2FtZUlkOiBvcHRpb25zLmdhbWVJZCxcbiAgICAgICAgICAgICAgICBpc0hvc3Q6IG9wdGlvbnMuaXNIb3N0LFxuICAgICAgICAgICAgICAgIG5hbWU6IG9wdGlvbnMucGxheWVyTmFtZSxcbiAgICAgICAgICAgICAgICBzY29yZTogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHV0aWxzXzEuZ2V0UXVlc3Rpb25zRm9yR2FtZShvcHRpb25zLmdhbWVJZCkudGhlbihxdWVzdGlvbnMgPT4ge1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdqb2luZWRHYW1lJywgcXVlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICBpby5pbihvcHRpb25zLmdhbWVJZCkuZW1pdCgncGxheWVySm9pbmVkJywgb3B0aW9ucy5wbGF5ZXJOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2dhbWVEb2VzTm90RXhpc3QnLCB7IG1lc3NhZ2U6ICdUaGF0IGdhbWUgZG9lcyBub3QgZXhpc3QnIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuZXhwb3J0cy5Kb2luR2FtZSA9IEpvaW5HYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB3b3JsZF8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy8vd29ybGRcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy91dGlsc1wiKTtcbmNvbnN0IExlYXZlR2FtZSA9IChzb2NrZXQsIGlvLCBvcHRpb25zKSA9PiB7XG4gICAgaWYgKHdvcmxkXzEucGxheWVyc1tzb2NrZXQuaWRdICYmIHdvcmxkXzEucGxheWVyc1tzb2NrZXQuaWRdLmlzSG9zdCkge1xuICAgICAgICBpby5pbihvcHRpb25zLmdhbWVJZCkuZW1pdCgnaG9zdExlZnQnKTtcbiAgICAgICAgZGVsZXRlIHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdO1xuICAgICAgICB1dGlsc18xLmRlbGV0ZUdhbWUob3B0aW9ucy5nYW1lSWQpO1xuICAgICAgICBpby5lbWl0KCd1cGRhdGVMaXZlR2FtZXMnLCB7XG4gICAgICAgICAgICBsaXN0OiB1dGlsc18xLmdldExpdmVHYW1lcyh3b3JsZF8xLmdhbWVzKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW8uaW4ob3B0aW9ucy5nYW1lSWQpLmVtaXQoJ3BsYXllckxlZnQnLCBvcHRpb25zLnBsYXllck5hbWUpO1xuICAgIHNvY2tldC5sZWF2ZShvcHRpb25zLmdhbWVJZCk7XG59O1xuZXhwb3J0cy5MZWF2ZUdhbWUgPSBMZWF2ZUdhbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL3dvcmxkXCIpO1xuY29uc3QgUmVzZXRBbnN3ZXJDb3VudCA9IChvcHRpb25zKSA9PiB7XG4gICAgaWYgKHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdKSB7XG4gICAgICAgIHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdLmFuc3dlcnMgPSAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgd29ybGRfMS5nYW1lc1tvcHRpb25zLmdhbWVJZF0gPSB7XG4gICAgICAgICAgICBhbnN3ZXJzOiAwXG4gICAgICAgIH07XG4gICAgfVxufTtcbmV4cG9ydHMuUmVzZXRBbnN3ZXJDb3VudCA9IFJlc2V0QW5zd2VyQ291bnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL3dvcmxkXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvdXRpbHNcIik7XG5jb25zdCBTdGFydEdhbWUgPSAoaW8sIG9wdGlvbnMpID0+IHtcbiAgICB1dGlsc18xLmdldFF1ZXN0aW9uc0ZvckdhbWUob3B0aW9ucy5nYW1lSWQpLnRoZW4ocXVlc3Rpb25zID0+IHtcbiAgICAgICAgaW8uaW4ob3B0aW9ucy5nYW1lSWQpLmVtaXQoJ3N0YXJ0VGhlR2FtZScsIHF1ZXN0aW9ucyk7XG4gICAgICAgIHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdLmlzSW5QbGF5ID0gdHJ1ZTtcbiAgICAgICAgaW8uZW1pdCgndXBkYXRlTGl2ZUdhbWVzJywge1xuICAgICAgICAgICAgbGlzdDogdXRpbHNfMS5nZXRMaXZlR2FtZXMod29ybGRfMS5nYW1lcylcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5TdGFydEdhbWUgPSBTdGFydEdhbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL3dvcmxkXCIpO1xuY29uc3QgU3VibWl0QW5zd2VyID0gKHNvY2tldCwgaW8sIG9wdGlvbnMpID0+IHtcbiAgICBpZiAob3B0aW9ucy5pc0Fuc3dlckNvcnJlY3QpIHtcbiAgICAgICAgd29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uc2NvcmUgPSB3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXS5zY29yZSArIDEgKiAxMDA7XG4gICAgfVxuICAgIHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdLmFuc3dlcnMgPSB3b3JsZF8xLmdhbWVzW29wdGlvbnMuZ2FtZUlkXS5hbnN3ZXJzICsgMTtcbiAgICBpZiAod29ybGRfMS5nYW1lc1tvcHRpb25zLmdhbWVJZF0uYW5zd2VycyA9PT0gT2JqZWN0LmtleXMoaW8uc29ja2V0cy5hZGFwdGVyLnJvb21zW29wdGlvbnMuZ2FtZUlkXS5zb2NrZXRzKS5sZW5ndGgpIHtcbiAgICAgICAgaW8uaW4ob3B0aW9ucy5nYW1lSWQpLmVtaXQoJ2V2ZXJ5b25lQW5zd2VyZWQnKTtcbiAgICAgICAgd29ybGRfMS5nYW1lc1tvcHRpb25zLmdhbWVJZF0uYW5zd2VycyA9IDA7XG4gICAgfVxufTtcbmV4cG9ydHMuU3VibWl0QW5zd2VyID0gU3VibWl0QW5zd2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcHBfMSA9IHJlcXVpcmUoXCIuL2FwcFwiKTtcbm5ldyBhcHBfMS5BcHAoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVzdGZ1bCA9IHJlcXVpcmUoXCJub2RlLXJlc3RmdWxcIik7XG5jb25zdCBtb25nb29zZSA9IHJlc3RmdWwubW9uZ29vc2U7XG5jb25zdCBnYW1lU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gICAgZ2FtZUlkOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgcXVlc3Rpb25zOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB0eXBlOiBBcnJheVxuICAgIH1cbn0pO1xuY29uc3QgR2FtZXNNb2RlbCA9IHJlc3RmdWwubW9kZWwoJ0dhbWUnLCBnYW1lU2NoZW1hKTtcbmV4cG9ydHMuR2FtZXNNb2RlbCA9IEdhbWVzTW9kZWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbmNvbnN0IGdhbWVfbW9kZWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvZ2FtZS9nYW1lLm1vZGVsXCIpO1xuY29uc3QgZ2FtZXNSb3V0ZSA9IGV4cHJlc3MuUm91dGVyKCk7XG5leHBvcnRzLmdhbWVzUm91dGUgPSBnYW1lc1JvdXRlO1xuZ2FtZV9tb2RlbF8xLkdhbWVzTW9kZWwubWV0aG9kcyhbJ2dldCcsICdwb3N0JywgJ2RlbGV0ZSddKTtcbmdhbWVfbW9kZWxfMS5HYW1lc01vZGVsLnJlZ2lzdGVyKGdhbWVzUm91dGUsICcvZ2FtZXMnKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVxdWVzdCA9IHJlcXVpcmUoXCJyZXF1ZXN0XCIpO1xuY29uc3Qgc2hvcnRpZCA9IHJlcXVpcmUoXCJzaG9ydGlkXCIpO1xuY29uc3Qgd29ybGRfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvd29ybGRcIik7XG5jb25zdCBlbnZfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvZW52XCIpO1xuZXhwb3J0cy5nZXRCYXNlVXJpID0gKCkgPT4ge1xuICAgIHJldHVybiBlbnZfMS5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50J1xuICAgICAgICA/IGBodHRwOi8vbG9jYWxob3N0OiR7ZW52XzEuUE9SVH0vYXBpL2dhbWVzYFxuICAgICAgICA6ICdodHRwczovL3RydmlhLmhlcm9rdWFwcC5jb20vYXBpL2dhbWVzJztcbn07XG5leHBvcnRzLmZpbmRXaW5uZXIgPSAoc2NvcmVzLCBwbGF5ZXJzLCBvcHRpb25zKSA9PiB7XG4gICAgd29ybGRfMS53aW5uaW5nU2NvcmVbb3B0aW9ucy5nYW1lSWRdID0gTWF0aC5tYXgoLi4uc2NvcmVzW29wdGlvbnMuZ2FtZUlkXSk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcGxheWVycykge1xuICAgICAgICBpZiAocGxheWVyc1trZXldLmdhbWVJZCA9PT0gb3B0aW9ucy5nYW1lSWQpIHtcbiAgICAgICAgICAgIGlmIChwbGF5ZXJzW2tleV0uc2NvcmUgPT09IHdvcmxkXzEud2lubmluZ1Njb3JlW29wdGlvbnMuZ2FtZUlkXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJzW2tleV0ubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnRzLmRvZXNHYW1lRXhpc3QgPSAoZ2FtZUlkKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHJlcXVlc3QoZXhwb3J0cy5nZXRCYXNlVXJpKCksIChlcnJvciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdhbWVzID0gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgIHJlc29sdmUoZ2FtZXMuc29tZShnYW1lID0+IGdhbWUuZ2FtZUlkID09PSBnYW1lSWQpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRRdWVzdGlvbnNGb3JHYW1lID0gKGdhbWVJZCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVxdWVzdChleHBvcnRzLmdldEJhc2VVcmkoKSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ2FtZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgZ2FtZXMuZm9yRWFjaChnYW1lID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lSWQgPT09IGdhbWVJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGdhbWUucXVlc3Rpb25zWzBdLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldFF1ZXN0aW9ucyA9IChvcHRpb25zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdXJpID0gYGh0dHBzOi8vb3BlbnRkYi5jb20vYXBpLnBocD9hbW91bnQ9JHtvcHRpb25zLmFtb3VudH0mZGlmZmljdWx0eT0ke29wdGlvbnMuZGlmZmljdWx0eX1gO1xuICAgICAgICByZXF1ZXN0KHVyaSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYm9keSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuY3JlYXRlR2FtZSA9IChnYW1lTmFtZSwgcXVlc3Rpb25zKSA9PiB7XG4gICAgY29uc3QgZ2FtZUlkID0gc2hvcnRpZC5nZW5lcmF0ZSgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVxdWVzdC5wb3N0KHtcbiAgICAgICAgICAgIGpzb246IHtcbiAgICAgICAgICAgICAgICBnYW1lSWQsXG4gICAgICAgICAgICAgICAgbmFtZTogZ2FtZU5hbWUsXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zOiBKU09OLnBhcnNlKHF1ZXN0aW9ucylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cmw6IGV4cG9ydHMuZ2V0QmFzZVVyaSgpXG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKGdhbWVJZCk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRHYW1lID0gKGdhbWVJZCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVxdWVzdChleHBvcnRzLmdldEJhc2VVcmkoKSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkQm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgICAgICBwYXJzZWRCb2R5LmZpbmQoKGdhbWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nYW1lSWQgPT09IGdhbWVJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGdhbWUuX2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5kZWxldGVHYW1lID0gKGdhbWVJZCkgPT4ge1xuICAgIGV4cG9ydHMuZ2V0R2FtZShnYW1lSWQpLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZGVsZXRlKHtcbiAgICAgICAgICAgIHVybDogYCR7ZXhwb3J0cy5nZXRCYXNlVXJpKCl9LyR7aWR9YFxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldExpdmVHYW1lcyA9IChnYW1lcykgPT4ge1xuICAgIGNvbnN0IGdhbWVzQXNBcnJheSA9IFtdO1xuICAgIGZvciAoY29uc3Qga2V5IGluIGdhbWVzKSB7XG4gICAgICAgIGlmICghZ2FtZXNba2V5XS5wcml2YXRlICYmICFnYW1lc1trZXldLmlzSW5QbGF5KSB7XG4gICAgICAgICAgICBnYW1lc0FzQXJyYXkucHVzaChnYW1lc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ2FtZXNBc0FycmF5O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtcmVzdGZ1bFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZXF1ZXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNob3J0aWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=