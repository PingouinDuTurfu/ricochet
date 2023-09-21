import { BasePage } from "./BasePage.js";
import { session } from "../Index.js";
import { PAGE, SWITCH_PAGE_TYPE } from "../Constants.js";

const regexNumber = /^\d+$/;

export class HomePage extends BasePage {

    constructor() {
        super();
        this.joinGameInputCells = $(".join-game-input-cell");
        this.createEmptyEditGridButton = $("#home-create-empty-edit-button");
        this.editSelectMapButton = $("#home-load-edit-select");
        this.#init();
    }

    #init() {
        // Join game input
        this.joinGameInputCells
            .on("input", function(e) {
                if(!regexNumber.test(this.value)) {
                    e.preventDefault();
                    this.value = "";
                }

                if(this.value.length > 1)
                    this.value = this.value.slice(0,1);
                else
                    $(`#home-join-game-input-cell-${
                        parseInt($(this).attr("id").slice(-1)) + (this.value === "" ? -1 : 1)
                    }`).focus();
            });

        // Create empty edit grid
        this.createEmptyEditGridButton
            .on('click', () => {
                session.switchPage(PAGE.HOME, PAGE.EDIT, SWITCH_PAGE_TYPE.EDIT_EMPTY);
            });

        // Edit select map
        this.editSelectMapButton
            .on('click', () => {
                this.editSelectMapButton.find('#home-load-edit-items-container').toggleClass('hidden');
                this.editSelectMapButton.find('#home-load-edit-select-arrow').toggleClass('rotate');
            });

    }
    destroy() {
        this.joinGameInputCells.off("input");
        this.createEmptyEditGridButton.off('click');
        this.editSelectMapButton.off('click');
    }
}

// $("#play-container #play-create-game-button")
//     .off('click')
//     .click(() => {
//         websocket.send(WEBSOCKET_SENDER_ACTIONS.CREATE_GAME, {
//             mapName: "default",
//             username: "pingouin"
//         });
//         game.updateMode(MODE.PLAY)
//     });

// $("#play-container #play-join-game")
//     .off('click')
//     .click(() => {
//         websocket.send(WEBSOCKET_SENDER_ACTIONS.JOIN_GAME, {
//             gameId: $("#play-container #play-join-game-input").val(),
//             username: "yasuo"
//         });
//         game.updateMode(MODE.PLAY)
//     });