import {CONFIG, MODE} from "./Constants.js";
import {Game} from "./Game.js";
import {WebsocketSession} from "./Websocket.js";
import {Messaging} from "./Messaging.js";

function initCssVariables() {
    $(':root').css({
        '--grid-width': (CONFIG.GRID_CELL_SIZE_PX + 2 * CONFIG.GRID_CELL_GAP_PX) * CONFIG.GRID_WIDTH + 'px',
        '--grid-height': (CONFIG.GRID_CELL_SIZE_PX + 2 * CONFIG.GRID_CELL_GAP_PX) * CONFIG.GRID_HEIGHT + 'px',
        '--grid-cell-size': CONFIG.GRID_CELL_SIZE_PX + 'px',
        '--grid-cell-gap': CONFIG.GRID_CELL_GAP_PX + 'px',
        '--grid-cell-gap-size': CONFIG.GRID_CELL_GAP_SIZE_PX + 'px',
        '--robot-piece-size': CONFIG.ROBOT_PIECE_SIZE_PX + 'px'
    });
}

initCssVariables();

export const game = new Game(MODE.EDIT);
export const messaging = new Messaging();
export const websocket = new WebsocketSession();
