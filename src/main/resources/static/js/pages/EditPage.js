import {BasePage} from "./BasePage.js";
import {session} from "../Index";
import {EditGrid} from "../components/games/EditGrid";

export class Edit extends BasePage {

    constructor() {
        super();
    }

    init() {
        session.game = new EditGrid();
    }

    destroy() {

    }
}