export class Robot {
    constructor(color, source, x = null, y = null) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.element = $(
            '<img />',
            {
                id: 'robot-' + color,
                class: 'robot-piece',
                src: source,
                alt: color,
                draggable: true
            })
            .on('dragstart', (event) => {
                event.originalEvent.dataTransfer.setData("text", 'robot-' + color);
            });
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getElement() {
        return this.element;
    }

    serialize() {
        return {x: this.x, y: this.y, c: this.color};
    }
}