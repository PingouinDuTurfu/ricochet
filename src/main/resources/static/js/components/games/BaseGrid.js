import {ROBOTS_COLORS, SOURCE_CELL, WALL_DIRECTION, WALL_STATE} from "../../Constants.js";
import {Cell} from "../Cell.js";
import {Wall} from "../Wall.js";
import {Robot} from "../Robot.js";

export class BaseGrid {

    constructor(width, height, gridElement, wallsElement, panel) {
        this.robots = new Map();
        this.gridData = [[]];
        this.width = width;
        this.height = height;
        this.gridElement = gridElement;
        this.wallsElement = wallsElement;
        this.panel = panel;
    }

    gridCreation(gameData) {
        this.width = gameData.w;
        this.height = gameData.h;
        this.gridData = [...Array(this.height + 1)].map(() => Array(this.width + 1));

        this.gridElement.empty();
        this.wallsElement.empty();

        Object.entries(gameData.g).forEach(([, row]) => {
            Object.entries(row).forEach(([, e]) => {
                const x = e.x;
                const y = e.y;

                if(this.gridData[y][x] === undefined)
                    this.gridData[y][x] = {};

                this.gridData[y][x].c = new Cell(x, y, this, SOURCE_CELL[e.v]);
                if (this.gridData[y][x].h === undefined)
                    this.gridData[y][x].h = new Wall(x, y, WALL_DIRECTION.HORIZONTAL, this, e.t ? WALL_STATE.SOLID : WALL_STATE.EMPTY);
                if (this.gridData[y][x].v === undefined)
                    this.gridData[y][x].v = new Wall(x, y, WALL_DIRECTION.VERTICAL, this, e.l ? WALL_STATE.SOLID : WALL_STATE.EMPTY);

                if(e.b) {
                    if(this.gridData[y+1][x] === undefined)
                        this.gridData[y+1][x] = {};
                    this.gridData[y+1][x].h = new Wall(x, y+1, WALL_DIRECTION.HORIZONTAL, this, WALL_STATE.SOLID);

                }
                if(e.r) {
                    if(this.gridData[y][x+1] === undefined)
                        this.gridData[y][x+1] = {};
                    this.gridData[y][x+1].v = new Wall(x+1, y, WALL_DIRECTION.VERTICAL, this, WALL_STATE.SOLID);
                }
            });
        });

        for(let i = 0; i < gameData.w; i++) {
            if(this.gridData[gameData.h][i] === undefined)
                this.gridData[gameData.h][i] = {};
            if(this.gridData[gameData.h][i].h === undefined)
                this.gridData[gameData.h][i].h = new Wall(i, gameData.h, WALL_DIRECTION.HORIZONTAL, this, WALL_STATE.EMPTY);
        }

        for(let i = 0; i < gameData.h; i++) {
            if(this.gridData[i][gameData.w] === undefined)
                this.gridData[i][gameData.w] = {};
            if(this.gridData[i][gameData.w].v === undefined)
                this.gridData[i][gameData.w].v = new Wall(gameData.w, i, WALL_DIRECTION.VERTICAL, this, WALL_STATE.EMPTY);
        }

        this.robots = new Map();
        gameData.r.forEach((r) => {
            const robot = new Robot(r.c, ROBOTS_COLORS[r.c], r.x, r.y);
            this.robots.set(r.c, robot);
            if(r.x !== null && r.y !== null)
                this.gridData[r.y][r.x].c.getElement().append(robot.getElement());
        });
    }

    draw() {
        this.gridElement.empty();
        this.wallsElement.empty();

        for (let i = 0; i < this.gridData.length; i++) {
            const rowElement = $('<div class="grid-row"></div>');
            for (let j = 0; j < this.gridData[i].length; j++) {
                if(this.gridData[i][j] === undefined)
                    continue;
                if(this.gridData[i][j].c !== undefined)
                    rowElement.append(this.gridData[i][j].c.getElement());
                if(this.gridData[i][j].h !== undefined)
                    this.wallsElement.append(this.gridData[i][j].h.getElement());
                if(this.gridData[i][j].v !== undefined)
                    this.wallsElement.append(this.gridData[i][j].v.getElement());
            }
            this.gridElement.append(rowElement);
        }
    }

    serialize() {
        const serializedGrid = [];
        for (let i = 0; i < this.height; i++) {
            serializedGrid[i] = [];
            for (let j = 0; j < this.width; j++) {
                const cell = this.gridData[i][j];
                const rightCell = this.gridData[i][j + 1];
                const bottomCell = this.gridData[i + 1][j];
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
}