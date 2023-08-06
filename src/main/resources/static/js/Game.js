const CONFIG = {
    GRID_WIDTH: 16,
    GRID_HEIGHT: 16,

    GRID_CELL_SIZE_PX: 55,
    GRID_CELL_GAP_PX: 1,
    GRID_CELL_GAP_SIZE_PX: 14,

    ROBOT_PIECE_SIZE_PX: 30
}

// const SOURCE_CELL = {
//     DEFAULT: '../static/asset/cells/default.png',
//     RED_PLANET: '../static/asset/cells/red_planet.png',
//     BLUE_PLANET: '../static/asset/cells/blue_planet.png',
//     GREEN_PLANET: '../static/asset/cells/green_planet.png',
//     YELLOW_PLANET: '../static/asset/cells/yellow_planet.png',
//     RED_STAR: '../static/asset/cells/red_star.png',
//     BLUE_STAR: '../static/asset/cells/blue_star.png',
//     GREEN_STAR: '../static/asset/cells/green_star.png',
//     YELLOW_STAR: '../static/asset/cells/yellow_star.png',
//     RED_TRIANGLE: '../static/asset/cells/red_triangle.png',
//     BLUE_TRIANGLE: '../static/asset/cells/blue_triangle.png',
//     GREEN_TRIANGLE: '../static/asset/cells/green_triangle.png',
//     YELLOW_TRIANGLE: '../static/asset/cells/yellow_triangle.png',
//     RED_MOON: '../static/asset/cells/red_moon.png',
//     BLUE_MOON: '../static/asset/cells/blue_moon.png',
//     GREEN_MOON: '../static/asset/cells/green_moon.png',
//     YELLOW_MOON: '../static/asset/cells/yellow_moon.png',
//     MULTICOLOR: '../static/asset/cells/multicolor.png'
// }

const SOURCE_CELL = {
    DEFAULT: '/asset/cells/default.png',
    RED_PLANET: '/asset/cells/red_planet.png',
    BLUE_PLANET: '/asset/cells/blue_planet.png',
    GREEN_PLANET: '/asset/cells/green_planet.png',
    YELLOW_PLANET: '/asset/cells/yellow_planet.png',
    RED_STAR: '/asset/cells/red_star.png',
    BLUE_STAR: '/asset/cells/blue_star.png',
    GREEN_STAR: '/asset/cells/green_star.png',
    YELLOW_STAR: '/asset/cells/yellow_star.png',
    RED_TRIANGLE: '/asset/cells/red_triangle.png',
    BLUE_TRIANGLE: '/asset/cells/blue_triangle.png',
    GREEN_TRIANGLE: '/asset/cells/green_triangle.png',
    YELLOW_TRIANGLE: '/asset/cells/yellow_triangle.png',
    RED_MOON: '/asset/cells/red_moon.png',
    BLUE_MOON: '/asset/cells/blue_moon.png',
    GREEN_MOON: '/asset/cells/green_moon.png',
    YELLOW_MOON: '/asset/cells/yellow_moon.png',
    MULTICOLOR: '/asset/cells/multicolor.png'
}

// const ROBOT_COLORS = {
//     RED: {
//         VALUE: 0,
//         SOURCE: '../static/asset/robots/red_robot.png'
//     },
//     BLUE: {
//         VALUE: 1,
//         SOURCE: '../static/asset/robots/blue_robot.png'
//     },
//     GREEN: {
//         VALUE: 2,
//         SOURCE: '../static/asset/robots/green_robot.png'
//     },
//     YELLOW: {
//         VALUE: 3,
//         SOURCE: '../static/asset/robots/yellow_robot.png'
//     },
//     GRAY: {
//         VALUE: 4,
//         SOURCE: '../static/asset/robots/gray_robot.png'
//     }
// }

const ROBOT_COLORS = {
    RED: {
        VALUE: 0,
        SOURCE: '/asset/robots/red_robot.png'
    },
    BLUE: {
        VALUE: 1,
        SOURCE: '/asset/robots/blue_robot.png'
    },
    GREEN: {
        VALUE: 2,
        SOURCE: '/asset/robots/green_robot.png'
    },
    YELLOW: {
        VALUE: 3,
        SOURCE: '/asset/robots/yellow_robot.png'
    },
    GRAY: {
        VALUE: 4,
        SOURCE: '/asset/robots/gray_robot.png'
    }
}

const WALL_DIRECTION = {
    HORIZONTAL: 0,
    VERTICAL: 1
}

const WALL_STATE = {
    EMPTY: 0,
    SOLID: 1
}

const MODE = {
    PLAY: 0,
    EDIT: 1
}

