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
                    c: i < this.height && j < this.width ? new Cell(i, j, this) : null,
                    h: j < this.width ? new Wall(i, j, WALL_DIRECTION.HORIZONTAL, this) : null,
                    v: i < this.height ? new Wall(i, j, WALL_DIRECTION.VERTICAL, this) : null
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

        this.grid = [...Array(gameData.height + 1)].map(() => [...Array(gameData.width + 1)]);
        this.gridElement.empty();
        this.wallsElement.empty();

        Object.entries(gameData.grid).forEach(([, row]) => {
            Object.entries(row).forEach(([, e]) => {
                const x = e.x;
                const y = e.y;
                this.grid[x][y] = {
                    c: e.c !== null ? new Cell(x, y, this, SOURCE_CELL[e.c.source]) : null,
                    h: e.h !== null ? new Wall(x, y, WALL_DIRECTION.HORIZONTAL, this, WALL_STATE[e.h.state]) : null,
                    v: e.v !== null ? new Wall(x, y, WALL_DIRECTION.VERTICAL, this, WALL_STATE[e.v.state]) : null
                }
            });
        });

        this.robots = new Map();
        Object.entries(gameData.robots).forEach(([key, value]) => {
            this.robots.set(key, new Robot(key, ROBOTS_COLORS[key], value.x, value.y));
            if(value.x !== null && value.y !== null)
                this.grid[value.x][value.y].c.getElement().append(this.robots.get(key).getElement());
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
                if(this.grid[i][j].c !== null)
                    rowElement.append(this.grid[i][j].c.getElement());
                if(this.grid[i][j].h !== null)
                    this.wallsElement.append(this.grid[i][j].h.getElement());
                if(this.grid[i][j].v !== null)
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
        return LZString.compressToUTF16(
            JSON.stringify({
                width: this.width,
                height: this.height,
                grid: this.grid.map((row, i) =>
                    row.map((e, j) => {
                        return {
                            x: i,
                            y: j,
                            c: e.c !== null ? e.c.serialize() : null,
                            h: e.h !== null ? e.h.serialize() : null,
                            v: e.v !== null ? e.v.serialize() : null
                        }
                    })
                ),
                robots: Object.fromEntries([...this.robots.entries()].map(([k, v]) => [k, v.serialize()]))
            })
        );
    }

    getMode() {
        return this.mode;
    }
}