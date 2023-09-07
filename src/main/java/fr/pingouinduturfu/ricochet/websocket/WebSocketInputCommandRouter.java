package fr.pingouinduturfu.ricochet.websocket;

import fr.pingouinduturfu.ricochet.websocket.command_executor.WebSocketInputCommandExecutor;
import fr.pingouinduturfu.ricochet.websocket.model.input.WebSocketInputCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WebSocketInputCommandRouter {
    private final List<WebSocketInputCommandExecutor> webSocketInputCommandExecutors;
    public void execute(WebSocketInputCommand<?> webSocketInputCommand, WebSocketSession session) {
        webSocketInputCommandExecutors.stream()
                .filter(webSocketInputCommandExecutor -> webSocketInputCommandExecutor.find(webSocketInputCommand.getActionName()))
                .findFirst()
                .ifPresentOrElse(
                        webSocketInputCommandExecutor -> webSocketInputCommandExecutor.execute(webSocketInputCommand, session),
                        () -> {
                            throw new IllegalArgumentException();
                        });
    }

}