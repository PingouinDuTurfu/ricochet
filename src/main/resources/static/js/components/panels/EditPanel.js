import {PAGE, SOURCE_CELL, SWITCH_PAGE_TYPE} from "../../Constants.js";
import { session } from "../../Index.js";

export class EditPanel {

    constructor(panelElement) {
        this.panelElement = panelElement;
        this.swapCellsElementContainer = panelElement.find('#swap-cell-container');
        this.mapsElementContainer = panelElement.find('#edit-load-select-items-container');
        this.robotsElementContainer = panelElement.find('#edit-container #robot-pieces-container');
        this.homePageButtonElement = panelElement.find('#edit-panel-home-page-button');
        this.editSaveButtonElement = panelElement.find('#edit-save-button');
        this.editLoadContainerElement = panelElement.find('#edit-load-container');
    }

    attachGrid(grid) {
        this.grid = grid;
        this.#init();
    }

    #init() {
        const self = this;

        // Load swap cells
        this.swapCellsElementContainer
            .empty();
        Object.keys(SOURCE_CELL).forEach((cell) => {
            const cellElement = $(
                '<img />',
                {
                    class: 'swap-cell',
                    id: 'swap-cell-' + cell,
                    alt: cell,
                    src: SOURCE_CELL[cell]
                })
                .on('click', () => {
                    const cellSelected = this.grid.getCellSelected();
                    if(cellSelected === null)
                        return;
                    cellSelected.setSource(SOURCE_CELL[cell]);
                });
            this.swapCellsElementContainer.append(cellElement);
        });


        // Bind home button
        this.homePageButtonElement
            .on('click', () => {
                session.switchPage(PAGE.EDIT, PAGE.HOME, SWITCH_PAGE_TYPE.HOME);
            });

        // Load maps
        this.mapsElementContainer
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
                                    self.grid.editGridCreation(JSON.parse(data.mapData));
                                }
                            });
                        });
                    this.mapsElementContainer.append(mapElement);
                });
            }
        });

        // Bind save button
        this.editSaveButtonElement
            .on('click', () => {
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
                        mapData: this.grid.serialize()
                    },
                    success: function() {
                        session.messaging.displayMessage('Map saved');
                    }
                });
            });

        // Bind load select button
        this.editLoadContainerElement
            .on('click', () => {
                this.editLoadContainerElement.find('#edit-load-select-items-container').toggleClass('hidden');
                this.editLoadContainerElement.find('#edit-load-arrow').toggleClass('rotate');
            });

        // Bind robots container
        this.robotsElementContainer
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

                self.grid.moveRobotFromHtmlId(robot.attr('id'), null, null);
                $this.append(robot);
            });
    }

    loadRobots() {
        this.grid.getRobots().forEach((robot) => {
            if(robot.getX() === null || robot.getY() === null)
                this.robotsElementContainer.append(robot.getElement());
        });
    }

    enableGrayscaleOnSwapCells() {
        this.swapCellsElementContainer.css('filter', 'grayscale(1)');
    }

    disableGrayscaleOnSwapCells() {
        this.swapCellsElementContainer.css('filter', 'grayscale(0)');
    }


    destroy() {
        this.swapCellsElementContainer.empty();
        this.mapsElementContainer.empty();
        this.robotsElementContainer.empty()
            .off('dragover')
            .off('drop');

        this.homePageButtonElement.off('click');
        this.editSaveButtonElement.off('click');
        this.editLoadContainerElement.off('click');
    }
}