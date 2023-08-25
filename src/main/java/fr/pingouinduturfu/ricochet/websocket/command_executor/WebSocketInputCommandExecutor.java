package fr.pingouinduturfu.ricochet.websocket.command_executor;

import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import org.springframework.web.socket.WebSocketSession;

public interface WebSocketInputCommandExecutor<T extends WebSocketInputCommand<?>> {
    void execute(T command, WebSocketSession session);
    boolean find(String webSocketInputCommandType);
}