package fr.pingouinduturfu.ricochet.websocket;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

@Data
@RequiredArgsConstructor
public class WebSocketSessionWrapper {
    private final WebSocketSession webSocketSession;
    private int point = 0;

    private double lastPositionX = 235;
    private double lastPositionY = 235;
}