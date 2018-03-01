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
const Express = __webpack_require__(/*! express */ "express");
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
const http = __webpack_require__(/*! http */ "http");
const io = __webpack_require__(/*! socket.io */ "socket.io");
const cors = __webpack_require__(/*! cors */ "cors");
const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
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
const join_game_1 = __webpack_require__(/*! ../events/join-game */ "./events/join-game.ts");
const create_game_1 = __webpack_require__(/*! ../events/create-game */ "./events/create-game.ts");
const start_game_1 = __webpack_require__(/*! ../events/start-game */ "./events/start-game.ts");
const get_live_games_1 = __webpack_require__(/*! ../events/get-live-games */ "./events/get-live-games.ts");
const get_players_1 = __webpack_require__(/*! ../events/get-players */ "./events/get-players.ts");
const submit_answer_1 = __webpack_require__(/*! ../events/submit-answer */ "./events/submit-answer.ts");
const reset_answer_count_1 = __webpack_require__(/*! ../events/reset-answer-count */ "./events/reset-answer-count.ts");
const end_of_game_1 = __webpack_require__(/*! ../events/end-of-game */ "./events/end-of-game.ts");
const leave_game_1 = __webpack_require__(/*! ../events/leave-game */ "./events/leave-game.ts");
const disconnect_1 = __webpack_require__(/*! ../events/disconnect */ "./events/disconnect.ts");
const get_winner_1 = __webpack_require__(/*! ../events/get-winner */ "./events/get-winner.ts");
const socket = io => {
    io.on('connection', socket => {
        socket.on('joinGame', join_game_1.JoinGame.bind(null, socket, io));
        socket.on('createGame', create_game_1.CreateGame.bind(null, socket, io));
        socket.on('startGame', start_game_1.StartGame.bind(null, io));
        socket.on('getLiveGames', get_live_games_1.GetLiveGames.bind(null, socket));
        socket.on('getPlayers', get_players_1.GetPlayers.bind(null, socket, io));
        socket.on('submitAnswer', submit_answer_1.SubmitAnswer.bind(null, socket, io));
        socket.on('resetAnswerCount', reset_answer_count_1.ResetAnswerCount);
        socket.on('endOfGame', end_of_game_1.EndOfGame.bind(null, socket, io));
        socket.on('leaveGame', leave_game_1.LeaveGame.bind(null, socket, io));
        socket.on('disconnect', disconnect_1.Disconnect.bind(null, socket, io));
        socket.on('getTheOverallWinner', get_winner_1.GetWinner.bind(null, io));
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
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const CreateGame = (socket, io, options) => {
    utils_1.getQuestions(options).then((questions) => {
        utils_1.createGame(options.gameName, questions).then((gameId) => {
            socket.emit('gameId', gameId);
            socket.join(gameId);
            world_1.games[gameId] = {
                gameId: gameId,
                gameName: options.gameName,
                answers: 0,
                isInPlay: false,
                private: options.private
            };
            world_1.players[socket.id] = {
                gameId: gameId,
                name: options.playerName,
                isHost: options.isHost,
                score: 0
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
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
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
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
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
    for (let key in playersInRoom) {
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
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const GetWinner = (io, options) => {
    world_1.scores[options.gameId] = [];
    for (let key in world_1.players) {
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
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
const JoinGame = (socket, io, options) => {
    utils_1.doesGameExist(options.gameId).then(exists => {
        if (exists) {
            if (world_1.games[options.gameId].isInPlay) {
                socket.emit('gameHasStarted', { message: 'That game has already started' });
                return;
            }
            socket.join(options.gameId);
            world_1.players[socket.id] = {
                gameId: options.gameId,
                name: options.playerName,
                isHost: options.isHost,
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
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const world_1 = __webpack_require__(/*! ../config//world */ "./config/world.ts");
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
const utils_1 = __webpack_require__(/*! ../utilities/utils */ "./utilities/utils.ts");
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
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
    name: {
        type: String,
        required: true
    },
    gameId: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        required: true
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
const request_1 = __webpack_require__(/*! request */ "request");
const shortid_1 = __webpack_require__(/*! shortid */ "shortid");
const env_1 = __webpack_require__(/*! ../config/env */ "./config/env.ts");
const world_1 = __webpack_require__(/*! ../config/world */ "./config/world.ts");
exports.getBaseUri = () => {
    return env_1.NODE_ENV === 'development'
        ? `http://localhost:${env_1.PORT}/api/games`
        : 'https://trvia.herokuapp.com/api/games';
};
exports.findWinner = (scores, players, options) => {
    world_1.winningScore[options.gameId] = Math.max(...scores[options.gameId]);
    for (let key in players) {
        if (players[key].gameId === options.gameId) {
            if (players[key].score === world_1.winningScore[options.gameId]) {
                return players[key].name;
            }
        }
    }
};
exports.doesGameExist = gameId => {
    return new Promise((resolve) => {
        request_1.default(exports.getBaseUri(), (error, response) => {
            const games = JSON.parse(response.body);
            resolve(games.some(game => game.gameId === gameId));
        });
    });
};
exports.getQuestionsForGame = gameId => {
    return new Promise((resolve) => {
        request_1.default(exports.getBaseUri(), (error, response) => {
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
        request_1.default(`https://opentdb.com/api.php?amount=${options.amount}&difficulty=${options.difficulty}`, (error, response, body) => {
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
    const gameId = shortid_1.default.generate();
    return new Promise(resolve => {
        request_1.default.post({
            url: exports.getBaseUri(),
            json: {
                name: gameName,
                gameId: gameId,
                questions: JSON.parse(questions)
            }
        });
        resolve(gameId);
    });
};
exports.getGame = gameId => {
    return new Promise((resolve) => {
        request_1.default(exports.getBaseUri(), (error, response, body) => {
            const parsedBody = JSON.parse(body);
            parsedBody.find(game => {
                if (game.gameId === gameId) {
                    resolve(game._id);
                }
            });
        });
    });
};
exports.deleteGame = gameId => {
    exports.getGame(gameId).then((id) => {
        request_1.default.delete({
            url: `${exports.getBaseUri()}/${id}`
        });
    });
};
exports.getLiveGames = games => {
    const gamesAsArray = [];
    for (let key in games) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL2NvbmZpZy9lbnYudHMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL3NvY2tldC50cyIsIndlYnBhY2s6Ly8vLi9jb25maWcvd29ybGQudHMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzL2NyZWF0ZS1nYW1lLnRzIiwid2VicGFjazovLy8uL2V2ZW50cy9kaXNjb25uZWN0LnRzIiwid2VicGFjazovLy8uL2V2ZW50cy9lbmQtb2YtZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9ldmVudHMvZ2V0LWxpdmUtZ2FtZXMudHMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzL2dldC1wbGF5ZXJzLnRzIiwid2VicGFjazovLy8uL2V2ZW50cy9nZXQtd2lubmVyLnRzIiwid2VicGFjazovLy8uL2V2ZW50cy9qb2luLWdhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzL2xlYXZlLWdhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzL3Jlc2V0LWFuc3dlci1jb3VudC50cyIsIndlYnBhY2s6Ly8vLi9ldmVudHMvc3RhcnQtZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9ldmVudHMvc3VibWl0LWFuc3dlci50cyIsIndlYnBhY2s6Ly8vLi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvZ2FtZS9nYW1lLm1vZGVsLnRzIiwid2VicGFjazovLy8uL3JvdXRlcy9nYW1lcy9nYW1lcy50cyIsIndlYnBhY2s6Ly8vLi91dGlsaXRpZXMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtcmVzdGZ1bFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlcXVlc3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzaG9ydGlkXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic29ja2V0LmlvXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekVBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsV0FBVyxNQUFNLGVBQWU7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQywyQ0FBMkM7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSw2Q0FBNkMsc0NBQXNDO0FBQ25GO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixXQUFXO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxlQUFlLGNBQWMsbUJBQW1CO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUIsR0FBRyxHQUFHO0FBQy9DLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlGQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIHdhc20gbW9kdWxlc1xuIFx0dmFyIGluc3RhbGxlZFdhc21Nb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvYmplY3Qgd2l0aCBhbGwgY29tcGlsZWQgV2ViQXNzbWJseS5Nb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLncgPSB7fTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbmNvbnN0IGlvID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTtcbmNvbnN0IGNvcnMgPSByZXF1aXJlKFwiY29yc1wiKTtcbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuY29uc3QgZW52XzEgPSByZXF1aXJlKFwiLi9jb25maWcvZW52XCIpO1xuY29uc3Qgc29ja2V0XzEgPSByZXF1aXJlKFwiLi9jb25maWcvc29ja2V0XCIpO1xuY29uc3QgZ2FtZXNfMSA9IHJlcXVpcmUoXCIuL3JvdXRlcy9nYW1lcy9nYW1lc1wiKTtcbmNsYXNzIEFwcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGVBcHBsaWNhdGlvbkRlZmF1bHRzID0gKCkgPT4ge1xuICAgICAgICAgICAgbW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuICAgICAgICAgICAgbW9uZ29vc2UuY29ubmVjdChlbnZfMS5NT05HT19VUkkpO1xuICAgICAgICAgICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnVzZShjb3JzKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldHVwQVBJID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHAudXNlKCcvYXBpJywgZ2FtZXNfMS5nYW1lc1JvdXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXR1cFNvY2tldCA9ICgpID0+IHtcbiAgICAgICAgICAgIHNvY2tldF8xLnNvY2tldCh0aGlzLmlvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLmxpc3RlbihlbnZfMS5QT1JUKTtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGBMaXN0ZW5pbmcgb24gcG9ydCAke2Vudl8xLlBPUlR9IGluICR7ZW52XzEuTk9ERV9FTlZ9IG1vZGVgKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hcHAgPSBFeHByZXNzKCk7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IGh0dHAuU2VydmVyKHRoaXMuYXBwKTtcbiAgICAgICAgdGhpcy5pbyA9IGlvKHRoaXMuc2VydmVyKTtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZUFwcGxpY2F0aW9uRGVmYXVsdHMoKTtcbiAgICAgICAgdGhpcy5zZXR1cEFQSSgpO1xuICAgICAgICB0aGlzLnNldHVwU29ja2V0KCk7XG4gICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICB9XG59XG5leHBvcnRzLkFwcCA9IEFwcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5QT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA5MDAwO1xuZXhwb3J0cy5OT0RFX0VOViA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5leHBvcnRzLk1PTkdPX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPX1VSSSB8fCAnbW9uZ29kYjovL2xvY2FsaG9zdC90cnZpYSc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGpvaW5fZ2FtZV8xID0gcmVxdWlyZShcIi4uL2V2ZW50cy9qb2luLWdhbWVcIik7XG5jb25zdCBjcmVhdGVfZ2FtZV8xID0gcmVxdWlyZShcIi4uL2V2ZW50cy9jcmVhdGUtZ2FtZVwiKTtcbmNvbnN0IHN0YXJ0X2dhbWVfMSA9IHJlcXVpcmUoXCIuLi9ldmVudHMvc3RhcnQtZ2FtZVwiKTtcbmNvbnN0IGdldF9saXZlX2dhbWVzXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRzL2dldC1saXZlLWdhbWVzXCIpO1xuY29uc3QgZ2V0X3BsYXllcnNfMSA9IHJlcXVpcmUoXCIuLi9ldmVudHMvZ2V0LXBsYXllcnNcIik7XG5jb25zdCBzdWJtaXRfYW5zd2VyXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRzL3N1Ym1pdC1hbnN3ZXJcIik7XG5jb25zdCByZXNldF9hbnN3ZXJfY291bnRfMSA9IHJlcXVpcmUoXCIuLi9ldmVudHMvcmVzZXQtYW5zd2VyLWNvdW50XCIpO1xuY29uc3QgZW5kX29mX2dhbWVfMSA9IHJlcXVpcmUoXCIuLi9ldmVudHMvZW5kLW9mLWdhbWVcIik7XG5jb25zdCBsZWF2ZV9nYW1lXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRzL2xlYXZlLWdhbWVcIik7XG5jb25zdCBkaXNjb25uZWN0XzEgPSByZXF1aXJlKFwiLi4vZXZlbnRzL2Rpc2Nvbm5lY3RcIik7XG5jb25zdCBnZXRfd2lubmVyXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRzL2dldC13aW5uZXJcIik7XG5jb25zdCBzb2NrZXQgPSBpbyA9PiB7XG4gICAgaW8ub24oJ2Nvbm5lY3Rpb24nLCBzb2NrZXQgPT4ge1xuICAgICAgICBzb2NrZXQub24oJ2pvaW5HYW1lJywgam9pbl9nYW1lXzEuSm9pbkdhbWUuYmluZChudWxsLCBzb2NrZXQsIGlvKSk7XG4gICAgICAgIHNvY2tldC5vbignY3JlYXRlR2FtZScsIGNyZWF0ZV9nYW1lXzEuQ3JlYXRlR2FtZS5iaW5kKG51bGwsIHNvY2tldCwgaW8pKTtcbiAgICAgICAgc29ja2V0Lm9uKCdzdGFydEdhbWUnLCBzdGFydF9nYW1lXzEuU3RhcnRHYW1lLmJpbmQobnVsbCwgaW8pKTtcbiAgICAgICAgc29ja2V0Lm9uKCdnZXRMaXZlR2FtZXMnLCBnZXRfbGl2ZV9nYW1lc18xLkdldExpdmVHYW1lcy5iaW5kKG51bGwsIHNvY2tldCkpO1xuICAgICAgICBzb2NrZXQub24oJ2dldFBsYXllcnMnLCBnZXRfcGxheWVyc18xLkdldFBsYXllcnMuYmluZChudWxsLCBzb2NrZXQsIGlvKSk7XG4gICAgICAgIHNvY2tldC5vbignc3VibWl0QW5zd2VyJywgc3VibWl0X2Fuc3dlcl8xLlN1Ym1pdEFuc3dlci5iaW5kKG51bGwsIHNvY2tldCwgaW8pKTtcbiAgICAgICAgc29ja2V0Lm9uKCdyZXNldEFuc3dlckNvdW50JywgcmVzZXRfYW5zd2VyX2NvdW50XzEuUmVzZXRBbnN3ZXJDb3VudCk7XG4gICAgICAgIHNvY2tldC5vbignZW5kT2ZHYW1lJywgZW5kX29mX2dhbWVfMS5FbmRPZkdhbWUuYmluZChudWxsLCBzb2NrZXQsIGlvKSk7XG4gICAgICAgIHNvY2tldC5vbignbGVhdmVHYW1lJywgbGVhdmVfZ2FtZV8xLkxlYXZlR2FtZS5iaW5kKG51bGwsIHNvY2tldCwgaW8pKTtcbiAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZGlzY29ubmVjdF8xLkRpc2Nvbm5lY3QuYmluZChudWxsLCBzb2NrZXQsIGlvKSk7XG4gICAgICAgIHNvY2tldC5vbignZ2V0VGhlT3ZlcmFsbFdpbm5lcicsIGdldF93aW5uZXJfMS5HZXRXaW5uZXIuYmluZChudWxsLCBpbykpO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuc29ja2V0ID0gc29ja2V0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBsYXllcnMgPSB7fTtcbmV4cG9ydHMuc2NvcmVzID0gW107XG5leHBvcnRzLmdhbWVzID0ge307XG5leHBvcnRzLndpbm5pbmdTY29yZSA9IHt9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy91dGlsc1wiKTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL3dvcmxkXCIpO1xuY29uc3QgQ3JlYXRlR2FtZSA9IChzb2NrZXQsIGlvLCBvcHRpb25zKSA9PiB7XG4gICAgdXRpbHNfMS5nZXRRdWVzdGlvbnMob3B0aW9ucykudGhlbigocXVlc3Rpb25zKSA9PiB7XG4gICAgICAgIHV0aWxzXzEuY3JlYXRlR2FtZShvcHRpb25zLmdhbWVOYW1lLCBxdWVzdGlvbnMpLnRoZW4oKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2dhbWVJZCcsIGdhbWVJZCk7XG4gICAgICAgICAgICBzb2NrZXQuam9pbihnYW1lSWQpO1xuICAgICAgICAgICAgd29ybGRfMS5nYW1lc1tnYW1lSWRdID0ge1xuICAgICAgICAgICAgICAgIGdhbWVJZDogZ2FtZUlkLFxuICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBvcHRpb25zLmdhbWVOYW1lLFxuICAgICAgICAgICAgICAgIGFuc3dlcnM6IDAsXG4gICAgICAgICAgICAgICAgaXNJblBsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGU6IG9wdGlvbnMucHJpdmF0ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdvcmxkXzEucGxheWVyc1tzb2NrZXQuaWRdID0ge1xuICAgICAgICAgICAgICAgIGdhbWVJZDogZ2FtZUlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IG9wdGlvbnMucGxheWVyTmFtZSxcbiAgICAgICAgICAgICAgICBpc0hvc3Q6IG9wdGlvbnMuaXNIb3N0LFxuICAgICAgICAgICAgICAgIHNjb3JlOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaW8uaW4oZ2FtZUlkKS5lbWl0KCdwbGF5ZXJKb2luZWQnLCBvcHRpb25zLnBsYXllck5hbWUpO1xuICAgICAgICAgICAgaW8uZW1pdCgndXBkYXRlTGl2ZUdhbWVzJywge1xuICAgICAgICAgICAgICAgIGxpc3Q6IHV0aWxzXzEuZ2V0TGl2ZUdhbWVzKHdvcmxkXzEuZ2FtZXMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5DcmVhdGVHYW1lID0gQ3JlYXRlR2FtZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvdXRpbHNcIik7XG5jb25zdCB3b3JsZF8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy93b3JsZFwiKTtcbmNvbnN0IERpc2Nvbm5lY3QgPSAoc29ja2V0LCBpbykgPT4ge1xuICAgIGlmICh3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXSAmJiB3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXS5pc0hvc3QpIHtcbiAgICAgICAgaW8uaW4od29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uZ2FtZUlkKS5lbWl0KCdob3N0TGVmdCcpO1xuICAgICAgICB1dGlsc18xLmRlbGV0ZUdhbWUod29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uZ2FtZUlkKTtcbiAgICAgICAgZGVsZXRlIHdvcmxkXzEuZ2FtZXNbd29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uZ2FtZUlkXTtcbiAgICAgICAgaW8uZW1pdCgndXBkYXRlTGl2ZUdhbWVzJywge1xuICAgICAgICAgICAgbGlzdDogdXRpbHNfMS5nZXRMaXZlR2FtZXMod29ybGRfMS5nYW1lcylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdvcmxkXzEucGxheWVyc1tzb2NrZXQuaWRdICYmICF3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXS5pc0hvc3QpIHtcbiAgICAgICAgaW8uaW4od29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uZ2FtZUlkKS5lbWl0KCdwbGF5ZXJMZWZ0Jywgd29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0ucGxheWVyTmFtZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlbGV0ZSB3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXTtcbn07XG5leHBvcnRzLkRpc2Nvbm5lY3QgPSBEaXNjb25uZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB3b3JsZF8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy93b3JsZFwiKTtcbmNvbnN0IEVuZE9mR2FtZSA9IChzb2NrZXQsIGlvLCBvcHRpb25zKSA9PiB7XG4gICAgaWYgKHdvcmxkXzEucGxheWVyc1tzb2NrZXQuaWRdLmdhbWVJZCA9PT0gb3B0aW9ucy5nYW1lSWQpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoJ2dldFBsYXllcnNTY29yZScsIHtcbiAgICAgICAgICAgIHNjb3JlOiB3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXS5zY29yZVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0cy5FbmRPZkdhbWUgPSBFbmRPZkdhbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL3V0aWxzXCIpO1xuY29uc3Qgd29ybGRfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvd29ybGRcIik7XG5jb25zdCBHZXRMaXZlR2FtZXMgPSAoc29ja2V0KSA9PiB7XG4gICAgc29ja2V0LmVtaXQoJ2xpc3RPZkxpdmVHYW1lcycsIHtcbiAgICAgICAgbGlzdDogdXRpbHNfMS5nZXRMaXZlR2FtZXMod29ybGRfMS5nYW1lcylcbiAgICB9KTtcbn07XG5leHBvcnRzLkdldExpdmVHYW1lcyA9IEdldExpdmVHYW1lcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgd29ybGRfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvd29ybGRcIik7XG5jb25zdCBHZXRQbGF5ZXJzID0gKHNvY2tldCwgaW8sIG9wdGlvbnMpID0+IHtcbiAgICBpZiAoIWlvLnNvY2tldHMuYWRhcHRlci5yb29tc1tvcHRpb25zLmdhbWVJZF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwbGF5ZXJzSW5Sb29tID0gaW8uc29ja2V0cy5hZGFwdGVyLnJvb21zW29wdGlvbnMuZ2FtZUlkXS5zb2NrZXRzO1xuICAgIGNvbnN0IHVwZGF0ZWRQbGF5ZXJzTGlzdCA9IFtdO1xuICAgIGNvbnN0IHBsYXllcnNJbkdhbWVDb3VudCA9IE9iamVjdC5rZXlzKHBsYXllcnNJblJvb20pLmxlbmd0aDtcbiAgICBmb3IgKGxldCBrZXkgaW4gcGxheWVyc0luUm9vbSkge1xuICAgICAgICBpZiAod29ybGRfMS5wbGF5ZXJzW2tleV0pIHtcbiAgICAgICAgICAgIHVwZGF0ZWRQbGF5ZXJzTGlzdC5wdXNoKHdvcmxkXzEucGxheWVyc1trZXldKTtcbiAgICAgICAgICAgIGlmIChwbGF5ZXJzSW5HYW1lQ291bnQgPT09IHVwZGF0ZWRQbGF5ZXJzTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgndXBkYXRlUGxheWVyc0luR2FtZScsIHVwZGF0ZWRQbGF5ZXJzTGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0cy5HZXRQbGF5ZXJzID0gR2V0UGxheWVycztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvdXRpbHNcIik7XG5jb25zdCB3b3JsZF8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy93b3JsZFwiKTtcbmNvbnN0IEdldFdpbm5lciA9IChpbywgb3B0aW9ucykgPT4ge1xuICAgIHdvcmxkXzEuc2NvcmVzW29wdGlvbnMuZ2FtZUlkXSA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiB3b3JsZF8xLnBsYXllcnMpIHtcbiAgICAgICAgaWYgKHdvcmxkXzEucGxheWVyc1trZXldLmdhbWVJZCA9PT0gb3B0aW9ucy5nYW1lSWQpIHtcbiAgICAgICAgICAgIHdvcmxkXzEuc2NvcmVzW29wdGlvbnMuZ2FtZUlkXS5wdXNoKHdvcmxkXzEucGxheWVyc1trZXldLnNjb3JlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpby5pbihvcHRpb25zLmdhbWVJZCkuZW1pdCgndGhlV2lubmVyJywge1xuICAgICAgICBuYW1lOiB1dGlsc18xLmZpbmRXaW5uZXIod29ybGRfMS5zY29yZXMsIHdvcmxkXzEucGxheWVycywgb3B0aW9ucylcbiAgICB9KTtcbiAgICBkZWxldGUgd29ybGRfMS5zY29yZXNbb3B0aW9ucy5nYW1lSWRdO1xufTtcbmV4cG9ydHMuR2V0V2lubmVyID0gR2V0V2lubmVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy91dGlsc1wiKTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL3dvcmxkXCIpO1xuY29uc3QgSm9pbkdhbWUgPSAoc29ja2V0LCBpbywgb3B0aW9ucykgPT4ge1xuICAgIHV0aWxzXzEuZG9lc0dhbWVFeGlzdChvcHRpb25zLmdhbWVJZCkudGhlbihleGlzdHMgPT4ge1xuICAgICAgICBpZiAoZXhpc3RzKSB7XG4gICAgICAgICAgICBpZiAod29ybGRfMS5nYW1lc1tvcHRpb25zLmdhbWVJZF0uaXNJblBsYXkpIHtcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnZ2FtZUhhc1N0YXJ0ZWQnLCB7IG1lc3NhZ2U6ICdUaGF0IGdhbWUgaGFzIGFscmVhZHkgc3RhcnRlZCcgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc29ja2V0LmpvaW4ob3B0aW9ucy5nYW1lSWQpO1xuICAgICAgICAgICAgd29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0gPSB7XG4gICAgICAgICAgICAgICAgZ2FtZUlkOiBvcHRpb25zLmdhbWVJZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBvcHRpb25zLnBsYXllck5hbWUsXG4gICAgICAgICAgICAgICAgaXNIb3N0OiBvcHRpb25zLmlzSG9zdCxcbiAgICAgICAgICAgICAgICBzY29yZTogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHV0aWxzXzEuZ2V0UXVlc3Rpb25zRm9yR2FtZShvcHRpb25zLmdhbWVJZCkudGhlbihxdWVzdGlvbnMgPT4ge1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdqb2luZWRHYW1lJywgcXVlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICBpby5pbihvcHRpb25zLmdhbWVJZCkuZW1pdCgncGxheWVySm9pbmVkJywgb3B0aW9ucy5wbGF5ZXJOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2dhbWVEb2VzTm90RXhpc3QnLCB7IG1lc3NhZ2U6ICdUaGF0IGdhbWUgZG9lcyBub3QgZXhpc3QnIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuZXhwb3J0cy5Kb2luR2FtZSA9IEpvaW5HYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy91dGlsc1wiKTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnLy93b3JsZFwiKTtcbmNvbnN0IExlYXZlR2FtZSA9IChzb2NrZXQsIGlvLCBvcHRpb25zKSA9PiB7XG4gICAgaWYgKHdvcmxkXzEucGxheWVyc1tzb2NrZXQuaWRdICYmIHdvcmxkXzEucGxheWVyc1tzb2NrZXQuaWRdLmlzSG9zdCkge1xuICAgICAgICBpby5pbihvcHRpb25zLmdhbWVJZCkuZW1pdCgnaG9zdExlZnQnKTtcbiAgICAgICAgZGVsZXRlIHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdO1xuICAgICAgICB1dGlsc18xLmRlbGV0ZUdhbWUob3B0aW9ucy5nYW1lSWQpO1xuICAgICAgICBpby5lbWl0KCd1cGRhdGVMaXZlR2FtZXMnLCB7XG4gICAgICAgICAgICBsaXN0OiB1dGlsc18xLmdldExpdmVHYW1lcyh3b3JsZF8xLmdhbWVzKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW8uaW4ob3B0aW9ucy5nYW1lSWQpLmVtaXQoJ3BsYXllckxlZnQnLCBvcHRpb25zLnBsYXllck5hbWUpO1xuICAgIHNvY2tldC5sZWF2ZShvcHRpb25zLmdhbWVJZCk7XG59O1xuZXhwb3J0cy5MZWF2ZUdhbWUgPSBMZWF2ZUdhbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL3dvcmxkXCIpO1xuY29uc3QgUmVzZXRBbnN3ZXJDb3VudCA9IChvcHRpb25zKSA9PiB7XG4gICAgaWYgKHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdKSB7XG4gICAgICAgIHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdLmFuc3dlcnMgPSAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgd29ybGRfMS5nYW1lc1tvcHRpb25zLmdhbWVJZF0gPSB7XG4gICAgICAgICAgICBhbnN3ZXJzOiAwXG4gICAgICAgIH07XG4gICAgfVxufTtcbmV4cG9ydHMuUmVzZXRBbnN3ZXJDb3VudCA9IFJlc2V0QW5zd2VyQ291bnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL3V0aWxzXCIpO1xuY29uc3Qgd29ybGRfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvd29ybGRcIik7XG5jb25zdCBTdGFydEdhbWUgPSAoaW8sIG9wdGlvbnMpID0+IHtcbiAgICB1dGlsc18xLmdldFF1ZXN0aW9uc0ZvckdhbWUob3B0aW9ucy5nYW1lSWQpLnRoZW4ocXVlc3Rpb25zID0+IHtcbiAgICAgICAgaW8uaW4ob3B0aW9ucy5nYW1lSWQpLmVtaXQoJ3N0YXJ0VGhlR2FtZScsIHF1ZXN0aW9ucyk7XG4gICAgICAgIHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdLmlzSW5QbGF5ID0gdHJ1ZTtcbiAgICAgICAgaW8uZW1pdCgndXBkYXRlTGl2ZUdhbWVzJywge1xuICAgICAgICAgICAgbGlzdDogdXRpbHNfMS5nZXRMaXZlR2FtZXMod29ybGRfMS5nYW1lcylcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5TdGFydEdhbWUgPSBTdGFydEdhbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL3dvcmxkXCIpO1xuY29uc3QgU3VibWl0QW5zd2VyID0gKHNvY2tldCwgaW8sIG9wdGlvbnMpID0+IHtcbiAgICBpZiAob3B0aW9ucy5pc0Fuc3dlckNvcnJlY3QpIHtcbiAgICAgICAgd29ybGRfMS5wbGF5ZXJzW3NvY2tldC5pZF0uc2NvcmUgPSB3b3JsZF8xLnBsYXllcnNbc29ja2V0LmlkXS5zY29yZSArIDEgKiAxMDA7XG4gICAgfVxuICAgIHdvcmxkXzEuZ2FtZXNbb3B0aW9ucy5nYW1lSWRdLmFuc3dlcnMgPSB3b3JsZF8xLmdhbWVzW29wdGlvbnMuZ2FtZUlkXS5hbnN3ZXJzICsgMTtcbiAgICBpZiAod29ybGRfMS5nYW1lc1tvcHRpb25zLmdhbWVJZF0uYW5zd2VycyA9PT0gT2JqZWN0LmtleXMoaW8uc29ja2V0cy5hZGFwdGVyLnJvb21zW29wdGlvbnMuZ2FtZUlkXS5zb2NrZXRzKS5sZW5ndGgpIHtcbiAgICAgICAgaW8uaW4ob3B0aW9ucy5nYW1lSWQpLmVtaXQoJ2V2ZXJ5b25lQW5zd2VyZWQnKTtcbiAgICAgICAgd29ybGRfMS5nYW1lc1tvcHRpb25zLmdhbWVJZF0uYW5zd2VycyA9IDA7XG4gICAgfVxufTtcbmV4cG9ydHMuU3VibWl0QW5zd2VyID0gU3VibWl0QW5zd2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcHBfMSA9IHJlcXVpcmUoXCIuL2FwcFwiKTtcbm5ldyBhcHBfMS5BcHAoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVzdGZ1bCA9IHJlcXVpcmUoXCJub2RlLXJlc3RmdWxcIik7XG5jb25zdCBtb25nb29zZSA9IHJlc3RmdWwubW9uZ29vc2U7XG5jb25zdCBnYW1lU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gICAgbmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBnYW1lSWQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcXVlc3Rpb25zOiB7XG4gICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH1cbn0pO1xuY29uc3QgR2FtZXNNb2RlbCA9IHJlc3RmdWwubW9kZWwoJ0dhbWUnLCBnYW1lU2NoZW1hKTtcbmV4cG9ydHMuR2FtZXNNb2RlbCA9IEdhbWVzTW9kZWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbmNvbnN0IGdhbWVfbW9kZWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvZ2FtZS9nYW1lLm1vZGVsXCIpO1xuY29uc3QgZ2FtZXNSb3V0ZSA9IGV4cHJlc3MuUm91dGVyKCk7XG5leHBvcnRzLmdhbWVzUm91dGUgPSBnYW1lc1JvdXRlO1xuZ2FtZV9tb2RlbF8xLkdhbWVzTW9kZWwubWV0aG9kcyhbJ2dldCcsICdwb3N0JywgJ2RlbGV0ZSddKTtcbmdhbWVfbW9kZWxfMS5HYW1lc01vZGVsLnJlZ2lzdGVyKGdhbWVzUm91dGUsICcvZ2FtZXMnKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVxdWVzdF8xID0gcmVxdWlyZShcInJlcXVlc3RcIik7XG5jb25zdCBzaG9ydGlkXzEgPSByZXF1aXJlKFwic2hvcnRpZFwiKTtcbmNvbnN0IGVudl8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy9lbnZcIik7XG5jb25zdCB3b3JsZF8xID0gcmVxdWlyZShcIi4uL2NvbmZpZy93b3JsZFwiKTtcbmV4cG9ydHMuZ2V0QmFzZVVyaSA9ICgpID0+IHtcbiAgICByZXR1cm4gZW52XzEuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCdcbiAgICAgICAgPyBgaHR0cDovL2xvY2FsaG9zdDoke2Vudl8xLlBPUlR9L2FwaS9nYW1lc2BcbiAgICAgICAgOiAnaHR0cHM6Ly90cnZpYS5oZXJva3VhcHAuY29tL2FwaS9nYW1lcyc7XG59O1xuZXhwb3J0cy5maW5kV2lubmVyID0gKHNjb3JlcywgcGxheWVycywgb3B0aW9ucykgPT4ge1xuICAgIHdvcmxkXzEud2lubmluZ1Njb3JlW29wdGlvbnMuZ2FtZUlkXSA9IE1hdGgubWF4KC4uLnNjb3Jlc1tvcHRpb25zLmdhbWVJZF0pO1xuICAgIGZvciAobGV0IGtleSBpbiBwbGF5ZXJzKSB7XG4gICAgICAgIGlmIChwbGF5ZXJzW2tleV0uZ2FtZUlkID09PSBvcHRpb25zLmdhbWVJZCkge1xuICAgICAgICAgICAgaWYgKHBsYXllcnNba2V5XS5zY29yZSA9PT0gd29ybGRfMS53aW5uaW5nU2NvcmVbb3B0aW9ucy5nYW1lSWRdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllcnNba2V5XS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydHMuZG9lc0dhbWVFeGlzdCA9IGdhbWVJZCA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHJlcXVlc3RfMS5kZWZhdWx0KGV4cG9ydHMuZ2V0QmFzZVVyaSgpLCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBnYW1lcyA9IEpTT04ucGFyc2UocmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICByZXNvbHZlKGdhbWVzLnNvbWUoZ2FtZSA9PiBnYW1lLmdhbWVJZCA9PT0gZ2FtZUlkKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0UXVlc3Rpb25zRm9yR2FtZSA9IGdhbWVJZCA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHJlcXVlc3RfMS5kZWZhdWx0KGV4cG9ydHMuZ2V0QmFzZVVyaSgpLCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBnYW1lcyA9IEpTT04ucGFyc2UocmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICBnYW1lcy5mb3JFYWNoKGdhbWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdhbWVJZCA9PT0gZ2FtZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZ2FtZS5xdWVzdGlvbnNbMF0ucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZ2V0UXVlc3Rpb25zID0gKG9wdGlvbnMpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXF1ZXN0XzEuZGVmYXVsdChgaHR0cHM6Ly9vcGVudGRiLmNvbS9hcGkucGhwP2Ftb3VudD0ke29wdGlvbnMuYW1vdW50fSZkaWZmaWN1bHR5PSR7b3B0aW9ucy5kaWZmaWN1bHR5fWAsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJvZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmNyZWF0ZUdhbWUgPSAoZ2FtZU5hbWUsIHF1ZXN0aW9ucykgPT4ge1xuICAgIGNvbnN0IGdhbWVJZCA9IHNob3J0aWRfMS5kZWZhdWx0LmdlbmVyYXRlKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICByZXF1ZXN0XzEuZGVmYXVsdC5wb3N0KHtcbiAgICAgICAgICAgIHVybDogZXhwb3J0cy5nZXRCYXNlVXJpKCksXG4gICAgICAgICAgICBqc29uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogZ2FtZU5hbWUsXG4gICAgICAgICAgICAgICAgZ2FtZUlkOiBnYW1lSWQsXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zOiBKU09OLnBhcnNlKHF1ZXN0aW9ucylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlc29sdmUoZ2FtZUlkKTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldEdhbWUgPSBnYW1lSWQgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICByZXF1ZXN0XzEuZGVmYXVsdChleHBvcnRzLmdldEJhc2VVcmkoKSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkQm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgICAgICBwYXJzZWRCb2R5LmZpbmQoZ2FtZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2FtZUlkID09PSBnYW1lSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShnYW1lLl9pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZGVsZXRlR2FtZSA9IGdhbWVJZCA9PiB7XG4gICAgZXhwb3J0cy5nZXRHYW1lKGdhbWVJZCkudGhlbigoaWQpID0+IHtcbiAgICAgICAgcmVxdWVzdF8xLmRlZmF1bHQuZGVsZXRlKHtcbiAgICAgICAgICAgIHVybDogYCR7ZXhwb3J0cy5nZXRCYXNlVXJpKCl9LyR7aWR9YFxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmdldExpdmVHYW1lcyA9IGdhbWVzID0+IHtcbiAgICBjb25zdCBnYW1lc0FzQXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gZ2FtZXMpIHtcbiAgICAgICAgaWYgKCFnYW1lc1trZXldLnByaXZhdGUgJiYgIWdhbWVzW2tleV0uaXNJblBsYXkpIHtcbiAgICAgICAgICAgIGdhbWVzQXNBcnJheS5wdXNoKGdhbWVzW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnYW1lc0FzQXJyYXk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1yZXN0ZnVsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlcXVlc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2hvcnRpZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==