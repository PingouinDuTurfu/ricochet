import { MODE, WEBSOCKET_RECEIVER_ACTIONS } from "./Constants.js";
import { session } from "./Index.js";

export class WebsocketSession {
    constructor() {
        this.socket = new WebSocket("ws://localhost:8088/ws");
        this.socket.onmessage = this.#onMessage;
        this.socket.onopen = this.#onOpen;
        this.socket.onclose = this.#onClose;
        this.socket.onerror = this.#onError;
    }

    #onOpen() {
        session.messaging.displayMessage("Connected to server");
    }

    #onClose(event) {
        if (event.wasClean)
            session.messaging.displayMessage("Connection closed");
        else
            session.messaging.displayErrorMessage("Connection died");
    }

    #onError(error) {
        session.messaging.displayErrorMessage("Connection error");
        console.error(`[error] ${error.message}`);
    }

    #onMessage(event) {
        const message = JSON.parse(event.data);
        switch (message.actionName) {
            case WEBSOCKET_RECEIVER_ACTIONS.UPDATE_GAME:
                if(game.getMode() !== MODE.PLAY)
                    return;
                game.buildGameGrid(message.data.map)
                session.messaging.displayMessage("EditGrid ID:" + message.data.gameId);
                break;
            case WEBSOCKET_RECEIVER_ACTIONS.MOVE:
                // if(session.game)
                //     return;
                for (let element of message.data.robots)
                    session.game.moveRobot(element.c, element.x, element.y);
                break;
            case WEBSOCKET_RECEIVER_ACTIONS.ERROR:
                session.messaging.displayErrorMessage(message.data.message);
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