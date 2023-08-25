// import {CONFIG} from "./Constants.js";
// import {Game} from "./Game.js";
//
// function initCssVariables() {
//     $(':root').css({
//         '--grid-width': (CONFIG.GRID_CELL_SIZE_PX + 2 * CONFIG.GRID_CELL_GAP_PX) * CONFIG.GRID_WIDTH + 'px',
//         '--grid-height': (CONFIG.GRID_CELL_SIZE_PX + 2 * CONFIG.GRID_CELL_GAP_PX) * CONFIG.GRID_HEIGHT + 'px',
//         '--grid-cell-size': CONFIG.GRID_CELL_SIZE_PX + 'px',
//         '--grid-cell-gap': CONFIG.GRID_CELL_GAP_PX + 'px',
//         '--grid-cell-gap-size': CONFIG.GRID_CELL_GAP_SIZE_PX + 'px',
//         '--robot-piece-size': CONFIG.ROBOT_PIECE_SIZE_PX + 'px'
//     });
// }
//
// initCssVariables();

let socket = new WebSocket("ws://localhost:8088/ws");

socket.onopen = function(e) {
    alert("[open] Connection established");
    alert("Sending to server");
    socket.send("{\"actionName\":\"PLAYER_CREATE_GAME\",\"data\":{\"username\":\"pingouin\"}}");
};

socket.onmessage = function(event) {
    alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
    if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        alert('[close] Connection died');
    }
};

socket.onerror = function(error) {
    alert(`[error]`);
};

// export const game = new Game(CONFIG.GRID_WIDTH, CONFIG.GRID_HEIGHT);