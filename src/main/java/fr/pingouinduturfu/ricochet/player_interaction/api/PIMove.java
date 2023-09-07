package fr.pingouinduturfu.ricochet.player_interaction.api;

import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandMove;
import org.springframework.web.socket.WebSocketSession;

public interface PIMove {

    void move(WebSocketSession webSocketSession, InputCommandMove inputCommandMove);
}