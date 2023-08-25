package fr.pingouinduturfu.ricochet.exception;

import fr.pingouinduturfu.ricochet.websocket.WebsocketMessageSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExceptionFacade {

    private final WebsocketMessageSender websocketMessageSender;

    public void sendError(WebSocketSession webSocketSession, Object message) {
        websocketMessageSender.send(webSocketSession, message);
    }
}