class Robot {
    constructor(color, x = null, y = null) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.element = $(
            '<img />',
            {
                id: 'robot-' + color.VALUE,
                class: 'robot-piece',
                src: color.SOURCE,
                alt: color.VALUE,
                draggable: true
            })
            .css('background-image', 'url(' + color + ')');
    }

    getElement() {
        return this.element;
    }

    serialize() {
        return {x: this.x, y: this.y, color: this.color};
    }
}

class Cell {
    constructor(x, y, parentGrid) {
        this.x = x;
        this.y = y;
        this.parentGrid = parentGrid;
        this.isSelected = false;
        this.source = SOURCE_CELL.DEFAULT;
        this.element = $('<div class="cell" id="cell-' + x + '-' + y + '"></div>')
                .css('background-image', 'url(' + SOURCE_CELL.DEFAULT + ')')
                .click(() => {
                    this.toggleState();
                })
                .on('dragover', (event) => {
                    event.preventDefault();
                })
                .on('drop', (event) => {
                    event.preventDefault();
                    if(this.element.children().length > 0)
                        return;
                    this.element.append($('#' +event.originalEvent.dataTransfer.getData('text')));
                }
            );
    }

    toggleState() {
        if(this.parentGrid.getMode() !== MODE.EDIT)
            return;

        this.isSelected = !this.isSelected;
        if(this.isSelected) {
            this.element.addClass('selected');
            this.parentGrid.setCellSelected(this);
        } else {
            this.element.removeClass('selected');
            this.parentGrid.setCellSelected(null);
        }
    }

    setSource(source) {
        this.source = source;
        this.element.css('background-image', 'url(' + source + ')');
    }

    getElement() {
        return this.element;
    }

    serialize() {
        return {x: this.x, y: this.y, source: Object.keys(SOURCE_CELL).find(key => SOURCE_CELL[key] === this.source)};
    }
}

class Wall {
    constructor(x, y, direction, parentGrid) {
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.parentGrid = parentGrid;

        this.state = WALL_STATE.EMPTY;

        const directionString = direction === WALL_DIRECTION.HORIZONTAL ? 'horizontal' : 'vertical';
        this.element = $('<div class="wall ' + directionString + '" id="wall-' + x + '-' + y + '-' + directionString + '"></div>');

        this.element.click(() => {
            this.toggleState();
        });
    }

    toggleState() {
        if(this.parentGrid.getMode() !== MODE.EDIT)
            return;

        const obWall = {
            k: Object.keys(WALL_STATE),
            v: Object.values(WALL_STATE)
        }
        this.state = obWall.v[(obWall.v.indexOf(this.state) + 1) % obWall.v.length];
        switch (this.state) {
            case WALL_STATE.EMPTY:
                this.element.removeClass('solid');
                break;
            case WALL_STATE.SOLID:
                this.element.addClass('solid');
                break;
        }
    }

    getElement() {
        this.setStyle();
        return this.element;
    }

    setStyle() {
        this.element.css({
            'top': (this.x * (CONFIG.GRID_CELL_SIZE_PX + CONFIG.GRID_CELL_GAP_PX * 2) + CONFIG.GRID_CELL_GAP_PX) + 'px',
            'left': (this.y * (CONFIG.GRID_CELL_SIZE_PX + CONFIG.GRID_CELL_GAP_PX * 2) + CONFIG.GRID_CELL_GAP_PX) + 'px',
        });
    }

