import {CONFIG, MODE, WALL_DIRECTION, WALL_STATE} from "./Constants.js";

export class Wall {
    constructor(x, y, direction, parentGrid, state = WALL_STATE.EMPTY) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.state = state;
        this.parentGrid = parentGrid;

        const directionString = Object.keys(WALL_DIRECTION).find(key => WALL_DIRECTION[key] === direction).toLowerCase();
        this.element = $(
                '<div />',
                {
                    class: 'wall ' + directionString,
                    id: 'wall-' + x + '-' + y + '-' + directionString
                }
            )
            .on('click', () => {
                this.toggleState();
            });

        this.draw();
    }

    toggleState() {
        if(this.parentGrid.getMode() !== MODE.EDIT)
            return;
        this.state = this.state === WALL_STATE.EMPTY ? WALL_STATE.SOLID : WALL_STATE.EMPTY;
        this.draw();
    }

    getElement() {
        this.element.css({
            'top': (this.x * (CONFIG.GRID_CELL_SIZE_PX + CONFIG.GRID_CELL_GAP_PX * 2) + CONFIG.GRID_CELL_GAP_PX) + 'px',
            'left': (this.y * (CONFIG.GRID_CELL_SIZE_PX + CONFIG.GRID_CELL_GAP_PX * 2) + CONFIG.GRID_CELL_GAP_PX) + 'px',
        });
        return this.element;
    }

    draw() {
        if(this.state === WALL_STATE.EMPTY)
            this.element.removeClass('solid');
        else
            this.element.addClass('solid');
    }

    serialize() {
        return {direction: this.direction, state: Object.keys(WALL_STATE).find(key => WALL_STATE[key] === this.state)};
    }
}