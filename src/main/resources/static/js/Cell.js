import {MODE, ROBOTS_COLORS, SOURCE_CELL} from "./Constants.js";
import {websocket} from "./Index.js";

export class Cell {
    constructor(x, y, parentGrid, source = SOURCE_CELL.DEFAULT) {
        this.x = x;
        this.y = y;
        this.parentGrid = parentGrid;
        this.isSelected = false;

        this.element = $(
            '<div>',
            {
                id: 'cell-' + x + '-' + y,
                class: 'cell',
                draggable: false
            })
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

                const elementId = event.originalEvent.dataTransfer.getData('text');
                if(elementId === null
                    || elementId === undefined
                    || elementId.split('-').length !== 2
                    || elementId.split('-')[0] !== 'robot'
                    || ROBOTS_COLORS[elementId.split('-')[1].toLocaleUpperCase()] === undefined)
                    return;

                const element = $('#' + elementId);
                if(!element.hasClass('robot-piece'))
                    return;

                if(this.parentGrid.getMode() === MODE.EDIT) {
                    this.element.append(element);
                    this.parentGrid.moveRobotFromHtmlId(elementId, this.x, this.y);
                } else
                    websocket.send('MOVE', {x: this.x, y: this.y, c: elementId.split('robot-')[1]});
            });

        this.setSource(source);
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
        return Object.keys(SOURCE_CELL).find(key => SOURCE_CELL[key] === this.source);
    }
}