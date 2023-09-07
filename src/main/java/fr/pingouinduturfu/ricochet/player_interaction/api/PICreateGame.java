package fr.pingouinduturfu.ricochet.player_interaction.api;

import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandCreateGame;
import org.springframework.web.socket.WebSocketSession;

public interface PICreateGame {

    void createGame(WebSocketSession webSocketSession, InputCommandCreateGame inputCommandCreateGame);
}