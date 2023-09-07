import {Cell} from "./Cell.js";
import {Wall} from "./Wall.js";
import {LeftPanel} from "./LeftPanel.js";
import {Robot} from "./Robot.js";
import {CONFIG, MODE, ROBOTS_COLORS, SOURCE_CELL, WALL_DIRECTION, WALL_STATE} from "./Constants.js";

export class Game {
    constructor(mode) {

        this.robots = new Map();

        this.gridElement = $('#grid');
        this.wallsElement = $('#walls');

        this.leftPanel = new LeftPanel(this);
        this.updateMode(mode);
    }

    #buildDefaultEditGrid() {
        if(this.mode !== MODE.EDIT)
            return;

        this.width = CONFIG.GRID_WIDTH;
        this.height = CONFIG.GRID_HEIGHT;
        this.grid = [...Array(this.height + 1)].map(() => [...Array(this.width + 1)]);

        for (let i = 0; i < this.height + 1; i++) {
            for (let j = 0; j < this.width + 1; j++) {
                this.grid[i][j] = {
                    c: i < this.height && j < this.width ? new Cell(j, i, this) : undefined,
                    h: j < this.width ? new Wall(j, i, WALL_DIRECTION.HORIZONTAL, this) : undefined,
                    v: i < this.height ? new Wall(j, i, WALL_DIRECTION.VERTICAL, this) : undefined
                }
            }
        }

        for (let [key, value] of Object.entries(ROBOTS_COLORS)) {
            this.robots.set(key, new Robot(key, value));
        }

        this.leftPanel.loadRobots();

