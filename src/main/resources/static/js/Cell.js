import {MODE, SOURCE_CELL} from "./Constants.js";

export class Cell {
    constructor(x, y, parentGrid, source = SOURCE_CELL.DEFAULT) {
        this.x = x;
        this.y = y;
        this.parentGrid = parentGrid;
        this.isSelected = false;

        this.element = $('<div class="cell" id="cell-' + x + '-' + y + '"></div>')
            .css('background-image', 'url(' + source + ')')
            .off('click')
            .click(() => {
                this.toggleState();
            })
            .on('dragover', (event) => {
                event.preventDefault();
                $(event.target).addClass('dragover');
            })
            .on('dragleave', (event) => {
                event.preventDefault();
                $(event.target).removeClass('dragover');
            })
            .on('drop', (event) => {
                event.preventDefault();
                if(this.element.children().length > 0)
                    return;
                $(event.target).removeClass('dragover');
                const robotId = event.originalEvent.dataTransfer.getData('text');
                this.element.append($('#' + robotId));
                this.parentGrid.moveRobot(robotId, this.x, this.y);
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
        return {source: Object.keys(SOURCE_CELL).find(key => SOURCE_CELL[key] === this.source)};
    }
}