    serialize() {
        return {x: this.x, y: this.y, direction: this.direction, state: this.state};
    }
}

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.mode = MODE.EDIT;

        this.gridElement = $('#grid');
        this.grid = [];

        this.wallsElement = $('#walls');
        this.walls = [];

        this.robotElement = $('#robots');
        this.robots = new Map();

        this.leftPanel = new LeftPanel(this);

        this.cellSelected = null;
    }

    updateMode(switchMode = true) {
        if(switchMode) {
            const obMode = {
                k: Object.keys(MODE),
                v: Object.values(MODE)
            }
            this.mode = obMode.v[(obMode.v.indexOf(this.mode) + 1) % obMode.v.length];
        }

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

    buildGrid() {
        for (let i = 0; i < this.height; i++) {
            const row = [];
            for (let j = 0; j < this.width; j++) {
                row.push(new Cell(i, j, this));
            }
            this.grid.push(row);
        }
    }

    buildWalls() {
        for (let i = 0; i < this.height + 1; i++) {
            for (let j = 0; j < this.width + 1; j++) {
                if (i < this.height)
                    this.walls.push({
                        h: j < this.width ? new Wall(i, j, WALL_DIRECTION.HORIZONTAL, this) : null,
                        v: new Wall(i, j, WALL_DIRECTION.VERTICAL, this)
                    });
                else
                    this.walls.push({
                        h: j < this.width ? new Wall(i, j, WALL_DIRECTION.HORIZONTAL, this) : null,
                        v: null
                    });
            }
        }
    }

    draw() {
        this.gridElement.empty();
        for (let i = 0; i < this.grid.length; i++) {
            const rowElement = $('<div class="row"></div>');
            for (let j = 0; j < this.grid[i].length; j++) {
                rowElement.append(this.grid[i][j].getElement());
            }
            this.gridElement.append(rowElement);
        }

        this.wallsElement.empty();

        for (let i = 0; i < this.walls.length; i++) {
            if(this.walls[i].h !== null)
                this.wallsElement.append(this.walls[i].h.getElement());
            if(this.walls[i].v !== null)
                this.wallsElement.append(this.walls[i].v.getElement());
        }

        for (let i = 0; i < this.robots.length; i++) {
            this.robotElement.append(this.robots[i].getElement());
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

    addRobot(color, robot) {
        this.robots.set(color, robot);
    }

    serialize() {
        return LZString.compressToUTF16(
        JSON.stringify({
            grid: this.grid.map((row) => row.map((cell) => cell.serialize())),
            walls: this.walls.flatMap((wall) => [wall.h?.serialize(), wall.v?.serialize()].filter(Boolean)),
            robots: new Map([...this.robots.entries()].map(([k, v]) => [k, v.serialize()]))
        }));
    }

    getMode() {
        return this.mode;
    }
}

class LeftPanel {
    constructor(parentGrid) {
        this.titleElement = $('#switch-title');
        this.contentElement = $('#left-panel-container');
        this.parentGrid = parentGrid;
        this.#init();
    }

    displayEdit() {
        this.titleElement.text('Edit');
        this.contentElement.children().css('display', 'none');
        this.contentElement.find('#edit-container').css('display', 'flex');
    }

    displayPlay() {
        this.titleElement.text('Play');
        this.contentElement.children().css('display', 'none');
        this.contentElement.find('#play-container').css('display', 'flex');
    }

    #init() {
        let cellsStringBuild = "";
        Object.keys(SOURCE_CELL).forEach((key) => cellsStringBuild += `<img class="swap-cell" src=${SOURCE_CELL[key]} alt=${key}>`);
        this.contentElement.find('#edit-container #swap-cell-container').append(cellsStringBuild);

        let robotsElementBuild = [];
        Object.keys(ROBOT_COLORS).forEach((key) => {
            const robot = new Robot(ROBOT_COLORS[key]);
            this.parentGrid.addRobot(key, robot);
            robotsElementBuild.push(robot.getElement());
        });
        this.contentElement.find('#edit-container #robot-pieces-container')
            .append(robotsElementBuild)
            .on('dragover', (event) => {
                event.preventDefault();
            })
            .on('drop', function(event) {
                event.preventDefault();
                const $this = $(this);
                const robot = $('#' +event.originalEvent.dataTransfer.getData('text'));
                if($this.find(robot).length > 0) {
                    console.log('already here')
                    return;
                }
                $this.append(robot);
            });

        const self = this;
        $('#edit-container .swap-cell').each(function() {
            $(this).on('click', () => {
                const cell = self.parentGrid.getCellSelected();
                if(cell === null)
                    return;
                cell.setSource(SOURCE_CELL[$(this).attr('alt')]);
            });
        })

        $('#edit-container .robot-piece').each(function() {
            $(this).on('dragstart', (event) => {
                event.originalEvent.dataTransfer.setData("text", $(this).attr('id'));
            });
        });

        $('#edit-container #save-edit').click(() => {
            const name = $('#edit-container #edit-name').val();
            if(name === "" || name === undefined || name === null) {
                alert('Entrer un nom valide');
                return;
            }

            const gameData = JSON.stringify(this.parentGrid.serialize());
            console.log(gameData)

            $.ajax({
                url: '/saveMap',
                type: 'POST',
                data: {
                    name: name,
                    mapData: gameData
                },
                success: function() {
                    console.log('success');
                }
            });
        });
    }

    getContentElement() {
        return this.contentElement;
    }
}

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

function init() {
    initCssVariables();

    const game = new Game(CONFIG.GRID_WIDTH, CONFIG.GRID_HEIGHT);
    game.buildGrid();
    game.buildWalls();
    game.updateMode(false);
    game.draw();


    $('#switch-mode').click(() => {
        $("#switch-title").text(game.getMode() === MODE.PLAY ? 'Edit' : 'Play');
        game.updateMode();
    });
}

init();