        this.#draw();
    }

    buildGameGrid(gameData) {
        if(this.mode !== MODE.PLAY)
            return;

        this.#defaultGridCreation(gameData);

        // this.leftPanel = new LeftPanel(this);
        this.cellSelected = null;

        this.#draw();
    }

    createEditMap(gameData) {
        if(this.mode !== MODE.EDIT)
            return;

        this.leftPanel = new LeftPanel(this);
        this.#defaultGridCreation(gameData);
        this.leftPanel.loadRobots();

        this.cellSelected = null;
        this.#draw();
    }

    #defaultGridCreation(gameData) {
        this.width = gameData.w;
        this.height = gameData.h;
        this.grid = [...Array(this.height + 1)].map(() => Array(this.width + 1));

        this.gridElement.empty();
        this.wallsElement.empty();

        Object.entries(gameData.g).forEach(([, row]) => {
            Object.entries(row).forEach(([, e]) => {
                const x = e.x;
                const y = e.y;

                if(this.grid[y][x] === undefined)
                    this.grid[y][x] = {};

                this.grid[y][x].c = new Cell(x, y, this, SOURCE_CELL[e.v]);
                if (this.grid[y][x].h === undefined)
                    this.grid[y][x].h = new Wall(x, y, WALL_DIRECTION.HORIZONTAL, this, e.t ? WALL_STATE.SOLID : WALL_STATE.EMPTY);
                if (this.grid[y][x].v === undefined)
                    this.grid[y][x].v = new Wall(x, y, WALL_DIRECTION.VERTICAL, this, e.l ? WALL_STATE.SOLID : WALL_STATE.EMPTY);

                if(e.b) {
                    if(this.grid[y+1][x] === undefined)
                        this.grid[y+1][x] = {};
                    this.grid[y+1][x].h = new Wall(x, y+1, WALL_DIRECTION.HORIZONTAL, this, WALL_STATE.SOLID);

                }
                if(e.r) {
                    if(this.grid[y][x+1] === undefined)
                        this.grid[y][x+1] = {};
                    this.grid[y][x+1].v = new Wall(x+1, y, WALL_DIRECTION.VERTICAL, this, WALL_STATE.SOLID);
                }
            });
        });

        for(let i = 0; i < gameData.w; i++) {
            if(this.grid[gameData.h][i] === undefined)
                this.grid[gameData.h][i] = {};
            if(this.grid[gameData.h][i].h === undefined)
                this.grid[gameData.h][i].h = new Wall(i, gameData.h, WALL_DIRECTION.HORIZONTAL, this, WALL_STATE.EMPTY);
        }

        for(let i = 0; i < gameData.h; i++) {
            if(this.grid[i][gameData.w] === undefined)
                this.grid[i][gameData.w] = {};
            if(this.grid[i][gameData.w].v === undefined)
                this.grid[i][gameData.w].v = new Wall(gameData.w, i, WALL_DIRECTION.VERTICAL, this, WALL_STATE.EMPTY);
        }

        this.leftPanel.getContentElement().find('#edit-container #robot-pieces-container').empty();
        this.robots = new Map();
        gameData.r.forEach((r) => {
            const robot = new Robot(r.c, ROBOTS_COLORS[r.c], r.x, r.y);
            this.robots.set(r.c, robot);
            if(r.x !== null && r.y !== null)
                this.grid[r.y][r.x].c.getElement().append(robot.getElement());
        });
    }

    #draw() {
        this.gridElement.empty();
        this.wallsElement.empty();

        for (let i = 0; i < this.grid.length; i++) {
            const rowElement = $('<div class="row"></div>');
            for (let j = 0; j < this.grid[i].length; j++) {
                if(this.grid[i][j] === undefined)
                    continue;
                if(this.grid[i][j].c !== undefined)
                    rowElement.append(this.grid[i][j].c.getElement());
                if(this.grid[i][j].h !== undefined)
                    this.wallsElement.append(this.grid[i][j].h.getElement());
                if(this.grid[i][j].v !== undefined)
                    this.wallsElement.append(this.grid[i][j].v.getElement());
            }
            this.gridElement.append(rowElement);
        }
    }

    updateMode(mode) {
        this.mode = mode;
        this.cellSelected = null;
        this.grid = [[]];

        switch (this.mode) {
            case MODE.PLAY:
                this.gridElement.removeClass('edit');
                this.wallsElement.removeClass('edit');
                this.leftPanel.displayPlay();
                break;
            case MODE.EDIT:
                this.gridElement.addClass('edit');
                this.wallsElement.addClass('edit');
                this.leftPanel.displayEdit();
                this.#buildDefaultEditGrid();
                break;
        }
    }

    setCellSelected(cell) {
        if(cell === null || (this.cellSelected !== null && this.cellSelected.getElement().attr('id') === cell.getElement().attr('id'))) {
            this.leftPanel.getContentElement().find('#swap-cell-container').css('filter', 'grayscale(1)');
            this.cellSelected = null;
            return;
        }
        if(this.cellSelected !== null)
            this.cellSelected.toggleState();
        this.leftPanel.getContentElement().find('#swap-cell-container').css('filter', 'grayscale(0)');
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
            this.grid[y][x].c.getElement().append(robot.getElement());
        }
    }

    serialize() {
        const serializedGrid = [];
        for (let i = 0; i < this.height; i++) {
            serializedGrid[i] = [];
            for (let j = 0; j < this.width; j++) {
                const cell = this.grid[i][j];
                const rightCell = this.grid[i][j + 1];
                const bottomCell = this.grid[i + 1][j];
                serializedGrid[i][j] = {
                    x: j,
                    y: i,
                    v: cell.c.serialize(),
                    t: cell.h !== undefined && cell.h.state === WALL_STATE.SOLID,
                    b: bottomCell.h !== undefined && bottomCell.h.state === WALL_STATE.SOLID,
                    l: cell.v !== undefined && cell.v.state === WALL_STATE.SOLID,
                    r: rightCell.v !== undefined && rightCell.v.state === WALL_STATE.SOLID,
                }
            }
        }

        return JSON.stringify({
            w: this.width,
            h: this.height,
            g: serializedGrid,
            r: [...this.robots.values()].map(value => value.serialize())
        });
    }

    getMode() {
        return this.mode;
    }
}