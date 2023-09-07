package fr.pingouinduturfu.ricochet.player_interaction.api;

import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandJoinGame;
import org.springframework.web.socket.WebSocketSession;

public interface PIJoinGame {

    void joinGame(WebSocketSession webSocketSession, InputCommandJoinGame inputCommandJoinGame);
}
