package fr.pingouinduturfu.ricochet.player.player_api;

import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerJoinGame;
import org.springframework.web.socket.WebSocketSession;

public interface PlayerJoinGame {

    void joinGame(WebSocketSession webSocketSession, InputCommandPlayerJoinGame playerJoinGame);
}
