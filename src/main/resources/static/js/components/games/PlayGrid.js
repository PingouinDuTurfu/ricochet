import {BaseGrid} from "./BaseGrid.js";
import {MODE} from "../../Constants.js";

export class PlayGrid extends BaseGrid {
    constructor() {
        super($('#grid'), $('#walls'), new PlayPanel());
        this.panel.attachGrid(this);
    }

    // buildGameGrid(gameData) {
    //     if(this.mode !== MODE.PLAY)
    //         return;
    //
    //     this.#defaultGridCreation(gameData);
    //
    //     // this.leftPanel = new LeftPanel(this);
    //     this.cellSelected = null;
    //
    //     this.#draw();
    // }

}