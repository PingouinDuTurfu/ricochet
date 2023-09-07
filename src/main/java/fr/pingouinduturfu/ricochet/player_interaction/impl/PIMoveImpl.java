package fr.pingouinduturfu.ricochet.player_interaction.impl;

import fr.pingouinduturfu.ricochet.exception.GameManagerException;
import fr.pingouinduturfu.ricochet.game.Robot;
import fr.pingouinduturfu.ricochet.game.manager.GameManager;
import fr.pingouinduturfu.ricochet.game.mapper.RobotMapper;
import fr.pingouinduturfu.ricochet.player_interaction.api.PIMove;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionManager;
import fr.pingouinduturfu.ricochet.websocket.WebSocketSessionWrapper;
import fr.pingouinduturfu.ricochet.websocket.WebsocketMessageSender;
import fr.pingouinduturfu.ricochet.websocket.model.input.model.InputCommandMove;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandError;
import fr.pingouinduturfu.ricochet.websocket.model.output.model.OutputCommandMove;
import fr.pingouinduturfu.ricochet.websocket.model.output.ws.WebSocketOutputCommandError;
import fr.pingouinduturfu.ricochet.websocket.model.output.ws.WebSocketOutputCommandMove;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

import static fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommandType.ERROR;
import static fr.pingouinduturfu.ricochet.websocket.model.output.WebSocketOutputCommandType.MOVE;

@Service
@Slf4j
@RequiredArgsConstructor
class PIMoveImpl implements PIMove {

    private final WebSocketSessionManager webSocketSessionManager;
    private final WebsocketMessageSender websocketMessageSender;
    private final GameManager gameManager;

    @Override
    public void move(WebSocketSession webSocketSession, InputCommandMove inputCommandMove) {
        List<RobotMapper> robots;
        try {
             robots = gameManager.move(webSocketSession, inputCommandMove.getX(), inputCommandMove.getY(), inputCommandMove.getC());
        } catch (GameManagerException e) {
            websocketMessageSender.send(webSocketSession, WebSocketOutputCommandError.builder()
                    .actionName(ERROR.name())
                    .data(OutputCommandError.builder()
                            .message(e.getMessage())
                            .build())
                    .build());
            return;
        }

        webSocketSessionManager.getAllSessions().forEach(session -> {
            WebSocketOutputCommandMove outputCommandMove = WebSocketOutputCommandMove.builder()
                    .actionName(MOVE.name())
                    .data(OutputCommandMove.builder()
                            .robots(robots)
                            .sessionId(webSocketSession.getId())
                            .build())
                    .build();
            websocketMessageSender.send(session, outputCommandMove);
        });
    }
}