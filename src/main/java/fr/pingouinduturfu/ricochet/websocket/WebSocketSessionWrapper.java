package fr.pingouinduturfu.ricochet.websocket;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

@Data
@RequiredArgsConstructor
public class WebSocketSessionWrapper {
    private final WebSocketSession webSocketSession;
}