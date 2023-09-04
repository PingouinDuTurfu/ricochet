import {Cell} from "./Cell.js";
import {Wall} from "./Wall.js";
import {LeftPanel} from "./LeftPanel.js";
import {Robot} from "./Robot.js";
import {MODE, ROBOTS_COLORS, SOURCE_CELL, WALL_DIRECTION, WALL_STATE} from "./Constants.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.mode = MODE.EDIT;
        this.cellSelected = null;

        this.grid = [...Array(height + 1)].map(() => [...Array(width + 1)]);
        this.robots = new Map();

        this.gridElement = $('#grid');
        this.wallsElement = $('#walls');

        this.#buildGrid();
        this.leftPanel = new LeftPanel(this);
        this.updateMode(false);
    }

    #buildGrid() {
        for (let i = 0; i < this.height + 1; i++) {
            for (let j = 0; j < this.width + 1; j++) {
                this.grid[i][j] = {
                    c: i < this.height && j < this.width ? new Cell(i, j, this) : undefined,
                    h: j < this.width ? new Wall(i, j, WALL_DIRECTION.HORIZONTAL, this) : undefined,
                    v: i < this.height ? new Wall(i, j, WALL_DIRECTION.VERTICAL, this) : undefined
                }
            }
        }

        for (let [key, value] of Object.entries(ROBOTS_COLORS)) {
            this.robots.set(key, new Robot(key, value));
        }

        this.#draw();
    }

    createGame(gameData) {
        if(this.mode !== MODE.EDIT)
            return;

        this.width = gameData.w;
        this.height = gameData.h;
        this.grid = [...Array(gameData.h + 1)].map(() => [...Array(gameData.w + 1)]);
        this.gridElement.empty();
        this.wallsElement.empty();

        Object.entries(gameData.g).forEach(([, row]) => {
            Object.entries(row).forEach(([, e]) => {
                const x = e.x;
                const y = e.y;

                if(this.grid[x][y] === undefined)
                    this.grid[x][y] = {};

                this.grid[x][y].c = new Cell(x, y, this, SOURCE_CELL[e.v]);
                if (this.grid[x][y].h === undefined)
                    this.grid[x][y].h = new Wall(x, y, WALL_DIRECTION.HORIZONTAL, this, e.t ? WALL_STATE.SOLID : WALL_STATE.EMPTY);
                if (this.grid[x][y].v === undefined)
                    this.grid[x][y].v = new Wall(x, y, WALL_DIRECTION.VERTICAL, this, e.l ? WALL_STATE.SOLID : WALL_STATE.EMPTY);

                if(e.b) {
                    if(this.grid[x+1][y] === undefined)
                        this.grid[x+1][y] = {};
                    this.grid[x+1][y].h = new Wall(x+1, y, WALL_DIRECTION.HORIZONTAL, this, WALL_STATE.SOLID);
                }
                if(e.r) {
                    if(this.grid[x][y+1] === undefined)
                        this.grid[x][y+1] = {};
                    this.grid[x][y+1].v = new Wall(x, y+1, WALL_DIRECTION.VERTICAL, this, WALL_STATE.SOLID);
                }
            });
        });

        for(let i = 0; i < gameData.w; i++) {
            if(this.grid[gameData.h][i] === undefined)
                this.grid[gameData.h][i] = {};
            if(this.grid[gameData.h][i].h === undefined)
                this.grid[gameData.h][i].h = new Wall(gameData.h, i, WALL_DIRECTION.HORIZONTAL, this, WALL_STATE.EMPTY);
        }

        for(let i = 0; i < gameData.h; i++) {
            if(this.grid[i][gameData.w] === undefined)
                this.grid[i][gameData.w] = {};
            if(this.grid[i][gameData.w].v === undefined)
                this.grid[i][gameData.w].v = new Wall(i, gameData.w, WALL_DIRECTION.VERTICAL, this, WALL_STATE.EMPTY);
        }

        this.robots = new Map();
        gameData.r.forEach((r) => {
            this.robots.set(r.c, new Robot(r.c, ROBOTS_COLORS[r.c], r.x, r.y));
            if(r.x !== null && r.y !== null)
                this.grid[r.x][r.y].c.getElement().append(this.robots.get(r.c).getElement());
        });

        this.leftPanel = new LeftPanel(this);
        this.cellSelected = null;

        this.#draw();
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

    updateMode(switchMode = true) {
        if(switchMode)
            this.mode = this.mode === MODE.PLAY ? MODE.EDIT : MODE.PLAY;

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

    moveRobot(robotId, x, y) {
        Object.assign([...this.robots].find(([, v]) => v.getElement().attr('id') === robotId)[1], { x, y });
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
                    x: i,
                    y: j,
                    v: cell.c.serialize(),
                    t: cell.h !== null && cell.h.state === WALL_STATE.SOLID,
                    b: bottomCell.h !== null && bottomCell.h.state === WALL_STATE.SOLID,
                    l: cell.v !== null && cell.v.state === WALL_STATE.SOLID,
                    r: rightCell.v !== null && rightCell.v.state === WALL_STATE.SOLID,
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