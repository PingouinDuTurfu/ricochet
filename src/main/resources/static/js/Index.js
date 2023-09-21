import {CONFIG, MODE, PAGE, SWITCH_PAGE_TYPE} from "./Constants.js";
import { EditGrid } from "./components/games/EditGrid.js";
import { WebsocketSession } from "./Websocket.js";
import { Messaging } from "./components/Messaging.js";
import { PlayGrid } from "./components/games/PlayGrid.js";
import { HomePage } from "./pages/HomePage.js";

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

class Session {
    constructor() {
        this.game = null;
        this.page = null;
        this.messaging = null;
        this.websocket = null;
    }

    init() {
        this.page = new HomePage();
        this.messaging = new Messaging();
        this.websocket = new WebsocketSession();
    }

    switchPage(fromId, toId, type, data = undefined) {
        console.log("Switching page from " + fromId + " to " + toId + " with type " + type);
        const container = $("#pages-container");
        const fromElement = $(`#${fromId}`);
        const toElement = $(`#${toId}`);

        toElement.removeClass("hidden");
        this.page.destroy();

        switch (type) {
            case SWITCH_PAGE_TYPE.EDIT_EMPTY:
                this.page = new EditGrid();
                this.page.emptyEditGridCreation();
                break;
            case SWITCH_PAGE_TYPE.EDIT_SELECT:
                if(data === undefined) {
                    session.messaging.displayErrorMessage("Invalid map name");
                    return;
                }

                this.page = new EditGrid();
                this.page.emptyEditGridCreation(data);
                break;
            case SWITCH_PAGE_TYPE.PLAY_JOIN:
                if(data === undefined) {
                    session.messaging.displayErrorMessage("Invalid game id");
                    return;
                }

                this.page = new PlayGrid();
                break;
            case SWITCH_PAGE_TYPE.PLAY_CREATE:
                if(data === undefined) {
                    session.messaging.displayErrorMessage("Invalid map name");
                    return;
                }

                this.page = new PlayGrid();
                break;

            case SWITCH_PAGE_TYPE.HOME:
                this.page = new HomePage();
                break;
        }

        if(Array.prototype.indexOf.call(container.children(), fromElement[0]) > Array.prototype.indexOf.call(container.children(), toElement[0])) {
            container.addClass("scroll-page-out-up");
            setTimeout(() => {
                fromElement.addClass("hidden");
                container.removeClass("scroll-page-out-up");
            }, 500);
        } else {
            container.addClass("scroll-page-out-down");
            setTimeout(() => {
                fromElement.addClass("hidden");
                container.removeClass("scroll-page-out-down");
            }, 500);
        }
    }
}

export const session = new Session();

$(document).ready(() => {
    initCssVariables();
    session.init();
})

