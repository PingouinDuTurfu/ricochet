import {Cell } from "../Cell.js";
import { Wall } from "../Wall.js";
import { Robot } from "../Robot.js";
import { CONFIG, ROBOTS_COLORS, WALL_DIRECTION } from "../../Constants.js";
import { BaseGrid } from "./BaseGrid.js";
import { EditPanel } from "../panels/EditPanel.js";

export class EditGrid extends BaseGrid {
    constructor() {
        super(CONFIG.GRID_WIDTH, CONFIG.GRID_HEIGHT, $('#grid'), $('#walls'), new EditPanel($('#edit-panel')));
        this.panel.attachGrid(this);
    }
    emptyEditGridCreation() {
        this.gridData = [...Array(this.height + 1)].map(() => [...Array(this.width + 1)]);

        for (let i = 0; i < this.height + 1; i++) {
            for (let j = 0; j < this.width + 1; j++) {
                this.gridData[i][j] = {
                    c: i < this.height && j < this.width ? new Cell(j, i, this) : undefined,
                    h: j < this.width ? new Wall(j, i, WALL_DIRECTION.HORIZONTAL, this) : undefined,
                    v: i < this.height ? new Wall(j, i, WALL_DIRECTION.VERTICAL, this) : undefined
                }
            }
        }

        for (let [key, value] of Object.entries(ROBOTS_COLORS))
            this.robots.set(key, new Robot(key, value));

        this.panel.loadRobots();

        this.draw();
    }

    editGridCreation(gameData) {
        // this.leftPanel = new LeftPanel(this);
        this.gridCreation(gameData);
        this.panel.loadRobots();

        this.cellSelected = null;
        this.draw();
    }


    setCellSelected(cell) {
        if(cell === null || (this.cellSelected !== null && this.cellSelected.getElement().attr('id') === cell.getElement().attr('id'))) {
            this.panel.enableGrayscaleOnSwapCells();
            this.cellSelected = null;
            return;
        }
        if(this.cellSelected !== null)
            this.cellSelected.toggleState();
        this.panel.disableGrayscaleOnSwapCells();
        this.cellSelected = cell;
    }

    getCellSelected() {
        return this.cellSelected;
    }

    getRobots() {
        return this.robots;
    }

    getRobot(robotId) {
        return this.robots.get(robotId);
    }

    moveRobotFromHtmlId(robotId, x, y) {
        const robot = [...this.robots].find(([, v]) => v.getElement().attr('id') === robotId)[1];
        robot.setPos(x, y);
    }

    moveRobot(key, x, y) {
        const robot = this.robots.get(key);
        if(x !== robot.getX() || y !== robot.getY()) {
            robot.setPos(x, y);
            this.gridData[y][x].c.getElement().append(robot.getElement());
        }
    }

    getMode() {
        return this.mode;
    }

    destroy() {
        this.panel.destroy();
    }
}