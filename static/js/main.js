/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./assets/js/chat.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "handleNewMessage": () => (/* binding */ handleNewMessage),\n/* harmony export */   "enableChat": () => (/* binding */ enableChat),\n/* harmony export */   "disableChat": () => (/* binding */ disableChat)\n/* harmony export */ });\n/* harmony import */ var _sockets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sockets */ "./assets/js/sockets.js");\n\nvar messages = document.getElementById("jsMessages");\nvar sendMsg = document.getElementById("jsSendMsg");\n\nvar appendMsg = function appendMsg(text, nickname) {\n  var li = document.createElement("li");\n  li.innerHTML = "\\n    <span class=\\"author ".concat(nickname ? "out" : "self", "\\">").concat(nickname ? nickname : "You", ":</span> ").concat(text, "\\n  ");\n  messages.appendChild(li);\n};\n\nvar handleSendMsg = function handleSendMsg(e) {\n  e.preventDefault();\n  var input = sendMsg.querySelector("input");\n  var value = input.value;\n  (0,_sockets__WEBPACK_IMPORTED_MODULE_0__.getSocket)().emit(window.events.sendMsg, {\n    message: value\n  });\n  appendMsg(value);\n  input.value = "";\n};\n\nvar handleNewMessage = function handleNewMessage(_ref) {\n  var message = _ref.message,\n      nickname = _ref.nickname;\n  return appendMsg(message, nickname);\n};\n\nif (sendMsg) {\n  sendMsg.addEventListener("submit", handleSendMsg);\n}\n\nvar enableChat = function enableChat() {\n  sendMsg.style.display = "flex";\n};\nvar disableChat = function disableChat() {\n  sendMsg.style.display = "none";\n};\n\n//# sourceURL=webpack://guess_mine/./assets/js/chat.js?')},"./assets/js/index.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sockets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sockets */ "./assets/js/sockets.js");\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login */ "./assets/js/login.js");\n/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat */ "./assets/js/chat.js");\n/* harmony import */ var _paint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paint */ "./assets/js/paint.js");\n\n\n\n\n\n//# sourceURL=webpack://guess_mine/./assets/js/index.js?')},"./assets/js/login.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sockets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sockets */ "./assets/js/sockets.js");\n\nvar body = document.querySelector("body");\nvar loginForm = document.getElementById("jsLogin");\nvar NICKNAME = "nickname";\nvar LOGGED_IN = "loggedIn";\nvar LOGGED_OUT = "loggedOut";\nvar nickname = localStorage.getItem("nickname");\n\nvar logIn = function logIn(nickname) {\n  // eslint-disable-next-line no-undef\n  var socket = io("/");\n  socket.emit(window.events.setNickname, {\n    nickname: nickname\n  });\n  (0,_sockets__WEBPACK_IMPORTED_MODULE_0__.initSockets)(socket);\n};\n\nif (nickname === null) {\n  body.className = LOGGED_OUT;\n} else {\n  body.className = LOGGED_IN;\n  logIn(nickname);\n}\n\nvar handleFormSubmit = function handleFormSubmit(e) {\n  e.preventDefault();\n  var input = loginForm.querySelector("input");\n  var value = input.value;\n  localStorage.setItem(NICKNAME, value);\n  logIn(value);\n  body.className = LOGGED_IN;\n  input.value = "";\n};\n\nif (loginForm) {\n  loginForm.addEventListener("submit", handleFormSubmit);\n}\n\n//# sourceURL=webpack://guess_mine/./assets/js/login.js?')},"./assets/js/notification.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "handleNewUser": () => (/* binding */ handleNewUser),\n/* harmony export */   "handleDisconnected": () => (/* binding */ handleDisconnected)\n/* harmony export */ });\nvar body = document.querySelector("body");\n\nvar fireNotification = function fireNotification(text, color) {\n  var notification = document.createElement("div");\n  notification.innerText = text;\n  notification.style.backgroundColor = color;\n  body.appendChild(notification);\n};\n\nvar handleNewUser = function handleNewUser(_ref) {\n  var nickname = _ref.nickname;\n  fireNotification("".concat(nickname, " just joined!"), "rgb(0, 122, 255");\n};\nvar handleDisconnected = function handleDisconnected(_ref2) {\n  var nickname = _ref2.nickname;\n  fireNotification("".concat(nickname, " just left!"), "rgb(255, 149, 0");\n};\n\n//# sourceURL=webpack://guess_mine/./assets/js/notification.js?')},"./assets/js/paint.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "handleBeganPath": () => (/* binding */ handleBeganPath),\n/* harmony export */   "handleStrokedPath": () => (/* binding */ handleStrokedPath),\n/* harmony export */   "handleFilled": () => (/* binding */ handleFilled),\n/* harmony export */   "disableCanvas": () => (/* binding */ disableCanvas),\n/* harmony export */   "enableCanvas": () => (/* binding */ enableCanvas),\n/* harmony export */   "hideControls": () => (/* binding */ hideControls),\n/* harmony export */   "showControls": () => (/* binding */ showControls),\n/* harmony export */   "resetCanvas": () => (/* binding */ resetCanvas)\n/* harmony export */ });\n/* harmony import */ var _sockets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sockets */ "./assets/js/sockets.js");\n\nvar canvas = document.getElementById("jsCanvas");\nvar controls = document.getElementById("jsControls");\nvar ctx = canvas.getContext("2d");\nvar colors = document.getElementsByClassName("jsColor");\nvar mode = document.getElementById("jsMode");\nvar INITIAL_COLOR = "#2c2c2c";\nvar CANVAS_SIZE = 700;\ncanvas.width = CANVAS_SIZE;\ncanvas.height = CANVAS_SIZE;\nctx.fillStyle = "white";\nctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);\nctx.strokeStyle = INITIAL_COLOR;\nctx.fillStyle = INITIAL_COLOR;\nctx.lineWidth = 2.5;\nvar painting = false;\nvar filling = false;\n\nfunction stopPainting() {\n  painting = false;\n}\n\nfunction startPainting() {\n  painting = true;\n}\n\nvar beginPath = function beginPath(x, y) {\n  ctx.beginPath();\n  ctx.moveTo(x, y);\n};\n\nvar strokePath = function strokePath(x, y) {\n  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  var currentColor = ctx.strokeStyle;\n\n  if (color !== null) {\n    ctx.strokeStyle = color;\n  }\n\n  ctx.lineTo(x, y);\n  ctx.stroke();\n  ctx.strokeStyle = currentColor;\n};\n\nfunction onMouseMove(event) {\n  var x = event.offsetX;\n  var y = event.offsetY;\n\n  if (!painting) {\n    beginPath(x, y);\n    (0,_sockets__WEBPACK_IMPORTED_MODULE_0__.getSocket)().emit(window.events.beginPath, {\n      x: x,\n      y: y\n    });\n  } else {\n    strokePath(x, y);\n    (0,_sockets__WEBPACK_IMPORTED_MODULE_0__.getSocket)().emit(window.events.strokePath, {\n      x: x,\n      y: y,\n      color: ctx.strokeStyle\n    });\n  }\n}\n\nfunction handleColorClick(event) {\n  var color = event.target.style.backgroundColor;\n  ctx.strokeStyle = color;\n  ctx.fillStyle = color;\n}\n\nfunction handleModeClick() {\n  if (filling === true) {\n    filling = false;\n    mode.innerText = "Fill";\n  } else {\n    filling = true;\n    mode.innerText = "Paint";\n  }\n}\n\nvar fill = function fill() {\n  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n  var currentColor = ctx.fillStyle;\n\n  if (color !== null) {\n    ctx.fillStyle = color;\n  }\n\n  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);\n  ctx.fillStyle = currentColor;\n};\n\nfunction handleCanvasClick() {\n  if (filling) {\n    fill();\n    (0,_sockets__WEBPACK_IMPORTED_MODULE_0__.getSocket)().emit(window.events.fill, {\n      color: ctx.fillStyle\n    });\n  }\n}\n\nfunction handleCM(event) {\n  event.preventDefault();\n}\n\nArray.from(colors).forEach(function (color) {\n  return color.addEventListener("click", handleColorClick);\n});\n\nif (mode) {\n  mode.addEventListener("click", handleModeClick);\n}\n\nvar handleBeganPath = function handleBeganPath(_ref) {\n  var x = _ref.x,\n      y = _ref.y;\n  return beginPath(x, y);\n};\nvar handleStrokedPath = function handleStrokedPath(_ref2) {\n  var x = _ref2.x,\n      y = _ref2.y,\n      color = _ref2.color;\n  return strokePath(x, y, color);\n};\nvar handleFilled = function handleFilled(_ref3) {\n  var color = _ref3.color;\n  return fill(color);\n};\nvar disableCanvas = function disableCanvas() {\n  canvas.removeEventListener("mousemove", onMouseMove);\n  canvas.removeEventListener("mousedown", startPainting);\n  canvas.removeEventListener("mouseup", stopPainting);\n  canvas.removeEventListener("mouseleave", stopPainting);\n  canvas.removeEventListener("click", handleCanvasClick);\n};\nvar enableCanvas = function enableCanvas() {\n  canvas.addEventListener("mousemove", onMouseMove);\n  canvas.addEventListener("mousedown", startPainting);\n  canvas.addEventListener("mouseup", stopPainting);\n  canvas.addEventListener("mouseleave", stopPainting);\n  canvas.addEventListener("click", handleCanvasClick);\n};\nvar hideControls = function hideControls() {\n  controls.style.display = "none";\n};\nvar showControls = function showControls() {\n  controls.style.display = "flex";\n};\nvar resetCanvas = function resetCanvas() {\n  return fill("#fff");\n};\n\nif (canvas) {\n  canvas.addEventListener("contextmenu", handleCM);\n  hideControls();\n}\n\n//# sourceURL=webpack://guess_mine/./assets/js/paint.js?')},"./assets/js/players.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "handlePlayerUpdate": () => (/* binding */ handlePlayerUpdate),\n/* harmony export */   "handleGameStarted": () => (/* binding */ handleGameStarted),\n/* harmony export */   "handleLeaderNotif": () => (/* binding */ handleLeaderNotif),\n/* harmony export */   "handleGameEnded": () => (/* binding */ handleGameEnded),\n/* harmony export */   "handleGameStarting": () => (/* binding */ handleGameStarting)\n/* harmony export */ });\n/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat */ "./assets/js/chat.js");\n/* harmony import */ var _paint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paint */ "./assets/js/paint.js");\n\n\nvar board = document.getElementById("jsPBoard");\nvar notifs = document.getElementById("jsNotifs");\n\nvar addPlayers = function addPlayers(players) {\n  board.innerHTML = "";\n  players.forEach(function (player) {\n    var playerElement = document.createElement("span");\n    playerElement.innerText = "".concat(player.nickname, ": ").concat(player.points);\n    board.appendChild(playerElement);\n  });\n};\n\nvar setNotifs = function setNotifs(text) {\n  notifs.innerText = "";\n  notifs.innerText = text;\n};\n\nvar handlePlayerUpdate = function handlePlayerUpdate(_ref) {\n  var sockets = _ref.sockets;\n  return addPlayers(sockets);\n};\nvar handleGameStarted = function handleGameStarted() {\n  setNotifs(""); // disable canvas events\n\n  (0,_paint__WEBPACK_IMPORTED_MODULE_1__.disableCanvas)(); // hide the canvas control\n\n  (0,_paint__WEBPACK_IMPORTED_MODULE_1__.hideControls)();\n  (0,_chat__WEBPACK_IMPORTED_MODULE_0__.enableChat)();\n};\nvar handleLeaderNotif = function handleLeaderNotif(_ref2) {\n  var word = _ref2.word;\n  (0,_paint__WEBPACK_IMPORTED_MODULE_1__.enableCanvas)();\n  (0,_paint__WEBPACK_IMPORTED_MODULE_1__.showControls)();\n  (0,_chat__WEBPACK_IMPORTED_MODULE_0__.disableChat)();\n  notifs.innerText = "You are the leader, paint: ".concat(word);\n};\nvar handleGameEnded = function handleGameEnded() {\n  setNotifs("Game ended.");\n  (0,_paint__WEBPACK_IMPORTED_MODULE_1__.disableCanvas)();\n  (0,_paint__WEBPACK_IMPORTED_MODULE_1__.hideControls)();\n  (0,_paint__WEBPACK_IMPORTED_MODULE_1__.resetCanvas)();\n};\nvar handleGameStarting = function handleGameStarting() {\n  return setNotifs("Game will start soon");\n};\n\n//# sourceURL=webpack://guess_mine/./assets/js/players.js?')},"./assets/js/sockets.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "getSocket": () => (/* binding */ getSocket),\n/* harmony export */   "initSockets": () => (/* binding */ initSockets)\n/* harmony export */ });\n/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat */ "./assets/js/chat.js");\n/* harmony import */ var _notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification */ "./assets/js/notification.js");\n/* harmony import */ var _paint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paint */ "./assets/js/paint.js");\n/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./players */ "./assets/js/players.js");\n\n\n\n\nvar socket = null;\nvar getSocket = function getSocket() {\n  return socket;\n};\nvar initSockets = function initSockets(aSocket) {\n  var _window = window,\n      events = _window.events;\n  socket = aSocket;\n  socket.on(events.newUser, _notification__WEBPACK_IMPORTED_MODULE_1__.handleNewUser);\n  socket.on(events.disconnected, _notification__WEBPACK_IMPORTED_MODULE_1__.handleDisconnected);\n  socket.on(events.newMsg, _chat__WEBPACK_IMPORTED_MODULE_0__.handleNewMessage);\n  socket.on(events.beganPath, _paint__WEBPACK_IMPORTED_MODULE_2__.handleBeganPath);\n  socket.on(events.strokedPath, _paint__WEBPACK_IMPORTED_MODULE_2__.handleStrokedPath);\n  socket.on(events.filled, _paint__WEBPACK_IMPORTED_MODULE_2__.handleFilled);\n  socket.on(events.playerUpdate, _players__WEBPACK_IMPORTED_MODULE_3__.handlePlayerUpdate);\n  socket.on(events.gameStarted, _players__WEBPACK_IMPORTED_MODULE_3__.handleGameStarted);\n  socket.on(events.leaderNotif, _players__WEBPACK_IMPORTED_MODULE_3__.handleLeaderNotif);\n  socket.on(events.gameEnded, _players__WEBPACK_IMPORTED_MODULE_3__.handleGameEnded);\n  socket.on(events.gameStarting, _players__WEBPACK_IMPORTED_MODULE_3__.handleGameStarting);\n};\n\n//# sourceURL=webpack://guess_mine/./assets/js/sockets.js?')},"./assets/scss/styles.scss":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://guess_mine/./assets/scss/styles.scss?")}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var _=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](_,_.exports,__webpack_require__),_.exports}__webpack_require__.d=(e,n)=>{for(var _ in n)__webpack_require__.o(n,_)&&!__webpack_require__.o(e,_)&&Object.defineProperty(e,_,{enumerable:!0,get:n[_]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__("./assets/js/index.js");var __webpack_exports__=__webpack_require__("./assets/scss/styles.scss")})();