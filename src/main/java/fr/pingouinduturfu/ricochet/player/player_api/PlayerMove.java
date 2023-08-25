package fr.pingouinduturfu.ricochet.player.player_api;

import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandPlayerMove;
import org.springframework.web.socket.WebSocketSession;

public interface PlayerMove {

    void move(WebSocketSession webSocketSession, InputCommandPlayerMove playerMove);
}