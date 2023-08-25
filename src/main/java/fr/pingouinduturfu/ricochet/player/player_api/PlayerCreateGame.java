package fr.pingouinduturfu.ricochet.player.player_api;

import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerCreateGame;
import org.springframework.web.socket.WebSocketSession;

public interface PlayerCreateGame {

    void createGame(WebSocketSession webSocketSession, InputCommandPlayerCreateGame playerCreateGame);
}