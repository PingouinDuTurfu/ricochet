import {MODE, WEBSOCKET_RECEIVER_ACTIONS} from "./Constants.js";
import {game, messaging} from "./Index.js";

export class WebsocketSession {
    constructor() {
        this.socket = new WebSocket("ws://localhost:8088/ws");
        this.socket.onmessage = this.#onMessage;
        this.socket.onopen = this.#onOpen;
        this.socket.onclose = this.#onClose;
        this.socket.onerror = this.#onError;
    }

    #onOpen() {
        messaging.displayMessage("Connected to server");
    }

    #onClose(event) {
        if (event.wasClean)
            messaging.displayMessage("Connection closed");
        else
            messaging.displayErrorMessage("Connection died");
    }

    #onError(error) {
        messaging.displayErrorMessage("Connection error");
        console.error(`[error] ${error.message}`);
    }

    #onMessage(event) {
        const message = JSON.parse(event.data);
        switch (message.actionName) {
            case WEBSOCKET_RECEIVER_ACTIONS.UPDATE_GAME:
                if(game.getMode() !== MODE.PLAY)
                    return;
                game.buildGameGrid(message.data.map)
                messaging.displayMessage("Game ID:" + message.data.gameId);
                break;
            case WEBSOCKET_RECEIVER_ACTIONS.MOVE:
                if(game.getMode() !== MODE.PLAY)
                    return;
                for (let element of message.data.robots)
                    game.moveRobot(element.c, element.x, element.y);
                break;
            case WEBSOCKET_RECEIVER_ACTIONS.ERROR:
                messaging.displayErrorMessage(message.data.message);
                break;
            default:
                console.error("Unknown action: " + message.actionName);
        }
    }

    send(action, data) {
        if (this.socket.readyState !== WebSocket.OPEN) {
            messaging.displayErrorMessage("Connection not open");
            return;
        }
        this.socket.send(JSON.stringify({
            actionName: action,
            data: data
        }));
    }
}