package fr.pingouinduturfu.ricochet.websocket;

import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import org.springframework.web.socket.TextMessage;

public interface WebsocketMessageReader {
    WebSocketInputCommand<?> read(TextMessage message);
}
