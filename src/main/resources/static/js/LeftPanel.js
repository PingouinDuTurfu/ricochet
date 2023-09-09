import {MODE, SOURCE_CELL, WEBSOCKET_SENDER_ACTIONS} from "./Constants.js";
import {game, messaging, websocket} from "./Index.js";

export class LeftPanel {
    constructor(parentGrid) {
        this.titleElement = $('#switch-title');
        this.contentElement = $('#left-panel-container');
        this.parentGrid = parentGrid;

        this.#init();
        this.#attachListeners();
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
        // Load swap cells
        const cellsElementContainer = this.contentElement.find('#edit-container #swap-cell-container')
            .empty();
        Object.keys(SOURCE_CELL).forEach((cell) => {
            const cellElement = $(
                    '<img />',
                    {
                        class: 'swap-cell',
                        id: 'swap-cell-' + cell,
                        alt: cell,
                        src: SOURCE_CELL[cell]
                    }
                )
                .on('click', () => {
                    const cellSelected = this.parentGrid.getCellSelected();
                    if(cellSelected === null)
                        return;
                    cellSelected.setSource(SOURCE_CELL[cell]);
                });
            cellsElementContainer.append(cellElement);
        });

        // Load maps
        const mapsElementContainer = this.contentElement.find('#edit-container #load-edit-select-items-container')
            .empty();
        $.ajax({
            url: '/getMapsNames',
            type: 'POST',
            success: function(data) {
                data.mapsNames.forEach((mapName) => {
                    const mapElement = $(
                            '<div />',
                            {
                                class: 'load-edit-item',
                                id: 'load-edit-item-' + mapName,
                                text: mapName
                            }
                        )
                        .on('click', () => {
                            $.ajax({
                                url: '/loadMap',
                                type: 'POST',
                                data: {
                                    name: mapName
                                },
                                success: function(data) {
                                    game.createEditMap(JSON.parse(data.mapData));
                                }
                            });
                        });
                    mapsElementContainer.append(mapElement);
                });
            }
        });
    }

    loadRobots() {
        const self = this;
        const robotsElementContainer = this.contentElement.find('#edit-container #robot-pieces-container')
            .empty()
            .on('dragover', (event) => {
                event.preventDefault();
            })
            .on('drop', function(event) {
                event.preventDefault();
                const $this = $(this);
                const robot = $('#' +event.originalEvent.dataTransfer.getData('text'));

                if($this.find(robot).length > 0)
                    return;

                self.parentGrid.moveRobotFromHtmlId(robot.attr('id'), null, null);
                $this.append(robot);
            });

        self.parentGrid.getRobots().forEach((robot) => {
            if(robot.getX() === null || robot.getY() === null)
                robotsElementContainer.append(robot.getElement());
        });
    }

    #attachListeners() {
        // Bind switch mode button
        $('#switch-mode')
            .off('click')
            .click(() => {
            $("#switch-title").text(game.getMode() === MODE.PLAY ? 'Edit' : 'Play');
            game.updateMode(game.getMode() === MODE.PLAY ? MODE.EDIT : MODE.PLAY);
        });

        // Bind save button
        $('#edit-container #save-edit')
            .off('click')
            .click(() => {
            const name = $('#edit-container #edit-name').val();
            if(name === "" || name === undefined || name === null) {
                alert('Entrer un nom valide');
                return;
            }

            $.ajax({
                url: '/saveMap',
                type: 'POST',
                data: {
                    name: name,
                    mapData: this.parentGrid.serialize()
                },
                success: function() {
                    messaging.displayMessage('Map saved');
                }
            });
        });

        // Bind load button
        $('#edit-container #load-edit-container')
            .off('click')
            .click(() => {
                $('#load-edit-select-items-container').toggleClass('hidden');
                $('#load-edit-arrow').toggleClass('rotate');
            });

        $("#play-container #play-create-game")
            .off('click')
            .click(() => {
                websocket.send(WEBSOCKET_SENDER_ACTIONS.CREATE_GAME, {
                    mapName: "default",
                    username: "pingouin"
                });
                game.updateMode(MODE.PLAY)
            });

        $("#play-container #play-join-game")
            .off('click')
            .click(() => {
                websocket.send(WEBSOCKET_SENDER_ACTIONS.JOIN_GAME, {
                    gameId: $("#play-container #play-join-game-input").val(),
                    username: "yasuo"
                });
                game.updateMode(MODE.PLAY)
            });
    }

    getContentElement() {
        return this.contentElement;
    }
}
